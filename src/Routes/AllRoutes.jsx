import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Login from "./Login";
import SingleRestaurantPage from "./SingleRestaurantPage";
import PrivateRoute from "../Components/PrivateRoute";

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/restaurants/:id" element={
          <PrivateRoute>
            <SingleRestaurantPage />
          </PrivateRoute>
        } />


      </Routes>

    </div>
  );
}

export default AllRoutes;
