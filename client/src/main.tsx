import ReactDOM from "react-dom/client";
import "@/styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "@/lib/routes.tsx";
import "react-loading-skeleton/dist/skeleton.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={createBrowserRouter(routes)} />,
);