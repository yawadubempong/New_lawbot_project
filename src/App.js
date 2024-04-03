import { useState } from "react";
import ChatRoom from "./Components/ChatRoom";
import LandingPage from "./Components/LandingPage";
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
