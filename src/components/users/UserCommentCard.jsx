import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import MovieRating from '@/components/ui/MovieRating';

const UserCommentCard = () => {
  const review = {
    user_profiles: {
      avatar: 'https://images.unsplash.com/photo-1718062457089-b8ba9ee33da7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      username: 'JohnDoe',
      role: 'User',
    },
    rating: 4.7,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.',
    created_at: '20/06/2023', 
  };

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap gap-4 justify-between items-center">
        <img
          src="https://img-4.linternaute.com/gIjUpf2RFpABuydey1sq_mbg4ak=/1240x/3acee422cb6a4f6b972abc4325abc15e/ccmcms-linternaute/222775.jpeg"
          alt="furiosa"
          className="aspect-square object-cover rounded-full w-8 md:w-12 cursor-pointer"
        />
        <div className="inline-flex items-center gap-2">
          <p className="font-semibold text-base md:text-xl hover:underline hover:underline-offset-4 hover:decoration-accent-foreground">{`@${review.user_profiles.username}`}</p>
          {}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
        <MovieRating rating={5} ratingScale={5} showVoteCount={false} />
          
          <span className="ml-2 text-lg font-semibold"></span>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
      </CardContent>
      <CardFooter className="w-fit flex gap-2 ml-auto text-muted-foreground">
      </CardFooter>
    </Card>
  );
};

export default UserCommentCard;





