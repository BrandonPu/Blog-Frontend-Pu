import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000/BlogSystemPu/v1",
    timeout: 5000,
    headers: { "Cache-Control": "no-cache, no-store, must-revalidate" }
})

export const getPost = async (params) => {
    try {
        return await apiClient.get("/post/getPosts", { params });
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const getPostsByCourse = async (courseName) => {
    try {
        return await apiClient.get("/post/getPosts", { params: { courseName } });
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const createComment = async ({ name, content, postId }) => {
    try {
        const response = await apiClient.post("/comment/newComment", {
            name,
            content,
            postId,
        });
        return response.data;
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};
