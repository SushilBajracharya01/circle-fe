import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import { SkeletonTheme } from 'react-loading-skeleton';
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
import 'react-loading-skeleton/dist/skeleton.css';

//
import Home from './pages/Home';
import { ROLES } from './constants/constants';
import PersistLoginWrapper from './components/persistLogin/PersistLoginWrapper';
import RequireAuth from './components/requireAuth/RequireAuthWrapper';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import CirclePage from './pages/Circle';
const router = createBrowserRouter([
  {
    path: "/",
    element: <PersistLoginWrapper />,
    children: [{
      element: <RequireAuth allowedRoles={ROLES} />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: "circle/:id",
          element: <CirclePage />,
        },
        {
          path: "profile/:id",
          element: <CirclePage />,
        },
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <SkeletonTheme baseColor="#e4e4e4" highlightColor="#eeeeee">
      <Provider store={store}>
        <RouterProvider router={router} />

        <ToastContainer />
      </Provider>
    </SkeletonTheme>
  </QueryClientProvider>
)
