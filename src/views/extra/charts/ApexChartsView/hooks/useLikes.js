import { useState } from 'react';
import api from '../../../../../api/Api.js';

const useLikes = project => {
  const [isLiked, setLiked] = useState(project.liked);

  const [likesCount, setLikesCount] = useState(project.likes_count);

  const handleLike = async () => {
    const response = await api.updateStateLike(project.id);

    setLiked(response.liked);
    setLikesCount(response.likes_count);
  };

  return {
    isLiked,
    likesCount,
    handleLike
  };
};

export default useLikes;
