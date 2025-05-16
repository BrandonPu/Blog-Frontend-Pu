import { useEffect, useState } from "react";
import { getPost } from "../../services";

export function useGetPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            const response = await getPost();

            if (response.error) {
                setError(response.e);
                setPosts([]);
            } else {
                setPosts(response.data.posts);
                setError(null);
            }

            setLoading(false);
        }

        fetchPosts();
    }, []);

    return {
        posts,
        loading,
        error
    };
}
