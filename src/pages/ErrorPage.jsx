import BackgroundMesh from '@/components/ui/BackgroundMesh';
import { Button } from '@/components/ui/Button';
import { Link, useNavigate, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const {
    status,
    statusText,
    error: { message },
  } = useRouteError();

  const navigate = useNavigate();

  const handleGoToPreviousPage = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <section className="grid grid-flow-row place-content-center min-h-svh">
      <div className="container grid gap-8 text-center relative">
        <BackgroundMesh color="bg-destructive" size="w-1/3" />
        <h2 className="font-bold text-6xl">Oops!</h2>
        <p className="font-bold text-2xl">
          {status || ''} - {statusText || ''}
        </p>
        <p>{message || ''}</p>

        <div>
          <Button variant="outline" asChild>
            <Link to=".." onClick={handleGoToPreviousPage}>
              Back
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
