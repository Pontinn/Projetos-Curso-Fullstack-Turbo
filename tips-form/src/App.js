import React from "react";
import Form from "./components/Form";

let registeredUser = true;

function App() {
  return <Form registeredUser={registeredUser} />;
}

export default App;
