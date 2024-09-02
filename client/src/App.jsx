import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import { BrowserRouter, Navigate, Routes , Route} from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          {/* This is use for wildcard path where developer hasnot design the element but user intenally or unintenally go to the undefined route */}
          <Route path="*" element={<Navigate to="/auth"/>} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
