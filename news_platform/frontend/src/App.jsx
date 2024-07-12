import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import NewsBoard from "./Components/NewsBoard";
import LoginSignup from "./Components/Loginsignup/LoginSignup";

const App = () => {
  const [category, setCategory] = useState("general");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar setCategory={setCategory} />
            <NewsBoard category={category} />
          </>
        } />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

