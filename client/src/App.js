import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import Store from "./feature/Store";
import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";

function App() {
  const router = createBrowserRouter(routes);
  return (
    <Provider store={Store}>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
