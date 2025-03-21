
import { NotionAPI } from 'notion-client';

// Create a Notion client configured for browser environments
export const notion = new NotionAPI({
  // Using the public API without authentication for browser-compatible requests
  apiBaseUrl: process.env.REACT_APP_NOTION_API_BASE_URL,
  authToken: process.env.REACT_APP_NOTION_TOKEN,
  activeUser: process.env.REACT_APP_NOTION_ACTIVE_USER,
  userTimeZone: process.env.REACT_APP_NOTION_USER_TIMEZONE
});

// Notion page ID for the auto-assigner documentation
export const AUTO_ASSIGNER_PAGE_ID = '1bce83f731f6808a80a6e861e59f4a25';

// Function to fetch a Notion page
export async function getNotionPage(pageId: string) {
  try {
    // Use more resilient error handling
    console.log('Fetching Notion page with ID:', pageId);
    const recordMap = await notion.getPage(pageId);
    console.log('Notion page fetch successful');
    return recordMap;
  } catch (error) {
    console.error('Error fetching Notion page:', error);
    return null;
  }
}
