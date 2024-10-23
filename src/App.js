import AllMeetupsPage from "./pages/AllMeetupsPage";
import FavoritesPage from "./pages/Favorites";
import NewMeetupsPage from "./pages/NewMeetup";

import MainNavigation from "./components/layout/MainNavigation";
import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div data-test="app">
      <Router>
        <MainNavigation />
        <Layout>
          <Routes>
            <Route path="/all-meetups" element={<AllMeetupsPage />} />
            <Route path="/new-meetups" element={<NewMeetupsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<AllMeetupsPage />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
