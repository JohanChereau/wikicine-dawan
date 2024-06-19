import UserHeader from '@/components/users/UserHeader';
import UserTabs from '@/components/users/UserTabs';
import { FaInfoCircle, FaShare } from 'react-icons/fa';
import { ScrollRestoration } from 'react-router-dom';

const UserProfilePage = () => {
  return (
    <article className="grid grid-flow-row gap-8 max-w-[1000px] mx-auto">
      <UserHeader />

      <section className="flex justify-center gap-[4rem] mt-4">
        <button className="w-3/10 flex items-center bg-gray-800 text-white px-6 py-3 rounded-md text-lg hover:bg-gray-700">
          <FaInfoCircle className="mr-2" />
          Report Account
        </button>
        <button className="w-3/10 flex items-center bg-yellow-500 text-black px-6 py-3 rounded-md text-lg hover:bg-yellow-400">
          <FaShare className="mr-2" />
          Share Profile
        </button>
      </section>

      <UserTabs />

      <ScrollRestoration />
    </article>
  );
};

export default UserProfilePage;

