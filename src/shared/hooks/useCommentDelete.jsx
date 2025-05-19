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
      if (response.error) {
        throw new Error("Error al eliminar el comentario");
      }
      setLoading(false);
      return { success: true, data: response };
    } catch (e) {
      setError(e.message || "Error eliminando comentario");
      setLoading(false);
      return { success: false, error: e.message || "Error eliminando comentario" };
    }
  };

  return { removeComment, loading, error };
}
