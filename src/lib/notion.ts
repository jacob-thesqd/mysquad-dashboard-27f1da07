
import { NotionAPI } from 'notion-client';

// Create a Notion client configured for browser environments
export const notion = new NotionAPI();

// Notion page ID for the auto-assigner documentation
export const AUTO_ASSIGNER_PAGE_ID = '1bce83f731f6808a80a6e861e59f4a25';

// Function to fetch a Notion page
export async function getNotionPage(pageId: string) {
  try {
    console.log('Fetching Notion page with ID:', pageId);
    const recordMap = await notion.getPage(pageId);
    console.log('Notion page fetch successful');
    return recordMap;
  } catch (error) {
    console.error('Error fetching Notion page:', error);
    return null;
  }
}
