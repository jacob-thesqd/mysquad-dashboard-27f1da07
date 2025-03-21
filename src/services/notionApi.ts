
import { ExtendedRecordMap } from "notion-types";

interface NotionApiOptions {
  pageId: string;
  token?: string;
}

// Define the shape of the response
interface NotionPageResponse {
  recordMap: ExtendedRecordMap;
  error?: string;
}

// The base URL for our Notion proxy API
const NOTION_PROXY_URL = 'https://notion-api.splitbee.io/v1/page';

/**
 * A browser-compatible API service for fetching Notion pages
 */
export const notionApi = {
  /**
   * Fetch a Notion page using a public proxy service
   * This avoids the Node.js compatibility issues with notion-client
   */
  async getPage(options: NotionApiOptions): Promise<ExtendedRecordMap> {
    const { pageId, token } = options;
    
    try {
      // Use the public Notion API proxy service from Splitbee
      // This service handles the Node.js specific code on their server
      const response = await fetch(`${NOTION_PROXY_URL}/${pageId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Notion page: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data as ExtendedRecordMap;
    } catch (error) {
      console.error("Error fetching Notion page:", error);
      throw error;
    }
  }
};
