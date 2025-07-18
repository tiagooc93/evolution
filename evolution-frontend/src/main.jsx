import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Stopwatch from "./pages/StopWatch.jsx";
import AllTimeActivities from "./pages/AllTimeActivities.jsx";
import Calendar from "./pages/Calendar.jsx";
import Graphics from "./pages/Graphics.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/home/statistics/all-time",
    element: <AllTimeActivities />,
  },
  {
    path: "/home/statistics/graphics",
    element: <Graphics />,
  },
  {
    path: "/home/statistics/calendar",
    element: <Calendar />,
  },
  {
    path: "/home/stopwatch",
    element: <Stopwatch />,
  },
  {
    path: "/",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
