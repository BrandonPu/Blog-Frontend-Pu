import React from "react";
import { PostsView } from "../../components/Post/PostsView";

export function PostPage() {
    return (
        <main style={{ backgroundColor: "#f9fafb", minHeight: "100vh", padding: "2rem 1rem" }}>
            <h1 style={{
                fontSize: "2rem",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "2rem",
                color: "#111827"
            }}>
                Publicaciones del Blog de Aprendisaje
            </h1>
            <PostsView />
        </main>
    );
}