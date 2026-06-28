const Navbar = () => {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="flex items-center gap-4">
        <span className="font-medium">Rajneesh</span>

        <img
          src="https://i.pravatar.cc/40"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Navbar;