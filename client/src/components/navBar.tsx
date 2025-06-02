import { useState } from "react";
import { useAuthStore } from "../store/auth";
import { Bell, MessageSquare, LogOut, Home, ChevronDown } from "lucide-react";
import { NavLink } from "react-router";

const NavBar = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow fixed w-full z-20 top-0 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-3">
        {/* Brand */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">ZERO</span>
        </a>

        {/* Center Menu Icons */}
        <div className="flex space-x-20">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 ${
                  isActive ? "text-blue-600" : ""
                }`
              }
            >
              <Home
                className={`w-6 h-6 transition-colors ${
                  location.pathname === "/" ? "stroke-blue-600" : ""
                }`}
              />
            </NavLink>
          <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
            <MessageSquare className="w-6 h-6" />
          </button>
          <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
            <Bell className="w-6 h-6" />
          </button>
        </div>

        {/* Right Profile & Logout */}
        <div className="flex items-center space-x-6">
          {/* User Dropdown */}
          {user && (
            <div className="relative bg-gray-100 py-4 p-1 rounded-full">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 text-gray-800 dark:text-white hover:text-blue-600"
              >
                <span className="text-sm font-medium">{user.name}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50">
                  <button
                    onClick={logout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
