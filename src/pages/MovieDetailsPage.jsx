import MovieDetailsContent from '@/components/ui/MovieDetailsContent';
import MovieHeader from '@/components/ui/MovieHeader';
import MovieTabs from '@/components/ui/MovieTabs';

const MovieDetailsPage = () => {
  return (
    <div className="">
      <section className="grid pt-36 bg-[url(https://www.actusf.com/files/new_images/actualit%C3%A9s/2024%20Semestre%201/Mad%20Max%20Furiosa.jpg)] bg-no-repeat bg-center bg-cover">
        <MovieHeader
          movieTitle={'Furiosa'}
          dateProd={'2024 - Warner Bros'}
          rate={'4/5'}
        />
      </section>

      <section>
        <div>
          <MovieDetailsContent
            description={
              'As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland they come across the Citadel presided over... Show More'
            }
          />
        </div>
      </section>

      <section>
        <MovieTabs />
      </section>
    </div>
  );
};

export default MovieDetailsPage;
