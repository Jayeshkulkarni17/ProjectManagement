import { useAuth } from "../components/useAuth";
import logo from '../logo.svg';
import Header from '../Header-bg.svg'
import logout from '../Logout.svg'

function Navbar({ header }) {
  const { handleLogoutAuth } = useAuth();

  return (
    <>
      <div className="w-full">
        <div className="w-full">
          <img className="w-full object-cover h-20 md:h-auto" src={Header} alt="" />
          <div className="w-full flex justify-between items-center fixed top-4 md:top-10 px-8">
            <div>
              <p className="text-white text-2xl font-semibold">{header}</p>
            </div>
            <div className="hidden md:block">
              <img src={logo} alt="Logo" className="" />
            </div>
            <div className="md:mr-32" onClick={handleLogoutAuth}>
              <img src={logout} alt="Profile" className="block md:hidden cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
