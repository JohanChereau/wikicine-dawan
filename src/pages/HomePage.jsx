import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDebounce } from '@/hooks/use-debounce';

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
import MoviesSuggestions from '@/components/MoviesSuggestions';
import MovieSearchResults from '@/components/MoviesSearchResults';

const FormSchema = z.object({
  search: z.string(),
});

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search') || '';

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: query,
    },
  });

  const { control, watch } = form;
  const searchValue = watch('search');
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedSearchValue) {
      setSearchParams({ search: debouncedSearchValue });
    } else {
      setSearchParams({});
    }
  }, [debouncedSearchValue, setSearchParams]);

  return (
    <>
      <section className="py-20 grid grid-flow-row gap-6 place-items-center w-full">
        <div className="text-center relative">
          <BackgroundMesh />
          <h2 className="text-4xl md:text-6xl font-bold">Search a movie</h2>
        </div>
        <Form {...form}>
          <form className="max-w-[600px] w-full grid grid-cols-[1fr_auto] content-center items-center gap-2">
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
          </form>
          <FormRootError />
        </Form>
      </section>

      {query ? <MovieSearchResults query={query} /> : <MoviesSuggestions />}
    </>
  );
};

export default HomePage;
