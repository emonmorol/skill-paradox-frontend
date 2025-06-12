import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";


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
]);

export default routes;
