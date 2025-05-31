import { createBrowserRouter } from "react-router";
import GuestLayout from "../layouts/guestLayout";
import Registre from "../pages/auth/registre";
import Login from "../pages/auth/login";
import Home from "../pages/auth/home";



const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout/>,
        children: [
            {
                path: "/register",
                element: <Registre/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                index: true,
                element: <Home/>

            }
        ]
    }
])

export default router