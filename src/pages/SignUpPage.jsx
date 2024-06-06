import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { supabase } from '@/services/supabase/supabaseClient';

import { Button } from '@/components/ui/Button';
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
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundMesh from '@/components/ui/BackgroundMesh';
import { LoaderCircleIcon } from 'lucide-react';

const FormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters.' })
      .max(15, { message: 'Username must contain a maximum of 15 characters.' }),
    firstname: z
      .string()
      .min(2, { message: 'Firstname must be at least 2 characters.' }),
    lastname: z
      .string()
      .min(2, { message: 'Lastname must be at least 2 characters.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' })
      .refine(
        (password) => {
          return /[A-Z]/.test(password);
        },
        { message: 'Password must contain at least one uppercase letter.' }
      )
      .refine(
        (password) => {
          return /[a-z]/.test(password);
        },
        { message: 'Password must contain at least one lowercase letter.' }
      )
      .refine(
        (password) => {
          return /[!@#$%^&*(),.?":{}|<>]/.test(password);
        },
        { message: 'Password must contain at least one special character.' }
      ),
    confirmPassword: z.string(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept Terms and Conditions' }),
    }),
  })
  .refine(
    (data) => {
      return data.confirmPassword === data.password;
    },
    { message: 'Passwords do not match.', path: ['confirmPassword'] }
  );

const SignUpPage = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      // Check if the username is already taken
      const { data: existingUser, error: userCheckError } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('username', data.username)
        .maybeSingle();

      if (existingUser) {
        setError('username', {
          type: 'manual',
          message: 'Username is already taken.',
        });
        return;
      }

      if (userCheckError && userCheckError.code !== 'PGRST116') {
        throw userCheckError;
      }

      // Sign up the user
      const { data: signupData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (signUpError) {
        throw signUpError;
      }

      // After signing up, insert the user profile
      const { error: profileInsertError } = await supabase
        .from('user_profiles')
        .insert([
          {
            user_id: signupData.user.id,
            username: data?.username,
          },
        ]);

      if (profileInsertError) {
        throw profileInsertError;
      }

      navigate('/');
    } catch (error) {
      console.error('Error during signup:', error);
      setError('root', {
        message: error.message || 'An unknown error occurred',
      });
    }
  }

  return (
    <section className="py-20 grid grid-flow-row gap-16 place-items-center w-full">
      <div className="text-center relative">
        <BackgroundMesh />
        <h1 className="text-3xl md:text-6xl font-bold">Sign up</h1>
        <p className="text-muted-foreground mt-4 md:text-xl">
          Enter your information to create an account.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-w-[800px] w-full"
        >
          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="@username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your unique public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@domain.com" {...field} />
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

          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="ml-2">Accept terms and conditions.</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="inline-flex items-center gap-2">
                <LoaderCircleIcon className="animate-spin" />
                <span>Creating your account...</span>
              </div>
            ) : (
              'Create an account'
            )}
          </Button>

          <FormRootError />

          <p className="text-center">
            Already have an account?{' '}
            <Link to="/signin" className="underline">
              Sign in
            </Link>
          </p>
        </form>
      </Form>
    </section>
  );
};

export default SignUpPage;
