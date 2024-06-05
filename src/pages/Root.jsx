import Badge from '@/components/Badge';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div className="min-h-svh grid grid-rows-[auto_1fr_auto]">
      <header className="container">Default Header</header>

      <main className="container">
        <Outlet />
        <Badge />
      </main>

      <footer className="container">Default Footer</footer>
    </div>
  );
};

export default Root;
