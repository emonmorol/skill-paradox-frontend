import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AlertCardProps from "../layout/home/AlertCardProps";
import UpcomingEventCardProps from "../layout/events/UpcomingEventCardProps";
import ListingCard from "../layout/home/ListingCardProps";
import AddSkill from "../layout/skills/AddSkill";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		children: [
			{
				index: true,
				element: <ListingCard />,
			},
			{
				path: "test",
				element: <AlertCardProps />,
			},
			{
				path: "offered",
				element: <UpcomingEventCardProps />,
			},
			{
				path: "addnewskill",
				element: <AddSkill />,
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
