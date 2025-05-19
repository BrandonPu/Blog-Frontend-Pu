import { useEffect, useState } from "react";
import { getPost, getPostsByCourse } from "../../services";

export function useGetPost(courseName = "") {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            let response;

            try {
                if (courseName) {
                    response = await getPostsByCourse(courseName);
                } else {
                    response = await getPost();
                }

                if (response.error) {
                    throw new Error(response.e || "Error al cargar las publicaciones");
                }

                setPosts(response.data?.posts || response.data || []);
                setError(null);
            } catch (err) {
                setError(err.message || "Error al cargar las publicaciones");
                setPosts([]);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, [courseName]);

    return {
        posts,
        loading,
        error,
    };
}
