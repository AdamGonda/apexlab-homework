import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Root } from "@/routes/root";
import { ErrorPage } from "@/components/error-page";
import { MonitorPage } from "@/components/monitor-page";
import { AlertsPage } from "@/components/alerts-page";

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