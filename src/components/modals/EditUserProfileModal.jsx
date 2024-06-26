import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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

import { Textarea } from '../ui/TextArea';
import { useAuth } from '@/services/providers/auth-provider';
import { useUserProfile } from '@/hooks/use-userProfile';
import { useEffect } from 'react';
import { Input } from '../ui/Input';
import { Skeleton } from '../ui/Skeleton';

const optionalUrl = z.custom((value) => {
  return value === '' || /^https?:\/\/.*/.test(value);
});

const FormSchema = z.object({
  avatar: optionalUrl.optional(),
  banner: optionalUrl.optional(),
  bio: z.string().max(1000).optional(),
});

const EditUserProfileModal = ({ userId }) => {
  const { getUserProfile, updateUserProfile } = useUserProfile(userId);
  const {
    data: userProfileData,
    isLoading: isUserProfileLoading,
    isError: isUserProfileError,
  } = getUserProfile;

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      avatar: '',
      banner: '',
      bio: '',
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  const { session } = useAuth();

  useEffect(() => {
    if (userProfileData) {
      form.setValue('avatar', userProfileData?.avatar || '');
      form.setValue('banner', userProfileData?.banner || '');
      form.setValue('bio', userProfileData?.bio || '');
    }
  }, [userProfileData, form]);

  const onSubmit = async (data) => {
    try {
      await updateUserProfile(data);
    } catch (error) {
      setError('root', {
        message: error.message || 'An unknown error occurred',
      });
      console.error('Error updating profile:', error.message);
    }
  };

  if (!session) {
    return null;
  }

  if (isUserProfileLoading) {
    return <Skeleton className="w-32 h-10" />;
  }

  if (isUserProfileError) {
    return null;
  }

  const shouldDisplayEditButton = session?.user?.id === userId;
  const shouldDisableButton = isSubmitting || isSubmitSuccessful;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {shouldDisplayEditButton ? <Button>Edit profile</Button> : null}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit my profile</DialogTitle>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-[800px] w-full"
          >
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input placeholder="Avatar URL" {...field} />
                  </FormControl>
                  <FormDescription>
                    Paste the URL of your avatar image.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="banner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner</FormLabel>
                  <FormControl>
                    <Input placeholder="Banner URL" {...field} />
                  </FormControl>
                  <FormDescription>
                    Paste the URL of your banner image.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more about yourself..."
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
                  <span>Saving profile</span>
                </div>
              ) : isSubmitSuccessful ? (
                'Profile saved'
              ) : (
                'Save my profile'
              )}
            </Button>

            <FormRootError />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserProfileModal;
