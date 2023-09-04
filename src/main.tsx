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
import PersistLoginWrapper from './pages/persistLogin/PersistLoginWrapper';
import Feed from './pages/Feed';
import RequireAuth from './pages/requireAuth/RequireAuthWrapper';
import { ROLES } from './constants/constants';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <PersistLoginWrapper />,
    children: [{
      path: '',
      element: <RequireAuth allowedRoles={ROLES} />,
      children: [
        {
          path: 'feed',
          element: <Feed />
        }
      ]
    }
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
