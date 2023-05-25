import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";

export const appUrl = "http://127.0.0.1:8000";

function App() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
