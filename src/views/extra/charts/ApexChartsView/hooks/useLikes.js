import { useState } from 'react';
import api from '../../../../../api/Api.js';

const useLikes = project => {
  const [isLiked, setLiked] = useState(project.liked);
  const [loading, setLoading] = useState(false);

  const [likesCount, setLikesCount] = useState(project.likes_count);

  const handleLike = async () => {
    setLoading(true);
    try {
      const response = await api.updateStateLike(project.id);
      setLiked(response.liked);
      setLikesCount(response.likes_count);
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return {
    isLiked,
    likesCount,
    handleLike,
    loading
  };
};

export default useLikes;
