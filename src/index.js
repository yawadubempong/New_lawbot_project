import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LandingPage from './Components/LandingPage';
import { 

  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider, 
  Routes
} from "react-router-dom";
import CreateAccountPage from './Components/CreateAccountPage';
import LoginPage from './Components/LoginPage';
import NewChat from './Components/NewChat';
import ChatRoom from './Components/ChatRoom';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App/>,
//     children: [
//       {
//         index: true,
//         element: <LandingPage/>
//       },
//       {
//         path: "signup",
//         element: <CreateAccountPage/>
//       },
//       {
//         path: "login",
//         element: <LoginPage/>
//       }
//     ]
//   }
// ])
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="signup" element={<CreateAccountPage/>}/>
            <Route path="login" element={<LoginPage/>} />
            <Route path="chatroom" element={<ChatRoom/>} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
