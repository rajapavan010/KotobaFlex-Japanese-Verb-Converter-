import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import N5Page from "./pages/N5Page";
import N4Page from "./pages/N4Page";
import N3Page from "./pages/N3Page";
import OutputPage from "./pages/OutputPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/n5" element={<N5Page />} />
        <Route path="/n4" element={<N4Page />} />
        <Route path="/n3" element={<N3Page />} />
        <Route path="/output" element={<OutputPage />} />
      </Routes>
    </Router>
  );
}

export default App;
