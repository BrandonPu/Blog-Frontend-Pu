import React, { useState } from "react";
import { useGetPost } from "../../shared/hooks";
import "./PostsView.css";

export function PostsView() {
  const { posts, loading, error } = useGetPost();
  const [openComments, setOpenComments] = useState({});

  if (loading) return <p className="text-center mt-4">Cargando publicaciones...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">Error al cargar publicaciones.</p>;

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="posts-container">
      {posts.map((post) => (
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
            aria-expanded={!!openComments[post._id]}
            aria-controls={`comments-${post._id}`}
          >
            {openComments[post._id] ? "Ocultar comentarios ▲" : "Ver comentarios ▼"} ({post.comments.length})
          </button>

          {openComments[post._id] && (
            <div className="comments-container" id={`comments-${post._id}`}>
              {post.comments.length === 0 ? (
                <p className="no-comments">No hay comentarios aún.</p>
              ) : (
                post.comments
                  .slice()
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((comment) => (
                    <div key={comment._id} className="comment-card">
                      <p className="comment-name">{comment.name}</p>
                      <p className="comment-content">{comment.content}</p>
                      <p className="comment-date">{new Date(comment.createdAt).toLocaleString()}</p>
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}