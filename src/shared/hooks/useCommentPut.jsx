import { useState } from "react";
import { updateComment } from "../../services"; 

export const useCommentPut = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updatedComment, setUpdatedComment] = useState(null);

    const putComment = async ({ commentId, name, content }) => {
        setLoading(true);
        setError(null);
        setUpdatedComment(null);

        try {
            const data = await updateComment({ commentId, name, content });

            if (data.error) {
                throw data.e;
            }

            setUpdatedComment(data);
            return data;
        } catch (err) {
            setError(err.message || "Error actualizando comentario");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        putComment,
        loading,
        error,
        updatedComment,
    };
};