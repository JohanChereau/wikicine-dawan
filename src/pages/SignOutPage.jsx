import BackgroundMesh from '@/components/ui/BackgroundMesh';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/services/supabase/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

const SignOutPage = () => {
  const navigate = useNavigate();

  const handleGoToPreviousPage = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <section className="py-20 grid grid-flow-row gap-16 place-items-center w-full">
      <div className="text-center relative">
        <BackgroundMesh size="w-1/3" />
        <h1 className="text-3xl md:text-6xl font-bold">Sign Out</h1>
        <p className="text-muted-foreground mt-4 md:text-xl">
          Do you really want to sign out?
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="outline" asChild>
          <Link to=".." onClick={handleGoToPreviousPage}>
            Back
          </Link>
        </Button>
        <Button
          variant="destructive"
          onClick={async () => await supabase.auth.signOut()}
        >
          Sign Out
        </Button>
      </div>
    </section>
  );
};

export default SignOutPage;
