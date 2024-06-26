import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWikiMovie } from '@/hooks/use-wiki';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError,
} from '@/components/ui/Form';
import { useAuth } from '@/services/providers/auth-provider';
import { LoaderCircleIcon, CheckIcon } from 'lucide-react';
import MarkdownEditor from '@/components/MarkdownEditor';
import { useMovies } from '@/hooks/use-movies';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/Toast';

const FormSchema = z.object({
  content: z.string().min(10, 'Content must be at least 10 characters'),
});

const CreateWikiPage = () => {
  const { movieId } = useParams();
  const { session } = useAuth();
  const { getWikiMovie, updateWikiMovie, insertWikiMovie } = useWikiMovie(movieId);
  const { data: wikiData, isLoading: isWikiDataLoading } = getWikiMovie;
  const { useMovieDetails } = useMovies();
  const { data: movieData, isLoading: isMovieDataLoading } =
    useMovieDetails(movieId);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [saved, setSaved] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: wikiData?.content || '',
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    reset({ content: wikiData?.content || '' });
  }, [wikiData, reset]);

  const handleGoToPreviousPage = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const onSubmit = async (data) => {
    try {
      const requestData = {
        movie_id: movieId,
        user_id: session?.user?.id,
        movie_title: movieData?.title || 'Unknown title',
        content: data.content,
      };

      if (wikiData) {
        await updateWikiMovie(requestData);
      } else {
        await insertWikiMovie(requestData);
      }

      reset();
      setSaved(true);
      toast({
        title: 'Wiki Saved',
        description: 'The wiki page has been successfully saved.',
      });
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      setError('content', { message: error.message || 'An unknown error occurred' });
      console.error('Error saving wiki:', error.message);
      toast({
        variant: 'destructive',
        title: 'Save Failed',
        description: 'An error occurred while saving the wiki page.',
        action: (
          <ToastAction onClick={() => handleSubmit(onSubmit)}>Try again</ToastAction>
        ),
      });
    }
  };

  if (isWikiDataLoading || isMovieDataLoading) {
    return (
      <section className="grid gap-8">
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
      </section>
    );
  }

  return (
    <section className="mx-auto">
      <h1 className="text-2xl md:text-4xl text-center font-bold mb-6">
        Wiki: {movieData?.title || 'Unknown Title'}
      </h1>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <Button variant="outline" asChild>
              <Link to=".." onClick={handleGoToPreviousPage}>
                Back
              </Link>
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="inline-flex items-center gap-2">
                  <LoaderCircleIcon className="animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : saved ? (
                <div className="inline-flex items-center gap-2">
                  <CheckIcon />
                  <span>Saved</span>
                </div>
              ) : (
                'Save'
              )}
            </Button>
          </div>
          <FormField
            control={control}
            name="content"
            render={() => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Controller
                    name="content"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <MarkdownEditor
                        value={value}
                        onChange={onChange}
                        readOnly={false}
                      />
                    )}
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.content?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormRootError />
        </form>
      </Form>
    </section>
  );
};

export default CreateWikiPage;
