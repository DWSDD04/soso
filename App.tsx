import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/MenuPage";
import LogIn from "./pages/Login";
import AvailableSlots from "./pages/Calendar";
import Contact from "./pages/Contact";
import NailsArtServices from "./pages/NailsArt";
import Facial from "./pages/Facial";
import MakeupServices from "./pages/MakeUp";
import AdminDashboard from "./pages/AdminMain";
import AddProduct from "./pages/Product/AddProduct";
import DeleteProduct from "./pages/Product/DeleteProduct";
import UpdateProduct from "./pages/Product/UpdateProduct";
import ViewProducts from "./pages/Product/ViewProduct";
import ViewService from "./pages/Service/ViewService";
import ViewAppointment from "./pages/Appointment/ViewAppointment";
import AddAppointment from "./pages/Appointment/AddAppointment";
import DeleteAppointment from "./pages/Appointment/DeleteAppointment";
import UpdateAppointment from "./pages/Appointment/UpdateAppointment";
import AddService from "./pages/Service/AddService";
import DeleteService from "./pages/Service/DeleteService";
import UpdateService from "./pages/Service/UpdateService";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/calendar" element={<AvailableSlots />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/nailsart" element={<NailsArtServices />} />
        <Route path="/facial" element={<Facial />} />
        <Route path="/makeup" element={<MakeupServices />} />
        <Route path="/adminmain" element={<AdminDashboard />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/deleteproduct" element={<DeleteProduct />} />
        <Route path="/updateproduct" element={<UpdateProduct />} />
        <Route path="/viewproduct" element={<ViewProducts />} />
        <Route path="/viewservice" element={<ViewService />} />
        <Route path="/addservice" element={<AddService />} />
        <Route path="/deleteservice" element={<DeleteService />} />
        <Route path="/updateservice" element={<UpdateService />} />
        <Route path="/viewappointment" element={<ViewAppointment />} />
        <Route path="/addappointment" element={<AddAppointment />} />
        <Route path="/deleteappointment" element={<DeleteAppointment />} />
        <Route path="/updateappointment" element={<UpdateAppointment />} />
      </Routes>
    </Router>
  );
}

export default App;
