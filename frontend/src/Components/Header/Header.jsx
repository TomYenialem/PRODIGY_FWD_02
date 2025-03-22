const Header = ({ title }) => {
  return (
    <header className="  bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="flex items-center justify-between max-w-7xl  py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="  text-2xl font-semibold text-gray-100">
          {title}
        </h1>
        <h3 className="sm-text-center text-green-500 font-bold">Hello Admin</h3>
      </div>
    </header>
  );
};
export default Header;
