import React from "react";

function Input(props) {
  return (
    <input
      type={props.type}
      id={props.id}
      placeholder={props.placeholder}
    ></input>
  );
}

export default Input;

/*
"fuser-name"
"fuser-password"
"fuser-password-confirm"
*/
