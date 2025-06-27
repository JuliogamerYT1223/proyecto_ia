import { BrowserRouter, Routes, Route } from "react-router-dom";
import Booking from "./modules/booking/pages/Booking";
import ComplaintsBook from "./modules/complaint/pages/ComplaintsBook";
import Main from "./modules/main/pages/Main";
import DashboardLayout from "./modules/dashboard/layout/DashboardLayout";
import DashboardHome from "./modules/dashboard/pages/DashboardHome";
import Reservations from "./modules/dashboard/pages/Reservations";
import Customers from "./modules/dashboard/pages/Customers";
import Menu from "./modules/dashboard/pages/Menu";
import Tables from "./modules/dashboard/pages/Tables";
import Reports from "./modules/dashboard/pages/Reports";
import Settings from "./modules/dashboard/pages/Settings";
import Users from "./modules/dashboard/pages/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/complaints-book" element={<ComplaintsBook />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="Reservations" element={<Reservations />} />
          <Route path="Customers" element={<Customers />} />
          <Route path="Menu" element={<Menu />} />
          <Route path="Tables" element={<Tables />} />
          <Route path="Reports" element={<Reports />} />
          <Route path="Settings" element={<Settings />} />
          <Route path="Users" element={<Users />} />
        </Route>

        <Route path="*" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
