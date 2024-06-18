import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWikiMovie } from '@/hooks/use-wiki';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/TextArea';
import { useAuth } from '@/services/providers/auth-provider';
import { LoaderCircleIcon } from 'lucide-react';

const FormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters' }),
});

const CreateWikiPage = () => {
  const { movieId } = useParams();
  const { getWikiMovie, updateWikiMovie } = useWikiMovie(movieId);
  const { data: wikiData, isLoading: isWikiLoading } = getWikiMovie;

  const { session } = useAuth();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: wikiData?.movie_title || '',
      content: wikiData?.content || '',
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  const onSubmit = async (data) => {
    try {
      await updateWikiMovie({
        movie_id: movieId,
        user_id: session?.user?.id,
        movie_title: data.title,
        content: data.content,
      });
      reset();
    } catch (error) {
      setError('root', {
        message: error.message || 'An unknown error occurred',
      });
      console.error('Error updating wiki:', error.message);
    }
  };

  if (isWikiLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Create or Edit Wiki for Movie</h1>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter the title"
                    {...field}
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter the content" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="inline-flex items-center gap-2">
                <LoaderCircleIcon className="animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : isSubmitSuccessful ? (
              'Submitted'
            ) : (
              'Submit'
            )}
          </Button>

          <FormRootError />
        </form>
      </Form>
    </div>
  );
};

export default CreateWikiPage;
