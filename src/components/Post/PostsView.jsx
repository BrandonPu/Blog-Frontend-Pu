import { useEffect, useState } from "react";
import { useGetPost } from "../../shared/hooks";
import { CommentForm } from "../Post/CommentForm";
import "./PostsView.css";

export function PostsView() {
  const { posts: initialPosts, loading, error } = useGetPost();
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);

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

  if (loading) return <p className="text-center mt-4">Cargando publicaciones...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">Error al cargar publicaciones.</p>;

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
                    <p className="comment-name">{comment.name}</p>
                    <p className="comment-content">{comment.content}</p>
                    <p className="comment-date">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}

              <CommentForm
                postId={post._id}
                onCommentAdded={(newComment) => handleCommentAdded(post._id, newComment)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}