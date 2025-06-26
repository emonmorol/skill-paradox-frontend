// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LoadingSkeleton } from "./LoadingSkeleton";

const PrivateRoute = ({ children }) => {
	const { user, loading } = useAuth();

	if (loading) return <LoadingSkeleton />;

	return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
