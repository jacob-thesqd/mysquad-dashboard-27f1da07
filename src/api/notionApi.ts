
/**
 * API service for Notion client operations
 */

const API_BASE_URL = import.meta.env.PROD
  ? '/api/notion' // In production, this would be your deployed API endpoint
  : 'https://sis1.thesqd.com/webhook'; // Using the same endpoint that your markdown fallback uses

// Fetch a Notion page via proxy API
export async function fetchNotionPage(pageId: string) {
  try {
    console.log(`Fetching Notion page ${pageId} via API`);
    const response = await fetch(`${API_BASE_URL}/notion-page?pageId=${pageId}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Notion page fetch successful via API');
    return data.recordMap;
  } catch (error) {
    console.error('Error fetching Notion page via API:', error);
    throw error;
  }
}
