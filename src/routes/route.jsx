import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import UpcomingEventCardProps from "../layout/events/UpcomingEventCardProps";
import ListingCard from "../layout/home/ListingCardProps";
import AddSkill from "../layout/skills/AddSkill";
import BarterRequestCardProps from "../layout/skillExchange/BarterRequestCardProps";
import PaidSessionCardProps from "../layout/skillExchange/PaidSessionCardPros";
import SessionHistoryCardProps from "../layout/skillExchange/SessionHistoryCardProps";
import AlertCardProps from "../layout/home/AlertCardProps";
import MyScheduleProps from "../layout/bookings/MyScheduleProps";
import ListingDetails from "../layout/home/ListingDetails";
import CheckoutPage from "../pages/CheckoutPage";
import ProfilePage from "../pages/ProfilePage";

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
			{
				path: "myschedule",
				element: <MyScheduleProps />,
			},
			{
				path: "test",
				element: <MyScheduleProps />,
			},
			{
				path: "listing/:id",
				element: <ListingDetails />,
			},
			{
				path: "/checkout", // ✅ ADD THIS
				element: <CheckoutPage />,
			},
			{
				path: "profile", // ✅ ADD THIS
				element: <ProfilePage />,
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
