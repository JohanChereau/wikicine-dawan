import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import ErrorPage from './pages/ErrorPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ProtectedRoute from './components/ProtectedRoute';
import SignOutPage from './pages/SignOutPage';
import CreateWikiPage from './pages/CreateWikiPage';
import { ROLES } from './utils/icons/roles';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'movie',
          children: [
            {
              path: 'details/:movieId',
              element: <MovieDetailsPage />,
            },
            {
              path: 'wiki/:movieId',
              element: null,
            },
          ],
        },
        {
          path: 'user/:username',
          element: null,
        },
        {
          path: 'signup',
          element: <SignUpPage />,
        },
        {
          path: 'signin',
          element: <SignInPage />,
        },
        {
          path: 'dashboard',
          element: <ProtectedRoute allowedRoles={Object.keys(ROLES)} />,
          children: [
            {
              index: true,
              element: null,
            },
            {
              path: 'settings',
              element: null,
            },
            {
              path: 'bookmarks',
              element: null,
            },
            {
              path: 'create-wiki',
              element: (
                <ProtectedRoute
                  allowedRoles={Object.keys(ROLES).filter(
                    (role) => role === 'admin' || role === 'contributor'
                  )}
                >
                  <CreateWikiPage />
                </ProtectedRoute>
              ),
            },
            {
              path: 'signout',
              element: <SignOutPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
