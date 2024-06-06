import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import SignUpPage from './pages/SignUpPage';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <HomePage />,
        },
        {
          path: 'signup',
          element: <SignUpPage />,
        },
        {
          path: 'signin',
          element: null,
        },
        {
          path: 'logout',
          element: null,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
