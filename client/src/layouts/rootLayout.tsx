import { Outlet } from "react-router";
import NavBar from "../components/navBar";

const RootLayout = () => {
  return (
    <>
    <NavBar/>
      <div className="mt-22">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
