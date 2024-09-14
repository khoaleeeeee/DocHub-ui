import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const post = async prompt => {
  try {
    const response = await axios.post(
      `${apiUrl}/ask`,
      { prompt },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error occurred:', error);
    throw error;
  }
};

export default post;
