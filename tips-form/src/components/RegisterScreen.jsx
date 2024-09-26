import React from "react";
import Input from "./Input";

function RegisterScreen() {
  return (
    <div className="form-box">
      <h1>TipsForm</h1>
      <div className="form">
        <Input type="text" id="fuser-name" placeholder="Nome de usuário" />
        <Input type="password" id="fuser-password" placeholder="Senha" />
        <Input
          type="password"
          id="fuser-password-confirm"
          placeholder="Confirme sua senha"
        />
        <button className="myButton" type="submit">
          Cadastre-se
        </button>
      </div>
    </div>
  );
}

export default RegisterScreen;
