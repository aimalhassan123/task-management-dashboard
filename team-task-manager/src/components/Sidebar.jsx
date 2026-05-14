import { Link, useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";

import { auth } from "../firebase/firebase";

function Sidebar() {

  const navigate = useNavigate();

  // LOGOUT
  const handleLogout = async () => {

    await signOut(auth);

    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-black text-white p-6 flex flex-col">

      {/* TITLE */}
      <div>

        <h1 className="text-3xl font-bold mb-12">
          Task Manager
        </h1>

        {/* NAVIGATION */}
        <ul className="space-y-6 text-lg">

          <li className="hover:text-gray-300 transition">
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>

          <li className="hover:text-gray-300 transition">
            <Link to="/dashboard">
              Tasks
            </Link>
          </li>

          <li className="hover:text-gray-300 transition">
            <Link to="/notifications">
              Notifications
            </Link>
          </li>

          <li className="hover:text-gray-300 transition">
            <Link to="/chat">
              Chat
            </Link>
          </li>

          <li className="hover:text-gray-300 transition">
            <Link to="/reports">
              Reports
            </Link>
          </li>

        </ul>

      </div>

      {/* LOGOUT BUTTON */}
      <div className="mt-auto">

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;