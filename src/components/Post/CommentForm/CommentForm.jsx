// CommentForm.jsx
import { useState } from "react";
import { useCommentAdd } from "../../../shared/hooks";
import { validateDescription } from "../../../shared/validators"; // quitamos validateName

export function CommentForm({ postId, onCommentAdded }) {
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const { addComment, loading, error } = useCommentAdd();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Solo validamos el contenido, no el nombre
        const contentValidation = validateDescription(content);
        if (!contentValidation.valid) {
            alert(contentValidation.error);
            return;
        }

        const success = await addComment({ name, content, postId });

        if (success && typeof success === "object") {
            setName("");
            setContent("");
            onCommentAdded?.(success);
        }
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Tu nombre (opcional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="comment-input"
            />
            <textarea
                placeholder="Escribe tu comentario..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="comment-textarea"
                rows={3}
            />
            <button type="submit" className="comment-submit-btn" disabled={loading}>
                {loading ? "Publicando..." : "Publicar comentario"}
            </button>
            {error && <p className="comment-error">Error al enviar comentario.</p>}
        </form>
    );
}
