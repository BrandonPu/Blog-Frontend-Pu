// PostsView.jsx
import { useEffect, useState } from "react";
import { useGetPost } from "../../shared/hooks";
import { useCommentPut } from "../../shared/hooks/useCommentPut";
import { useCommentDelete } from "../../shared/hooks/useCommentDelete";
import { CommentForm } from "../Post/CommentForm";
import { validateName, validateDescription } from "../../shared/validators";
import "./PostsView.css";

export function PostsView() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // asc = más antiguas, desc = más recientes
  const { posts: initialPosts, loading, error } = useGetPost(selectedCategory);
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", content: "" });

  const { putComment, loading: updating } = useCommentPut();
  const { removeComment, loading: deleting } = useCommentDelete();

  useEffect(() => {
    if (initialPosts) {
      const sorted = [...initialPosts].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
      setPosts(sorted);
    }
  }, [initialPosts, sortOrder]);

  const toggleComments = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  const handleCommentAdded = (postId, newComment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  const handleEditClick = (comment) => {
    setEditingCommentId(comment._id);
    setEditFormData({ name: comment.name, content: comment.content });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (postId, commentId) => {
    const nameValidation = validateName(editFormData.name);
    if (!nameValidation.valid) {
      alert(nameValidation.error);
      return;
    }
    const contentValidation = validateDescription(editFormData.content);
    if (!contentValidation.valid) {
      alert(contentValidation.error);
      return;
    }

    const result = await putComment({
      commentId,
      name: editFormData.name,
      content: editFormData.content,
    });

    if (result && !result.error) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment._id === commentId
                  ? { ...comment, ...editFormData }
                  : comment
              ),
            }
            : post
        )
      );
      setEditingCommentId(null);
    }
  };

  const handleDelete = async (postId, commentId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este comentario?");
    if (!confirmDelete) return;

    const result = await removeComment(commentId);

    if (result && result.success) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
              ...post,
              comments: post.comments.filter((c) => c._id !== commentId),
            }
            : post
        )
      );
    }
  };

  return (
    <div>
      <div className="filter-container">
        <div className="filter-group">
          <label htmlFor="category-select">Filtrar por categoría:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="Taller">Taller</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Practica Supervisada">Practica Supervisada</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-select">Ordenar por fecha:</label>
          <select
            id="sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Más recientes primero</option>
            <option value="asc">Más antiguas primero</option>
          </select>
        </div>
      </div>

      <div className="posts-container">
        {posts.length === 0 ? (
          <p>No hay publicaciones para esta categoría.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <h2 className="post-author">{post.author}</h2>
              <p className="post-course">{post.course.name}</p>
              <p className="post-date">
                Publicado el {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-content">{post.content}</p>

              <button
                className="toggle-comments-btn"
                onClick={() => toggleComments(post._id)}
              >
                {expandedPostId === post._id ? "Ocultar comentarios" : "Ver comentarios"}
              </button>

              {expandedPostId === post._id && (
                <div className="comments-container">
                  {post.comments.length === 0 ? (
                    <p className="no-comments">No hay comentarios aún.</p>
                  ) : (
                    post.comments.map((comment) => (
                      <div key={comment._id} className="comment-card">
                        {editingCommentId === comment._id ? (
                          <>
                            <input
                              className="comment-input"
                              name="name"
                              value={editFormData.name}
                              onChange={handleEditChange}
                            />
                            <textarea
                              className="comment-textarea"
                              name="content"
                              value={editFormData.content}
                              onChange={handleEditChange}
                            />
                            <button
                              className="comment-submit-btn"
                              onClick={() => handleEditSubmit(post._id, comment._id)}
                              disabled={updating}
                            >
                              Guardar
                            </button>
                            <button
                              className="comment-submit-btn"
                              style={{ backgroundColor: "#9ca3af", marginLeft: "0.5rem" }}
                              onClick={() => setEditingCommentId(null)}
                              disabled={updating}
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <p className="comment-name">{comment.name}</p>
                            <p className="comment-content">{comment.content}</p>
                            <p className="comment-date">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </p>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <button
                                onClick={() => handleEditClick(comment)}
                                style={{
                                  fontSize: "0.75rem",
                                  background: "#f1f5f9",
                                  border: "1px solid #cbd5e1",
                                  padding: "0.25rem 0.6rem",
                                  borderRadius: "0.4rem",
                                  cursor: "pointer",
                                }}
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleDelete(post._id, comment._id)}
                                style={{
                                  fontSize: "0.75rem",
                                  background: "#fee2e2",
                                  border: "1px solid #f87171",
                                  padding: "0.25rem 0.6rem",
                                  borderRadius: "0.4rem",
                                  cursor: "pointer",
                                }}
                                disabled={deleting}
                              >
                                Eliminar
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  )}
                  <CommentForm
                    postId={post._id}
                    onCommentAdded={(newComment) =>
                      handleCommentAdded(post._id, newComment)
                    }
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
