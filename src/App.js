import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.js";
import DisplayList from "./components/DisplayList.js";
import DisplayTable from "./components/DisplayTable.js";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<DisplayList />} />
          <Route path="/display" element={<DisplayTable />} />
        </Routes>
        <footer className="App-footer">
          <p>© 2025 Alvia Siraj. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
