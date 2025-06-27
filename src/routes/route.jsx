import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import UpcomingEventCardProps from "../layout/myListings/MyListingsCardProps";
import ListingCard from "../layout/home/ListingCardProps";
import AddSkill from "../layout/skills/AddSkill";
import BarterRequestCardProps from "../layout/skillExchange/BarterRequestCardProps";
import PaidSessionCardProps from "../layout/skillExchange/PaidSessionCardPros";
import SessionHistoryCardProps from "../layout/skillExchange/SessionHistoryCardProps";
import AlertCardProps from "../layout/home/AlertCardProps";
import MyScheduleProps from "../layout/bookings/MyScheduleProps";
import ListingDetails from "../layout/home/ListingDetails";
import CheckoutPage from "../pages/CheckoutPage";
import PrivateRoute from "../components/custom/PrivateRoute";
import { LoadingSkeleton } from "../components/custom/LoadingSkeleton";
import MyListingsCardProps from "../layout/myListings/MyListingsCardProps";

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
				path: "my-listings",
				element: <MyListingsCardProps />,
			},
			{
				path: "addnewskill",
				element: <AddSkill />,
			},
			{
				path: "requests",
				element: <BarterRequestCardProps />,
			},
			{
				path: "ongoing",
				element: <PaidSessionCardProps />,
			},
			{
				path: "history",
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
