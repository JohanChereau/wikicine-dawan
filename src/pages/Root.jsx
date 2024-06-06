import Header from '@/components/ui/Header';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div className="min-h-svh grid grid-rows-[auto_1fr_auto]">
      <Header />

      <main className="container">
        <Outlet />
      </main>

      <footer className="container">Default Footer</footer>
    </div>
  );
};

export default Root;
