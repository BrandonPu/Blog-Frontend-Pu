import { useState } from "react";
import { createComment } from "../../services/api";

export function useCommentAdd() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const addComment = async ({ name, content, postId }) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const res = await createComment({ name, content, postId });

      if (res.error) {
        setError("Error al enviar comentario.");
        return null;
      } else {
        setSuccessMessage("Comentario enviado correctamente.");
        return res.comment || res; 
      }
    } catch (err) {
      setError("Ocurrió un error inesperado.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    addComment,
    loading,
    error,
    successMessage,
  };
}