import axios from 'axios';

const API_URL = 'https://danishasgharbackend.glitch.me'; // Make sure this URL is correct

export const getData = async () => {
  try {
    const response = await axios.get(`${API_URL}/your-endpoint`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default API_URL; // Export the API_URL
