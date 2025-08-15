import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./components/Layout";

import Home from "./pages/Home";
import VehicleDetail from "./pages/VehicleDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NewVehicle from "./pages/Dashboard/NewVehicle";

import { NotFound } from "./pages/NotFound";

import { Private } from "./routes/Private";
import { Guest } from "./routes/Guest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "veiculo/:id",
        element: <VehicleDetail />,
      },
      {
        path: "dashboard",
        element: (
          <Private>
            <Dashboard />
          </Private>
        ),
      },
      {
        path: "dashboard/novo-veiculo",
        element: (
          <Private>
            <NewVehicle />
          </Private>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Guest>
        <Login />
      </Guest>
    ),
  },
  {
    path: "/cadastro",
    element: (
      <Guest>
        <Register />
      </Guest>
    ),
  },
]);
