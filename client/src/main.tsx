import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import axios from 'axios';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Favorite from './pages/Favorite.tsx';
import Dashboard from './pages/Dashboard.tsx';
import SignUp from './pages/SignUp.tsx';

axios.defaults.baseURL = import.meta.env.VITE_BACK_URL; 
axios.defaults.withCredentials = true; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: '/favorites',
        element: <Favorite />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <SignUp />
  },
  {
    path: "*",
    element: <div className="flex items-center justify-center h-screen">
      <p className="text-xl">404 - Page Not Found</p>
    </div>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)