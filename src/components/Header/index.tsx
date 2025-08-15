import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/context";

import { Link } from "react-router-dom";
import { FiUser, FiLogIn } from "react-icons/fi";
import logo from "../../assets/logo.png";

function Header() {
  const { signed, loadingAuth, user } = useContext(AuthContext);

  return (
    <header className="w-full flex items-center justify-center px-4 py-2 bg-white drop-shadow mb-4">
      <div className="w-full max-w-7xl flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Logo do site" className="w-18 object-contain" />
        </Link>

        {!loadingAuth && signed && (
          <Link to={"/dashboard"} className="flex items-center gap-2">
            {user?.name && (
              <span className="font-medium text-zinc-900">{user.name}</span>
            )}
            <div className="border-2 rounded-full p-1">
              <FiUser size={24} />
            </div>
          </Link>
        )}

        {!loadingAuth && !signed && (
          <Link to={"/login"} className="flex items-center gap-2">
            <span className="font-medium text-zinc-900">Entrar</span>
            <FiLogIn size={24} />
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
