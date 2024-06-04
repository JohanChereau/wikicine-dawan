import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const {
    status,
    statusText,
    error: { message },
  } = useRouteError();

  return (
    <div>
      {status} - {statusText} : {message}
    </div>
  );
};

export default ErrorPage;
