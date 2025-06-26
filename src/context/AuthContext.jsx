import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const login = async (email, password) => {
		const res = await axiosInstance.post("/auth/login", {
			email,
			password,
		});
		const { accessToken, user } = res.data.data;
		localStorage.setItem("token", accessToken);
		setUser(user);
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	const loadUser = async () => {
		const token = localStorage.getItem("token");
		if (!token) {
			setLoading(false);
			return;
		}

		try {
			const res = await axiosInstance.get("/users/me");
			setUser(res.data.data[0]);
		} catch (err) {
			console.log(err);
			logout();
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadUser();
	}, []);

	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
