import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./ui/pages/Home/Home";
import { Fyt } from "./ui/pages/FYT/Fyt";
import { Layout } from "./ui/component/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout /> }>
          <Route index element={ <Home /> } />
          <Route path="fyt" element={ <Fyt /> }/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
