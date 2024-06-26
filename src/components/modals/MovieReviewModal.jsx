import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMovieReviews } from '@/hooks/use-reviews';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Button } from '../ui/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError,
} from '@/components/ui/Form';
import { LoaderCircleIcon } from 'lucide-react';
import { Slider } from '../ui/Slider';
import MovieRating from '../ui/MovieRating';
import { Textarea } from '../ui/TextArea';
import { useAuth } from '@/services/providers/auth-provider';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  rating: z
    .number({
      message: 'Please select a rating',
    })
    .min(1, { message: 'Rating must be at least 1' })
    .max(5, { message: 'Rating must not exceed 5' }),
  comment: z
    .string({
      message: 'Please enter a comment',
    })
    .min(10, { message: 'Comment must be at least 10 characters' })
    .max(10000, { message: 'Comment must not exceed 10000 characters' }),
});

const generateImageUrl = (posterPath) =>
  posterPath
    ? `https://image.tmdb.org/t/p/original${posterPath}`
    : 'https://placehold.co/400x600/FACC15/black?text=Wikicin%C3%A9';

const MovieReviewModal = ({
  triggerDisabled,
  movieTitle,
  moviePoster,
  movieId,
  tabRole,
  reviewExists,
}) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rating: 1,
      comment: '',
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;
  const { addReview } = useMovieReviews(movieId);
  const { session, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (data) => {
    try {
      await addReview({
        ...data,
        user_id: session?.user?.id,
        movie_id: movieId,
        movie_title: movieTitle || 'Unknown title',
        movie_poster: generateImageUrl(moviePoster),
      });
      reset();
      toast({
        title: 'Review added successfully',
        description: 'Your review has been added successfully. Thank you!',
        status: 'success',
      });
    } catch (error) {
      setError('root', {
        message: error?.message || 'An unknown error occurred',
      });
      toast({
        title: 'Error adding review',
        description: error?.message || 'An unknown error occurred',
        status: 'error',
      });
      console.error('Error adding review:', error?.message);
    }
  };

  if (!session || !profile) {
    return (
      <Button onClick={() => navigate('/signin')} className="text-xs sm:text-base">
        Sign in to review
      </Button>
    );
  }

  const shouldDisableButton = triggerDisabled || isSubmitting || isSubmitSuccessful;
  const userRole = profile?.role;
  const isUserInCorrectTab =
    (userRole !== 'contributor' && tabRole === 'user') ||
    (userRole === 'contributor' && tabRole === 'contributor');
  const buttonMessage = reviewExists ? 'Review already posted' : 'Add a review';

  return (
    <Dialog>
      <DialogTrigger asChild>
        {isUserInCorrectTab && (
          <Button
            disabled={shouldDisableButton || reviewExists}
            className="text-xs sm:text-base"
          >
            {buttonMessage}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Review {movieTitle}</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-[800px] w-full"
          >
            <FormField
              control={control}
              name="rating"
              render={({ field: { value, onChange } }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      defaultValue={[value]}
                      onValueChange={(vals) => onChange(vals[0])}
                      value={[value]}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter a rating between 1 and 5 for the movie.
                  </FormDescription>
                  <MovieRating
                    rating={value}
                    ratingScale={5}
                    showVoteCount={false}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more about your opinion of the movie..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={shouldDisableButton}>
              {isSubmitting ? (
                <div className="inline-flex items-center gap-2">
                  <LoaderCircleIcon className="animate-spin" />
                  <span>Submitting review</span>
                </div>
              ) : isSubmitSuccessful ? (
                'Review submitted'
              ) : (
                'Submit my review'
              )}
            </Button>
            <FormRootError />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MovieReviewModal;
