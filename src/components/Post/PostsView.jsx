import { useEffect, useState } from "react";
import { useGetPost } from "../../shared/hooks";
import { CommentForm } from "../Post/CommentForm";
import "./PostsView.css";

export function PostsView() {
  // Estado para la categoría seleccionada en el filtro
  const [selectedCategory, setSelectedCategory] = useState("");

  // Hook personalizado que obtiene posts filtrados por categoría
  const { posts: initialPosts, loading, error } = useGetPost(selectedCategory);

  // Estado local para manejar posts (permite actualizar comentarios sin recargar)
  const [posts, setPosts] = useState([]);

  // Estado para manejar expandir/contraer comentarios
  const [expandedPostId, setExpandedPostId] = useState(null);

  // Actualizar posts cuando cambia la data inicial del hook
  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

  // Alternar mostrar/ocultar comentarios para un post
  const toggleComments = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  // Agregar nuevo comentario al post en el estado local
  const handleCommentAdded = (postId, newComment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  if (loading) {
    return <p className="text-center mt-4">Cargando publicaciones...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-4">Error al cargar publicaciones.</p>;
  }

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

      {/* Renderizar posts */}
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
