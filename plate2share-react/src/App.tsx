import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import FoodListing from "./components/FoodListing";
import MyDonations from "./components/MyDonations";
import Communication from "./components/Communication";
import Notifications from "./components/Notifications";
import Reports from "./components/Reports";
import UserManagement from "./components/UserManagement";
import DashboardLayout from "./components/DashboardLayout";
import AddFood from "./components/AddFood";
import DonateFood from "./components/DonateFood";
import Settings from "./components/Settings";

const App = () => {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-food" element={<AddFood />} />
          <Route path="/donate-food" element={<DonateFood />} />
          <Route path="/food-listing" element={<FoodListing />} />
          <Route path="/my-donations" element={<MyDonations />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
};

export default App;
