import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Online from './Online.jsx';
import Bot from './Bot.jsx';
import Local from './Local.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/online",
    element: <Online />,
  },
  {
    path: "/bot",
    element: <Bot />,
  },
  {
    path: "/local",
    element: <Local />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)