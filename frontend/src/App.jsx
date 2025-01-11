import { Route, Routes, Navigate } from "react-router-dom"
import 'react-toastify/ReactToastify.css';
import { SignInPage } from "./pages/SignInPage"
import { LoginPage } from "./pages/LoginPage";
import { FrontPage } from "./pages/FrontPage";
import { LogoutPage } from "./pages/LogoutPage";
import { Navbar } from "./components/Navbar";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<FrontPage/>} />
        <Route path="/signup" element={<SignInPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </>
  )
}

export default App
