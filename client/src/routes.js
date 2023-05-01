import { Home, Login, Recover, ResetPassword, Signup } from "./pages";
import Email from "./pages/Email";
import ProtectedRoute, { CheckEmailRoute } from "./pages/ProtectedRoute";

export const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
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
]