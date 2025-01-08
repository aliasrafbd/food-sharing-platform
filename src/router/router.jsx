import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/home/home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import AvailableFoods from "../pages/AvailableFoods";
import AddFood from "../pages/AddFood";
import ManageMyFoods from "../pages/ManageMyFoods";
import MyFoodRequest from "../pages/MyFoodRequest";
import FoodDetails from "../pages/FoodDetails";
import UpdateFood from "../pages/UpdateFood";
import PrivateRoute from "./PrivateRoute";
import AddBlog from "../pages/AddBlog";
import BlogDetails from "../pages/BlogDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: async () => {
                    const featuredFoodsRes = await fetch("https://food-sharing-server-phi.vercel.app/foods/featured");
                    const featuredFoods = await featuredFoodsRes.json();

                    const ourBlogsRes = await fetch("https://food-sharing-server-phi.vercel.app/blogs");
                    const ourAllBlogs = await ourBlogsRes.json();

                    return { featuredFoods, ourAllBlogs }
                },
            },
            {
                path: '/register',
                element: <Register></Register>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/availablefoods',
                element: <AvailableFoods></AvailableFoods>,
                
            },
            {
                path: '/addfood',
                element: <PrivateRoute><AddFood></AddFood></PrivateRoute>
            },
            {
                path: '/managemyfoods',
                element: <PrivateRoute><ManageMyFoods></ManageMyFoods></PrivateRoute>
            },
            {
                path: '/myfoodrequest',
                element: <PrivateRoute><MyFoodRequest></MyFoodRequest></PrivateRoute>
            },
            {
                path: '/addblog',
                element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute>
            },
            {
                path: "/food/:id",
                element: <FoodDetails></FoodDetails>,
                loader: ({ params }) => fetch("https://food-sharing-server-phi.vercel.app/availablefoods"),
            },
            {
                path: "/blogdetails/:id",
                element: <BlogDetails></BlogDetails>,
                loader: ({ params }) => fetch("https://food-sharing-server-phi.vercel.app/blogs"),
            },
            {
                path: "/updatefood/:id",
                element: <UpdateFood></UpdateFood>,
                loader: ({ params }) => fetch(`https://food-sharing-server-phi.vercel.app/availablefoods/${params.id}`),
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    },
]);

export default router;