import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
