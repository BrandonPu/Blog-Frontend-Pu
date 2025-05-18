import { useEffect, useState } from "react";
import { useGetPost } from "../../shared/hooks";
import { useCommentPut } from "../../shared/hooks/useCommentPut";
import { CommentForm } from "../Post/CommentForm";
import "./PostsView.css";

export function PostsView() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { posts: initialPosts, loading, error } = useGetPost(selectedCategory);
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", content: "" });

  const { putComment, loading: updating } = useCommentPut();

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

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

  return (
    <div>
      <div className="filter-container">
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
                            <button
                              onClick={() => handleEditClick(comment)}
                              style={{
                                marginTop: "0.5rem",
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
