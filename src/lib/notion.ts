
import { NotionAPI } from 'notion-client';

// Create a browser-compatible Notion client
export const notion = new NotionAPI({
  authToken: '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',
  activeUser: undefined, // Not needed for public pages
  userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
});

// Function to fetch a Notion page by ID
export async function getNotionPage(pageId: string) {
  try {
    console.log('Fetching Notion page with ID:', pageId);
    const recordMap = await notion.getPage(pageId);
    console.log('Notion page fetched successfully');
    return recordMap;
  } catch (error) {
    console.error('Error fetching Notion page:', error);
    return null;
  }
}
