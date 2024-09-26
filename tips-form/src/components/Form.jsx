import React from "react";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

function renderLogin() {
  return <LoginScreen />;
}

function renderSignUp() {
  return <RegisterScreen />;
}
/*
function loginPage() {
  if (registeredUser === true) {
    return <LoginScreen />;
  } else {
    return <RegisterScreen />;
  }
}
*/
function Form(props) {
  return <div>{props.registeredUser ? renderLogin() : renderSignUp()}</div>;
}

export default Form;
