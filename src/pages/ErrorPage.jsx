import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const {
    status,
    statusText,
    error: { message },
  } = useRouteError();

  return (
    <>
      {status} - {statusText} : {message}
    </>
  );
};

export default ErrorPage;
