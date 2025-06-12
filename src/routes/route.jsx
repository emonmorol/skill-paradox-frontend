import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Home from "../pages/home/Home";


const routes = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/login",
		element: < Login/>,
	},

	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/home",
		element: < Home />,
	},

]);

export default routes;
