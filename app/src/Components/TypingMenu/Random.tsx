import React, { useEffect, useState } from 'react';

// URL for Random Word API
const RANDOM_WORD_API_URL = 'https://random-word-api.herokuapp.com/word?number=100'; // Fetch 10 random words

const Random = () => {
  const [paragraph, setParagraph] = useState('');

  const fetchRandomWords = async () => {
    try {
      const response = await fetch(RANDOM_WORD_API_URL);
      const words = await response.json();
      const randomParagraph = words.join(' ') + '.'; // Join the words into a single string with a period
      setParagraph(randomParagraph);
    } catch (error) {
      console.error('Error fetching random words:', error);
      setParagraph('Failed to load words.');
    }
  };

  useEffect(() => {
    fetchRandomWords();
  }, []);

  return { paragraph };
};

export default Random;
