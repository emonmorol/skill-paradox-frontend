import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

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
]);

export default routes;
