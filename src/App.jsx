import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import EasterEgg from "./EasterEgg";
import LastPage from "./LastPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/easteregg" element={<EasterEgg />} />
        <Route path="/lastpage" element={<LastPage />} />
      </Routes>
    </Router>
  );
}

export default App;
