import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";

const CURRENCIES = ["USD", "EUR", "BDT", "INR", "GBP"]; // example

export default function PricingDetails({ pricing, setPricing }) {
	return (
		<div className="max-w-3xl min-h-[11rem] p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between space-y-6">
			<h2 className="text-2xl font-semibold mb-6 text-gray-800">
				Pricing Details
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Pricing Type */}
				<div className="space-y-1.5">
					<Label htmlFor="type">Pricing Type</Label>
					<Select
						value={pricing.type}
						onValueChange={(value) =>
							setPricing({ ...pricing, type: value })
						}
					>
						<SelectTrigger id="type">
							<SelectValue placeholder="Select pricing type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="trade">Trade</SelectItem>
							<SelectItem value="semi_trade">
								Semi Trade
							</SelectItem>
							<SelectItem value="paid">Paid</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Duration */}
				<div className="space-y-1.5">
					<Label htmlFor="duration">Session Duration</Label>
					<Input
						id="duration"
						placeholder="e.g. 1 hour"
						value={pricing.duration}
						onChange={(e) =>
							setPricing({ ...pricing, duration: e.target.value })
						}
					/>
				</div>

				{/* Price – shown conditionally */}
				{pricing.type !== "trade" && (
					<>
						<div className="space-y-1.5">
							<Label htmlFor="price">Price</Label>
							<Input
								id="price"
								type="number"
								min={0}
								placeholder="Enter price"
								value={pricing.price}
								onChange={(e) =>
									setPricing({
										...pricing,
										price: Number(e.target.value) || 0,
									})
								}
							/>
						</div>

						<div className="space-y-1.5">
							<Label htmlFor="currency">Currency</Label>
							<Select
								value={pricing.currency}
								onValueChange={(value) =>
									setPricing({ ...pricing, currency: value })
								}
							>
								<SelectTrigger id="currency">
									<SelectValue placeholder="Select currency" />
								</SelectTrigger>
								<SelectContent>
									{CURRENCIES.map((cur) => (
										<SelectItem key={cur} value={cur}>
											{cur}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
