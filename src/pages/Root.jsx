import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Toaster } from '@/services/providers/toaster-provider';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div className="min-h-svh grid grid-rows-[auto_1fr_auto]">
      <Header />

      <main className="container">
        <Outlet />
      </main>
      <Toaster />

      <Footer />
    </div>
  );
};

export default Root;
