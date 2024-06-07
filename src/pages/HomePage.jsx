import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import BackgroundMesh from '@/components/ui/BackgroundMesh';
import { LoaderCircleIcon, SearchIcon } from 'lucide-react';

const FormSchema = z.object({
  search: z.string(),
});

const HomePage = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: '',
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data) {
    try {
      console.log(data);
    } catch (error) {
      console.error('Error during fetching movies:', error);
    }
  }

  return (
    <>
      <section className="py-20 grid grid-flow-row gap-6 place-items-center w-full">
        <div className="text-center relative">
          <BackgroundMesh />
          <h2 className="text-4xl md:text-6xl font-bold">Search a movie</h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[600px] w-full grid grid-cols-[1fr_auto] content-center items-center gap-2"
          >
            <FormField
              control={control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Search a movie</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Search a movie..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              size="icon"
              className="translate-y-1"
            >
              {isSubmitting ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                <SearchIcon />
              )}
            </Button>
          </form>
          <FormRootError />
        </Form>
      </section>
    </>
  );
};

export default HomePage;
