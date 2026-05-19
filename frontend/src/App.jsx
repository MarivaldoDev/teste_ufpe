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
      <div className="app-shell min-h-screen">
        <div className="app-glow app-glow-one" />
        <div className="app-glow app-glow-two" />
        <Navbar />

        <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12 pt-8 md:px-8 md:pt-10">
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

        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;