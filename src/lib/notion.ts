
import { NotionAPI } from 'notion-client';

// Create a Notion client with the integration token
export const notion = new NotionAPI({
  authToken: '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'
});

// Function to fetch a Notion page by ID
export async function getNotionPage(pageId: string) {
  try {
    const recordMap = await notion.getPage(pageId);
    return recordMap;
  } catch (error) {
    console.error('Error fetching Notion page:', error);
    return null;
  }
}
