import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";

const ListingPage = lazy(() => import("./components/ListingPage"));
const UniversityDetailsPage = lazy(() =>
  import("./components/UniversityDetailsPage")
);

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Router>
          <Routes>
            <Route exact path="/" element={<ListingPage />} />
            <Route path="/details/:name" element={<UniversityDetailsPage />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
