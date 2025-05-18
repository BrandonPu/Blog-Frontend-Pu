import { useState } from "react";
import { deleteComment } from "../../services";

export function useCommentDelete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const removeComment = async (commentId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await deleteComment(commentId);
      setLoading(false);
      return { success: true, data: response };
    } catch (e) {
      setError(e);
      setLoading(false);
      return { success: false, error: e };
    }
  };

  return { removeComment, loading, error };
}
