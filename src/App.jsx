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
import UserProfilePage from './pages/UserProfilePage';
import WikiPage from './pages/WikiPage';
import { ROLES } from './utils/icons/roles';
import BookmarksPage from './pages/BookmarksPage';

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
          path: 'movies',
          children: [
            {
              path: 'details/:movieId',
              element: <MovieDetailsPage />,
            },
            {
              path: 'wiki/:movieId',
              element: <WikiPage />,
            },
          ],
        },
        {
          path: 'user/profile/:id',
          element: <UserProfilePage />,
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
              element: <BookmarksPage />,
            },
            {
              path: 'create-wiki/:movieId',
              element: (
                <ProtectedRoute
                  allowedRoles={Object.keys(ROLES).filter(
                    (role) => role === 'admin' || role === 'contributor'
                  )}
                />
              ),
              children: [
                {
                  index: true,
                  element: <CreateWikiPage />,
                },
              ],
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
