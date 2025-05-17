import React from "react";
import { PostsView } from "../../components/Post/PostsView";
import { NavbarPosts } from "../../components/Post/NavbarPosts"; // Asegúrate de que la ruta sea correcta

export function PostPage() {
    return (
        <>
            <NavbarPosts />

            <main style={{ backgroundColor: "#f9fafb", minHeight: "100vh", padding: "2rem 1rem" }}>
                <h1 style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "2rem",
                    color: "#111827"
                }}>
                    Publicaciones del Blog de Aprendizaje
                </h1>

                <PostsView />
            </main>
        </>
    );
}