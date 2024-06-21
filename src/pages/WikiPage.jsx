import MarkdownPreview from '@/components/MarkdownPreview';
import { Button } from '@/components/ui/Button';
import { useWikiMovie } from '@/hooks/use-wiki';
import { useAuth } from '@/services/providers/auth-provider';
import { Link, useParams, useNavigate } from 'react-router-dom';

const WikiPage = () => {
  const { movieId } = useParams();
  const { getWikiMovie } = useWikiMovie(movieId);
  const { data: wikiData, isLoading } = getWikiMovie;
  const { profile } = useAuth();
  const navigate = useNavigate();

  const handleGoToPreviousPage = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const isContributorOrAdmin =
    profile?.role === 'contributor' || profile?.role === 'admin';

  if (isLoading) return <p>Loading...</p>;

  if (!wikiData)
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

  return (
    <article className="grid gap-6">
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
      <MarkdownPreview>{wikiData?.content}</MarkdownPreview>
    </article>
  );
};

export default WikiPage;
