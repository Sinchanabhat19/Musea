import { Web3Storage } from 'web3.storage';


class IPFSService {
  private client: Web3Storage;

  constructor() {
    // Replace with your Web3.Storage API token
    const token = 'YOUR_WEB3_STORAGE_TOKEN';
    this.client = new Web3Storage({ token });
  }

  async uploadArtistData(data: any): Promise<string> {
    try {
      // Convert data to JSON and create a File object
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      const files = [new File([blob], 'artist-data.json')];

      // Upload to IPFS through Web3.Storage
      const cid = await this.client.put(files);
      return cid;
    } catch (error: any) {
      console.error('Error uploading to IPFS:', error);
      throw new Error(error.message || 'Failed to upload to IPFS');
    }
  }

  async getArtistData(cid: string): Promise<any> {
    try {
      const res = await this.client.get(cid);
      if (!res) throw new Error('No response from IPFS');

      const files = await res.files();
      const file = files[0];
      const content = await file.text();
      return JSON.parse(content);
    } catch (error: any) {
      console.error('Error fetching from IPFS:', error);
      throw new Error(error.message || 'Failed to fetch from IPFS');
    }
  }
}

export default new IPFSService();