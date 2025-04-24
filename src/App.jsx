import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import JobListings from "./pages/JobListings";
import JobPost from "./pages/JobPost";
import SignupPage from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import CompanyPage from "./pages/CompanyPage";
import UserPage from "./pages/UserPage";
import SearchedJobsPage from "./components/SearchedJobs";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensures it takes at least full viewport height
      }}
    >
      {" "}
      <NavBar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/job-listings" element={<JobListings />} />
          <Route path="/job-post" element={<JobPost />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/companies" element={<CompanyPage />} />
          <Route path="/userpage" element={<UserPage />} />
          <Route path="/job-listings/search" element={<SearchedJobsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
