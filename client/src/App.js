import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, Recover, ResetPassword, Signup } from "./pages";
import { Toaster } from "react-hot-toast";
import Email from "./pages/Email";
import ProtectedRoute, { CheckEmailRoute } from "./pages/ProtectedRoute";
import UserUpdate from "./pages/UserUpdate";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/update",
      element: (
        <ProtectedRoute>
          <UserUpdate />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/email",
      element: <Email />,
    },
    {
      path: "/recover",
      element: (
        <CheckEmailRoute>
          <Recover />
        </CheckEmailRoute>
      ),
    },
    {
      path: "/reset",
      element: (
        <CheckEmailRoute>
          <ResetPassword />
        </CheckEmailRoute>
      ),
    },
  ]);
  return (
    <>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
