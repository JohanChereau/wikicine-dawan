const Header = () => {
  return (
    <header className="container flex justify-between items-center p-4">
      <div className="text-xl font-bold text-foreground">Wikiciné</div>

      <div className="flex items-center">
        <img
          src="https://via.placeholder.com/40"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
