import MarkdownPreview from '@/components/MarkdownPreview';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import RoleBadge from '@/components/ui/RoleBadge';
import { Skeleton } from '@/components/ui/Skeleton';
import { useWikiMovie } from '@/hooks/use-wiki';
import { useAuth } from '@/services/providers/auth-provider';
import { CalendarDaysIcon } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const WikiPage = () => {
  const { movieId } = useParams();
  const { getWikiMovie } = useWikiMovie(movieId);
  const { data: wikiData, isLoading, isError, error } = getWikiMovie;
  const { profile } = useAuth();
  const navigate = useNavigate();

  const handleGoToPreviousPage = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const isContributorOrAdmin =
    profile?.role === 'contributor' || profile?.role === 'admin';

  if (isLoading) {
    return (
      <section className="grid gap-8">
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-96" />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="grid grid-flow-row gap-6 place-items-center h-full">
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          Error loading wiki data
        </h1>
        <p>{error?.message || 'An unexpected error occurred.'}</p>
        <div className="flex items-center gap-4 flex-wrap">
          <Button variant="outline" asChild>
            <Link to=".." onClick={handleGoToPreviousPage}>
              Back
            </Link>
          </Button>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </section>
    );
  }

  if (!wikiData) {
    return (
      <section className="grid grid-flow-row gap-6 place-items-center h-full">
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          This wiki doesn&apos;t exist yet!
        </h1>
        <div className="inline-flex items-center gap-4 flex-wrap justify-center">
          <Button variant="outline" asChild>
            <Link to=".." onClick={handleGoToPreviousPage}>
              Back
            </Link>
          </Button>
          {isContributorOrAdmin && (
            <Button asChild>
              <Link to={`/dashboard/create-wiki/${movieId}`}>
                Create the wiki page
              </Link>
            </Button>
          )}
        </div>
      </section>
    );
  }

  return (
    <article className="grid gap-6 max-w-4xl mx-auto">
      <section className="flex items-center justify-between gap-4 flex-wrap">
        <Button variant="outline" asChild>
          <Link to=".." onClick={handleGoToPreviousPage}>
            Back
          </Link>
        </Button>
        {isContributorOrAdmin && (
          <Button asChild className="ml-auto">
            <Link to={`/dashboard/create-wiki/${movieId}`}>Edit wiki</Link>
          </Button>
        )}
      </section>
      <MarkdownPreview>
        {wikiData?.content || 'No content available.'}
      </MarkdownPreview>

      <section className="grid grid-flow-row gap-6 mt-6">
        <p className="text-lg sm:text-2xl font-bold">This page was created by</p>
        <Card>
          <CardHeader className="flex flex-row flex-wrap gap-4 justify-between">
            <Link
              to={`/user/profile/${wikiData?.user_id || 'unknown'}`}
              className="inline-flex items-center gap-4"
            >
              <img
                src={
                  wikiData?.user_profiles?.avatar ||
                  'https://placehold.co/300x300/FACC15/black?text=Wikicin%C3%A9'
                }
                alt={`${
                  wikiData?.user_profiles?.username || 'Unknown User'
                }'s avatar`}
                className="aspect-square object-cover rounded-full w-8 md:w-12 cursor-pointer"
              />
              <div className="inline-flex items-center gap-2">
                <p className="font-semibold text-base md:text-xl hover:underline hover:underline-offset-4 hover:decoration-accent-foreground">{`@${
                  wikiData?.user_profiles?.username || 'Unknown User'
                }`}</p>
                <RoleBadge role={wikiData?.user_profiles?.role || 'user'} />
              </div>
            </Link>
          </CardHeader>
          <CardContent>
            <p>{wikiData?.user_profiles?.bio || 'No biography available.'}</p>
          </CardContent>
          <CardFooter className="w-fit flex gap-2 ml-auto text-muted-foreground">
            <CalendarDaysIcon className="max-w-6" />
            <span>
              Last updated on{' '}
              {wikiData?.updated_at
                ? new Date(wikiData?.updated_at).toLocaleDateString()
                : 'Unknown Date'}
            </span>
          </CardFooter>
        </Card>
      </section>
    </article>
  );
};

export default WikiPage;
