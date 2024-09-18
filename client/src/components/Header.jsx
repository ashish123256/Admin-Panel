import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from "../assets/logo.png";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <nav className="px-10 py-2 flex items-center justify-between w-full fixed bg-white top-0 left-0 z-10 shadow-md ">
        <div className="flex space-x-10 items-center">
          <img src={Logo} alt="Logo" className="w-12 h-12" />
          <Link to="/" className="font-semibold">
            Home
          </Link>
          {currentUser && (
            <Link to="/employee-list" className="font-semibold">
              Employee List
            </Link>
          )}
        </div>
        <div className="flex space-x-10">
          {currentUser ? (
            <Link to="/profile" className="font-semibold">
              {currentUser?.rest?.username || "Profile"}
            </Link>
          ) : (
            <Link to="/sign-in" className="font-semibold">
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
