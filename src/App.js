import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./ui/pages/Home/Home";
import { Fyt } from "./ui/pages/FYT/Fyt";
import { Layout } from "./ui/component/Layout/Layout";
import { Categories } from "./ui/pages/Categories/Categories";
import { Place } from "./ui/pages/Place/Place";
import React from "react";
import { Login } from "./ui/pages/Login/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="fyt" element={<Fyt />} />
          <Route path="categories" element={<Categories />} />
          <Route path="place" element={<Place />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
