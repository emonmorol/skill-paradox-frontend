import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Home from "../pages/home/Home";
import ListingCardProps from "../layout/home/ListingCardProps";
import AlertCardProps from "../layout/home/AlertCardProps";
import UpcomingEventCardProps from "../layout/events/UpcomingEventCardProps";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		children: [
			{
				index: true,
				element: <div>Welcome to the Home Page</div>,
			},
			{
				path: "test",
				element: <div>This is a test page</div>,
			},
			{
				path: "evaluations",
				element: <div>This is a evaluations page</div>,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},

	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/home",
		element: <Home />,
	},
	{
		path: "/test",
		element: <AlertCardProps />,
	},
]);

export default routes;
