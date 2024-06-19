import { Button } from '@/components/ui/Button';

const UserHeader = ({ userData }) => {
  
  return (
    <header
      className="grid grid-rows-[auto_3fr] gap-2 min-h-64 text-center bg-no-repeat bg-top bg-cover rounded-md"
      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1718040506078-5a7b90746511?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1MHx8fGVufDB8fHx8fA%3D%3D)`}}
    >
      <div className="flex justify-between items-center gap-6 p-6">
        <Button className="shadow-lg text-white" variant="iconDark" asChild>
        </Button>
        <Button className="shadow-lg">
          Reviews
        </Button>
      </div>

      <div className="grid gap-3 self-end translate-y-2 pt-20 pb-6 dark:pb-0 bg-gradient-to-t from-black dark:from-background to-transparent rounded-b-md">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white"></h2>
        <p className="text-zinc-300 text-base md:text-lg">
          Joined
        </p>

        <div className="flex justify-center items-center gap-4 flex-wrap">
    
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
