import { DashboardPage } from "./pages/dashboard";
import { PostPage } from "./pages/post/PostPage"; 

const routes = [
    { path: "/posts", element: <PostPage /> },  
    { path: "/*", element: <DashboardPage /> }  
];

export default routes;