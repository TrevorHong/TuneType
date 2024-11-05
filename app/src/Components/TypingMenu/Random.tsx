import React, { useEffect } from 'react';

// URL for Random Word API
const RANDOM_WORD_API_URL = 'https://random-word-api.herokuapp.com/word?number=100'; // Fetch 100 random words

interface RandomProps {
  maxLength: number; 
  setParagraph: (paragraph: string) => void; 
}

const Random: React.FC<RandomProps> = ({ maxLength, setParagraph }) => {
  const fetchRandomWords = async () => {
    try {
      const response = await fetch(RANDOM_WORD_API_URL);
      const words: string[] = await response.json();
      
      // Filter words based on maxLength
      const filteredWords = words.filter(word => word.length <= maxLength);
      const randomParagraph = filteredWords.join(' ') + '.';
      setParagraph(randomParagraph);
    } catch (error) {
      console.error('Error fetching random words:', error);
      setParagraph('Failed to load words.');
    }
  };

  useEffect(() => {
    fetchRandomWords();
  }, [maxLength]);

  return null;
};

export default Random;
