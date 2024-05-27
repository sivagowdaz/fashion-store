import Home from "./pages/Home";
import Products from "./pages/Products";
import {
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "products",
      element: <Products/>,
    },
]);

export default router
