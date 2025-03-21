
import { NotionAPI } from 'notion-client';

// Create a Notion client with browser-friendly configuration
export const notion = new NotionAPI({
  // These options ensure the client works in browser environments
  apiBaseUrl: undefined,
  authToken: undefined,
  activeUser: undefined,
  userTimeZone: undefined
});

// Notion page ID for the auto-assigner documentation
export const AUTO_ASSIGNER_PAGE_ID = '1bce83f731f6808a80a6e861e59f4a25';

// Function to fetch a Notion page
export async function getNotionPage(pageId: string) {
  try {
    const recordMap = await notion.getPage(pageId);
    return recordMap;
  } catch (error) {
    console.error('Error fetching Notion page:', error);
    return null;
  }
}
