import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Root } from "@/routes/root";
import { ErrorPage } from "@/pages/error-page";
import { MonitorPage } from "@/pages/monitor-page";
import { AlertsPage } from "@/pages/alerts-page";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <MonitorPage />,
        },
        {
          path: "/alerts",
          element: <AlertsPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};