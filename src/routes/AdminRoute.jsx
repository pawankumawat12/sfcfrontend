import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/Admin/AdminLayout";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import Games from "../pages/admin/games/Index";
import FeaturedGames from "../pages/admin/games/FeaturedGames";
import Category from "../pages/admin/products/Category/Index";
import GameCreate from "../pages/admin/games/Add";
import Orders from "../pages/admin/orders/Index";
import Products from "../pages/admin/products/Index";
import ProductCreate from "../pages/admin/products/Add";
import ShowProduct from "../pages/admin/products/Show";
import CreateProductCategory from "../pages/admin/products/Category/Add";
import EditProductCategory from "../pages/admin/products/Category/Edit";
import UserList from "../pages/admin/user/UserList";
import ProtectedRoute from "../components/validRoute/ProtectedRoute";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route
          index
          element={
            <ProtectedRoute allowedRoles={["admin", "sub_admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="games"
          element={
            <ProtectedRoute allowedRoles={["admin", "sub_admin"]}>
              <Games />
            </ProtectedRoute>
          }
        />

        <Route
          path="featured_games"
          element={
            <ProtectedRoute allowedRoles={["admin", "sub_admin"]}>
              <FeaturedGames />
            </ProtectedRoute>
          }
        />

        <Route
          path="category"
          element={
            <ProtectedRoute allowedRoles={["admin", "sub_admin"]}>
              <Category />
            </ProtectedRoute>
          }
        />

        <Route
          path="games/create"
          element={
            <ProtectedRoute allowedRoles={["admin", "sub_admin"]}>
              <GameCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="orders"
          element={
            <ProtectedRoute allowedRoles={["admin", "sub_admin"]}>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="products"
          element={
            <ProtectedRoute allowedRoles={["admin", "sub_admin"]}>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="products/create"
          element={
            <ProtectedRoute allowedRoles={["admin", "sub_admin"]}>
              <ProductCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="products/show/:slug"
          element={
            <ProtectedRoute allowedRoles={["admin", "sub_admin"]}>
              <ShowProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="category/create"
          element={
            <ProtectedRoute allowedRoles={["admin", "sub_admin"]}>
              <CreateProductCategory />
            </ProtectedRoute>
          }
        />

        <Route
          path="category/edit/:slug"
          element={
            <ProtectedRoute allowedRoles={["admin", "sub_admin"]}>
              <EditProductCategory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["admin", "sub_admin"]}>
              <UserList />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
