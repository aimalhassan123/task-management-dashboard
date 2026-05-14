import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import Chat from "./pages/Chat";
import Reports from "./pages/Reports";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/chat"
          element={<Chat />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;