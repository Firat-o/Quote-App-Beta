import React from "react";

const Nav = ({ user, onLogin, onRegister, onLogout }) => {
  return (
    <div className="nav">
      <h1>Quotes Generator/h1>
      <div className="buttons">
        {!user ? (
          <>
            <button className="register__button" onClick={onRegister}>Register</button>
            <button className="login__button" onClick={onLogin}>Login</button>
          </>
        ) : (
          <button className="logout__button" onClick={onLogout}>Logout</button>
        )}
      </div>
    </div>
  );
};

export default Nav;
