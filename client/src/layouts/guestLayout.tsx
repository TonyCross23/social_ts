import { Outlet } from "react-router";

const GuestLayout = () => {
    // if (token) {
    //     return <Navigate to="/" />;
    // }
    return (
        <>
            <main></main>
            <Outlet />
        </>
    );
};

export default GuestLayout;