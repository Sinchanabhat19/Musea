import { Web3Storage } from 'web3.storage';

class IPFSService {
  constructor() {
    const token = process.env.WEB3_STORAGE_TOKEN;
    if (!token) {
      throw new Error('Web3.Storage token not found in environment variables');
    }
    this.client = new Web3Storage({ token });
  }

  async uploadArtistData(data) {
    try {
      // Convert data to JSON and create a File object
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      const files = [new File([blob], 'artist-data.json')];

      // Upload to IPFS
      const cid = await this.client.put(files);
      return { success: true, cid };
    } catch (error) {
      console.error('IPFS upload error:', error);
      throw new Error('Failed to upload to IPFS');
    }
  }

  async getArtistData(cid) {
    try {
      const res = await this.client.get(cid);
      if (!res) throw new Error('No response from IPFS');

      const files = await res.files();
      const file = files[0];
      const content = await file.text();
      return { success: true, data: JSON.parse(content) };
    } catch (error) {
      console.error('IPFS retrieval error:', error);
      throw new Error('Failed to retrieve from IPFS');
    }
  }
}

export default new IPFSService();