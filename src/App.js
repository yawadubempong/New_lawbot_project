import { useState } from "react";
import ChatRoom from "./Components/ChatRoom";
import CreateAccountPage from "./Components/CreateAccountPage";
import LandingPage from "./Components/LandingPage";
import LoginPage from "./Components/LoginPage";
import { Outlet, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";


function App() {

  return (
    <div className="App">
      <Outlet/>
      {/* <CreateAccountPage/> */}
      {/* <LoginPage/> */}
      {/* <ChatRoom/> */}
    </div>
  );
}

export default App;
