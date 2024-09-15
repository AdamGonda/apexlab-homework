import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Root } from "./root";
import { ErrorPage } from "../components/error-page";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <h1>monitor page</h1>,
        },
        {
          path: "/alerts",
          element: <h1>alert page</h1>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};