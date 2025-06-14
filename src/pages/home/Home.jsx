import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AlertCard from "../../cards/AlertCard";
import { Sun, Moon } from "lucide-react"; // Optional Lucide icons

export const iframeHeight = "800px";
export const description = "A sidebar with a header and a search form.";

function Home() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const html = document.documentElement;
		if (isDark) {
			html.classList.add("dark");
		} else {
			html.classList.remove("dark");
		}
	}, [isDark]);

	const toggleDarkMode = () => setIsDark((prev) => !prev);

	return (
		<div className="[--header-height:calc(--spacing(14))]">
			<SidebarProvider className="flex flex-col">
				<SiteHeader />
				<div className="flex flex-1">
					<AppSidebar />
					<SidebarInset>
						<div className="flex flex-1 flex-col gap-4 p-4">
							{/* 🌗 Toggle Switch with Icon */}
							<div className="flex justify-end">
								<label className="inline-flex items-center cursor-pointer">
									<span className="mr-2 text-sm text-gray-700 dark:text-gray-300">
										{isDark ? "Dark" : "Light"} Mode
									</span>
									<div
										className={`relative w-12 h-6 rounded-full transition ${
											isDark
												? "bg-gray-600"
												: "bg-gray-300"
										}`}
										onClick={toggleDarkMode}
									>
										<div
											className={`absolute top-0 left-0 h-6 w-6 flex items-center justify-center rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
												isDark
													? "translate-x-6"
													: "translate-x-0"
											}`}
										>
											{isDark ? (
												<Moon className="w-4 h-4 text-yellow-400" />
											) : (
												<Sun className="w-4 h-4 text-orange-500" />
											)}
										</div>
									</div>
								</label>
							</div>

							{/* 🔔 Alert Message */}
							<div className="flex justify-center">
								<div className="w-full max-w-lg">
									<AlertCard
										type="success"
										title="Welcome!"
										message="You have logged in successfully."
										timeout={4000}
									/>
								</div>
							</div>

							{/* Demo content */}
							<div className="grid auto-rows-min gap-4 md:grid-cols-3">
								<div className="bg-muted/50 aspect-video rounded-xl dark:bg-muted/30" />
								<div className="bg-muted/50 aspect-video rounded-xl dark:bg-muted/30" />
								<div className="bg-muted/50 aspect-video rounded-xl dark:bg-muted/30" />
							</div>
							<div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min dark:bg-muted/30" />
						</div>
					</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	);
}

export default Home;
