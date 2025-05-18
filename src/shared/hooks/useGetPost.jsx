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

            if (courseName) {
                response = await getPostsByCourse(courseName);
            } else {
                response = await getPost();
            }

            if (response.error) {
                setError(response.e);
                setPosts([]);
            } else {
                setPosts(response.data.posts || response.data || []);
                setError(null);
            }

            setLoading(false);
        }

        fetchPosts();
    }, [courseName]);

    return {
        posts,
        loading,
        error,
    };
}
