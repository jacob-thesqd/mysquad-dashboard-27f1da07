
interface NotionUser {
  object: string;
  id: string;
}

interface NotionParent {
  type: string;
  page_id: string;
}

interface NotionText {
  type: string;
  text: {
    content: string;
    link: { url: string } | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}

interface NotionBlock {
  object: string;
  id: string;
  parent: NotionParent;
  created_time: string;
  last_edited_time: string;
  created_by: NotionUser;
  last_edited_by: NotionUser;
  has_children: boolean;
  archived: boolean;
  in_trash: boolean;
  type: string;
  [key: string]: any;
}

interface NotionResponse {
  object: string;
  results: NotionBlock[];
  next_cursor: string | null;
  has_more: boolean;
  type: string;
  block: {};
  request_id: string;
}

export function notionBlocksToMarkdown(data: NotionResponse | NotionResponse[]): string {
  // Handle both array response and direct response
  const blocks = Array.isArray(data) ? data[0]?.results || [] : data?.results || [];
  
  let markdown = '';
  let listType: string | null = null;
  let listNumber = 1;
  
  blocks.forEach((block, index) => {
    // Add spacing between blocks except for list items which should be grouped
    if (index > 0 && !isListItem(block.type) && !isListItem(blocks[index - 1].type)) {
      markdown += '\n\n';
    }
    
    // Handle list continuations and breaks
    if (isListItem(block.type)) {
      if (listType !== block.type) {
        // If we're changing list types or starting a new list, add a line break
        if (listType !== null) {
          markdown += '\n\n';
        }
        listType = block.type;
        listNumber = 1;
      }
    } else {
      // If we're ending a list, reset the list type
      if (listType !== null) {
        markdown += '\n\n';
        listType = null;
        listNumber = 1;
      }
    }
    
    // Convert the block to markdown
    markdown += blockToMarkdown(block, listNumber);
    
    // Increment the list number if this was a numbered list item
    if (block.type === 'numbered_list_item') {
      listNumber++;
    }
  });
  
  return markdown;
}

function isListItem(type: string): boolean {
  return type === 'numbered_list_item' || type === 'bulleted_list_item';
}

function blockToMarkdown(block: NotionBlock, listNumber: number): string {
  switch (block.type) {
    case 'paragraph':
      return formatRichText(block.paragraph.rich_text);
      
    case 'heading_1':
      return `# ${formatRichText(block.heading_1.rich_text)}`;
      
    case 'heading_2':
      return `## ${formatRichText(block.heading_2.rich_text)}`;
      
    case 'heading_3':
      return `### ${formatRichText(block.heading_3.rich_text)}`;
      
    case 'bulleted_list_item':
      return `- ${formatRichText(block.bulleted_list_item.rich_text)}`;
      
    case 'numbered_list_item':
      return `${listNumber}. ${formatRichText(block.numbered_list_item.rich_text)}`;
      
    case 'to_do':
      const checked = block.to_do.checked ? '[x]' : '[ ]';
      return `${checked} ${formatRichText(block.to_do.rich_text)}`;
      
    case 'toggle':
      return `<details><summary>${formatRichText(block.toggle.rich_text)}</summary></details>`;
      
    case 'code':
      return `\`\`\`${block.code.language}\n${formatRichText(block.code.rich_text)}\n\`\`\``;
      
    case 'quote':
      return `> ${formatRichText(block.quote.rich_text)}`;
      
    case 'divider':
      return '---';
      
    case 'table_of_contents':
      return '*[Table of Contents]*';
      
    case 'image':
      const caption = block.image.caption ? ` - ${formatRichText(block.image.caption)}` : '';
      const url = block.image.type === 'external' ? block.image.external.url : block.image.file.url;
      return `![Image${caption}](${url})`;
      
    case 'bookmark':
      return `[${block.bookmark.url}](${block.bookmark.url})`;
      
    default:
      return '';
  }
}

function formatRichText(richTextArray: NotionText[]): string {
  if (!richTextArray || richTextArray.length === 0) {
    return '';
  }
  
  return richTextArray.map(textBlock => {
    let formattedText = textBlock.plain_text;
    
    if (textBlock.annotations.bold) {
      formattedText = `**${formattedText}**`;
    }
    
    if (textBlock.annotations.italic) {
      formattedText = `*${formattedText}*`;
    }
    
    if (textBlock.annotations.strikethrough) {
      formattedText = `~~${formattedText}~~`;
    }
    
    if (textBlock.annotations.code) {
      formattedText = `\`${formattedText}\``;
    }
    
    if (textBlock.annotations.underline) {
      // Markdown doesn't have underline, so we use HTML
      formattedText = `<u>${formattedText}</u>`;
    }
    
    if (textBlock.href) {
      formattedText = `[${formattedText}](${textBlock.href})`;
    }
    
    return formattedText;
  }).join('');
}
