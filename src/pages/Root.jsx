import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <>
      <header>Default Header</header>

      <main>
        <Outlet />
      </main>

      <footer>Default Footer</footer>
    </>
  );
};

export default Root;
