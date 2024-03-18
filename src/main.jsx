import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Online from './Online.jsx';
// import Bot from './Bot.jsx';
import Local from './Local.jsx';
import Soon from './Soon.jsx';
import Footer from './Components/Footer.jsx';
import Sbot from './Sbot.jsx';

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
    element: <Soon />,
  },
  {
    path: "/local",
    element: <Local />,
  },
  {
    path: "/dev",
    element: <Sbot />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>

    <RouterProvider router={router} />
    <Footer />
  </>,
)
