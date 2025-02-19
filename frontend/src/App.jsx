import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import Home2 from "./components/Home2";
import Header from "./components/common/Header";
import Hero from "./components/common/Hero";
import AboutUs from "./components/common/AboutUs";
import Footer from "./components/common/Footer";
import AboutPage from "./components/AboutPage";
import AboutPage2 from "./components/AboutPage2";
import ContactPage from "./components/ContactPage";
import ContactPage2 from "./components/ContactPage2";
import Login from "./components/common/Login"; // Correct import path
import Register from "./components/common/Register"; // Import Register component
import WssPage from "./components/WssPage";
import FormPage from "./components/FormPage";
import PtFormPage from "./components/PtFormPage";
import LbFormPage from "./components/LbFormPage";
import DwFormPage from "./components/DwFormPage";
import HrmFormPage from "./components/HrmFormPage";
import GaFormPage from "./components/GaFormPage";
import DashboardPage from "./components/DashboardPage";
import { AuthProvider } from "./components/context/AuthContext"; // Correct import path

function App() {
  console.log("App component rendered");

  return (
    <BrowserRouter>
      <AuthProvider>  {/* Wrap the entire Router with AuthProvider */}
        <Routes>
          <Route path="/" element={<Home2 />} />
          <Route path="/2" element={<Home />} />
          <Route path="/header" element={<Header />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about2" element={<AboutPage2 />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact2" element={<ContactPage2 />} />
          <Route path="/login" element={<Login />} /> {/* Add Login route */}
          <Route path="/register" element={<Register />} /> {/* Add Register route */}
          <Route path="/Wss" element={<WssPage />} />
          <Route path="/Form" element={<FormPage />} />
          <Route path="/PtForm" element={<PtFormPage />} />
          <Route path="/LbForm" element={<LbFormPage />} />
          <Route path="/DwForm" element={<DwFormPage />} />
          <Route path="/HrmForm" element={<HrmFormPage />} />
          <Route path="/GaForm" element={<GaFormPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;