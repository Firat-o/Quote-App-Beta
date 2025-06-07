import React from "react";

const Nav = ({ user, onLogin, onRegister, onLogout }) => {
  return (
    <nav className="halo-nav">
      <div className="nav-logo">QUOTES GENERATOR</div>
      
      <ul className="nav-menu">
        {!user ? (
          <>
            <li>
              <button className="register__button" onClick={onRegister}>Register</button>
            </li>
            <li>
              <button className="login__button" onClick={onLogin}>Login</button>
            </li>
          </>
        ) : (
          <li>
            <button className="logout__button" onClick={onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
