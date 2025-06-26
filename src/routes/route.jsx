import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AlertCardProps from "../layout/home/AlertCardProps";
import UpcomingEventCardProps from "../layout/events/UpcomingEventCardProps";
import ListingCard from "../layout/home/ListingCardProps";
import AddSkill from "../layout/skills/AddSkill";
import BarterRequestCardProps from "../layout/skillExchange/BarterRequestCardProps";
import PaidSessionCardProps from "../layout/skillExchange/PaidSessionCardPros";
import SessionHistoryCardProps from "../layout/skillExchange/SessionHistoryCardProps";
import PrivateRoute from "../components/custom/PrivateRoute";
import { LoadingSkeleton } from "../components/custom/LoadingSkeleton";

const routes = createBrowserRouter([
	{
		path: "/",
		element: (
			<PrivateRoute>
				<Home />
			</PrivateRoute>
		),
		children: [
			{
				index: true,
				element: <ListingCard />,
			},
			{
				path: "test",
				element: <LoadingSkeleton />,
			},
			{
				path: "offered",
				element: <UpcomingEventCardProps />,
			},
			{
				path: "addnewskill",
				element: <AddSkill />,
			},
			{
				path: "barterrequest",
				element: <BarterRequestCardProps />,
			},
			{
				path: "paidsession",
				element: <PaidSessionCardProps />,
			},
			{
				path: "sessionhistory",
				element: <SessionHistoryCardProps />,
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
