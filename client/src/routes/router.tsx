import { createBrowserRouter } from "react-router";
import GuestLayout from "../layouts/guestLayout";
import Registre from "../pages/auth/registre";
import Login from "../pages/auth/login";
import Home from "../pages/auth/home";
import PrivateRoute from "./privateRoute";
import RootLayout from "../layouts/rootLayout";



const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute/>,
        children: [
           {
            path: "/",
            element: <RootLayout/>,
            children: [
              {
                index: true,
                element: <Home/>
              }
            ]
           }
        ]
    },
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
        ]
    }
])

export default router