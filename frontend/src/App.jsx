import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import CreateLesson from "./pages/CreateLesson";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="max-w-6xl mx-auto p-6">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/create"
              element={<CreateLesson />}
            />

            <Route
              path="/edit/:id"
              element={<CreateLesson />}
            />
          </Routes>
          
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;