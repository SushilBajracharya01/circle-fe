import React from 'react'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

//
import { store } from './_redux/store';

//
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import Feed from './pages/Feed';
import { ROLES } from './constants/constants';
import PersistLoginWrapper from './components/persistLogin/PersistLoginWrapper';
import RequireAuth from './components/requireAuth/RequireAuthWrapper';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PersistLoginWrapper />,
    children: [{
      element: <RequireAuth allowedRoles={ROLES} />,
      children: [
        {
          path: '',
          element: <Feed />
        }
      ]
    }
    ]
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ]
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />

        <ToastContainer />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
