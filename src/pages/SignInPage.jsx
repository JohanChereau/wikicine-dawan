import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { supabase } from '@/services/supabase/supabaseClient';
import { useAuth } from '@/services/providers/auth-provider';

import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
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
import { Link, useNavigate } from 'react-router-dom';
import BackgroundMesh from '@/components/ui/BackgroundMesh';
import { LoaderCircleIcon } from 'lucide-react';

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
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
});

const SignInPage = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;

  const { session, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (session) {
      navigate('/', { replace: true });
    }
  }, [navigate, session, isLoading]);

  async function onSubmit(data) {
    try {
      // Sign in the user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        throw signInError;
      }

      navigate('/');
    } catch (error) {
      console.error('Error during sign-in:', error);
      setError('root', {
        message: error.message || 'An unknown error occurred',
      });
    }
  }

  if (isLoading) {
    return (
      <section className="grid gap-8">
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
      </section>
    );
  }

  return (
    <section className="py-20 grid grid-flow-row gap-16 place-items-center w-full">
      <div className="text-center relative">
        <BackgroundMesh />
        <h1 className="text-3xl md:text-6xl font-bold">Sign In</h1>
        <p className="text-muted-foreground mt-4 md:text-xl">
          Enter your email below to login to your account.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-w-[800px] w-full"
        >
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

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="ml-auto w-fit">
            <Button variant="linkMuted" asChild>
              <Link to={`${import.meta.env.VITE_APP_URL}/reset-password`}>
                Forgot your password?
              </Link>
            </Button>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="inline-flex items-center gap-2">
                <LoaderCircleIcon className="animate-spin" />
                <span>Signing In...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </Button>

          <FormRootError />

          <p className="text-center">
            {"Don't have an account? "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </section>
  );
};

export default SignInPage;
