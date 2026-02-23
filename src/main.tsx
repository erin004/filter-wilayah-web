import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import "./index.css";
import FilterPage from './filterPage';
import { filterLoader } from "./loaders/filterLoader";

const router = createBrowserRouter([
  {
    path: '/',
    element: <FilterPage />,
    loader: filterLoader,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);