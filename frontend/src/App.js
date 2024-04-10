import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Createquizdetails from "./pages/Createquizdetails";
import ContributionForm from "./pages/tempContribute";
import Login from "./pages/Login";
import Contribute from "./pages/check";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Nav /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route exact path="/tempContribute" element={<ContributionForm />} />
        </Routes>
        <Routes>
          <Route exact path="/contribute" element={<Contribute />} />
        </Routes>
        <Routes>
          <Route exact path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route
            exact
            path="/createquizdetails"
            element={<Createquizdetails />}
          />
        </Routes>
        <Routes>
          <Route exact path="/Quiz/:id" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
