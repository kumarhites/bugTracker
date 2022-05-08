import { Link } from "react-router-dom";
import { AiOutlineBug } from "react-icons/ai";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Avatar from "../components/Avatar";

function Navbar() {
const { logout, isPending } = useLogout();
const { user } = useAuthContext();
console.log(user.photoURL);

return (
<div className="navbar z-10 fixed top-0 bg-violet-500">
  <div className="lg:hidden navbar-start ">
    <div className="dropdown ml-2">
      <label tabIndex="0" className="btn btn-ghost btn-circle lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </label>
      <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <Link to="/" >
          <MdOutlineSpaceDashboard /> &nbsp; Dashboard
          </Link>
        </li>
        <li>
          <Link to="/create">
          <MdOutlineLibraryAdd /> &nbsp; New Project
          </Link>
        </li>
      </ul>
    </div>
  </div>
  <div className="navbar-start">
    <Link to="/" className="btn btn-ghost normal-case text-xl font-bold btn-md no-animation text-white">
    <AiOutlineBug /> &nbsp;bugTracker
    </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul tabIndex="0" className="menu menu-horizontal p-0">
      <li  className="text-white">
        <Link to="/">
        Dashboard
        </Link>
      </li>
      <li  className="text-white">
        <Link to="/create">
        New Project
        </Link>
      </li>
    </ul>
  </div>
  <div className="navbar-end">
    {!user && (
    <button className="btn btn-ghost">
      <Link to="/login">Login</Link>
    </button>
    )}
    {!user && (
    <button className="btn btn-ghost ">
      <Link to="/signup">Signup</Link>
    </button>
    )}
    {/* {user && <button className="btn btn-sm btn-outline bg-red-200 hover:bg-red-500 mr-20 md:mr-5 sm:mr-0"
      onClick={logout}>
      Logout
    </button>} */}
  </div>

  {user && (
  <div className="dropdown dropdown-end mr-3">
    <label tabIndex="0" className="btn btn-ghost btn-circle avatar online">
      <div className="w-9 rounded-full">
        <Avatar src={user.photoURL} />
      </div>
    </label>
    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <li>
        {" "}
        <button onClick={logout}>Logout</button>
      </li>
    </ul>
  </div>
  )}
</div>
);
}

export default Navbar;