import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { supabase } from '@/services/supabase/supabaseClient';
import { useAuth } from '@/services/providers/auth-provider';
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
import { Input } from '@/components/ui/Input';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircleIcon } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const emailSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' })
      .refine((password) => /[A-Z]/.test(password), {
        message: 'Password must contain at least one uppercase letter.',
      })
      .refine((password) => /[a-z]/.test(password), {
        message: 'Password must contain at least one lowercase letter.',
      })
      .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
        message: 'Password must contain at least one special character.',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const ResetPasswordPage = () => {
  const { authEvent } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isTokenPresent, setIsTokenPresent] = useState(false);

  const form = useForm({
    resolver: zodResolver(isTokenPresent ? passwordSchema : emailSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');
    setIsTokenPresent(!!token);
  }, []);

  useEffect(() => {
    if (authEvent === 'PASSWORD_RECOVERY') {
      toast({
        title: 'Password reset initiated',
        description: 'Please enter your new password.',
        status: 'info',
      });
      setIsTokenPresent(true);
    }
  }, [authEvent, toast]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (!isTokenPresent) {
        const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
          redirectTo: `${import.meta.env.VITE_APP_URL}/reset-password`,
        });
        if (error) {
          throw error;
        }

        setIsSuccess(true);
        toast({
          title: 'Reset email sent',
          description: 'Please check your email for a link to reset your password.',
          status: 'success',
        });
      } else {
        const { error } = await supabase.auth.updateUser({
          password: data.password,
        });
        if (error) {
          throw error;
        }

        toast({
          title: 'Password reset successfully',
          description: 'You can now log in with your new password.',
          status: 'success',
        });
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      setError('root', {
        message: error.message || 'An unknown error occurred',
      });
      toast({
        title: 'Error',
        description: error.message || 'An unknown error occurred',
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 grid grid-flow-row gap-16 place-items-center w-full">
      <div className="text-center">
        <h1 className="text-3xl md:text-6xl font-bold">
          {isTokenPresent ? 'Reset Password' : 'Request Password Reset'}
        </h1>
        <p className="text-muted-foreground mt-4 md:text-xl">
          {isTokenPresent
            ? 'Enter your new password below.'
            : 'Enter your email below to receive a reset link.'}
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-w-[800px] w-full"
        >
          {isSuccess && !isTokenPresent ? (
            <p className="text-center text-green-500">
              A reset link has been sent to your email {form.getValues('email')}.
            </p>
          ) : (
            <>
              {!isTokenPresent && (
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {isTokenPresent && (
                <>
                  <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? (
                  <div className="inline-flex items-center gap-2">
                    <LoaderCircleIcon className="animate-spin" />
                    <span>
                      {isTokenPresent ? 'Resetting Password...' : 'Sending...'}
                    </span>
                  </div>
                ) : isTokenPresent ? (
                  'Reset Password'
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </>
          )}

          <FormRootError />

          {!isTokenPresent && (
            <p className="text-center">
              {'Remembered your password? '}
              <Link to="/signin" className="underline">
                Sign in
              </Link>
            </p>
          )}
        </form>
      </Form>
    </section>
  );
};

export default ResetPasswordPage;
