import React from "react";
import Input from "./Input";

function LoginScreen() {
  return (
    <div className="form-box">
      <h1>TipsForm</h1>
      <div className="form">
        <Input type="text" id="fuser-name" placeholder="Nome de usuário" />
        <Input type="password" id="fuser-password" placeholder="Senha" />
        <button className="myButton" type="submit">
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;
