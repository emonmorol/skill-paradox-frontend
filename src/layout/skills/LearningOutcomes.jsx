import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";

export default function LearningOutcomes({
	outcomes,
	updateOutcome,
	removeOutcome,
	addOutcome,
}) {
	return (
		<div className="space-y-4 max-w-3xl p-6 bg-white rounded-lg shadow-lg">
			<h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
				Learning Outcomes
			</h2>

			{/* ScrollArea with overflow control */}
			<ScrollArea className="max-h-[24rem] overflow-y-auto overflow-x-hidden border rounded-lg bg-muted/30 shadow-inner">
				<div className="flex flex-col gap-4 p-4">
					{[...outcomes].reverse().map((o, i) => {
						const realIndex = outcomes.length - 1 - i;

						return (
							<div
								key={realIndex}
								className="flex flex-col gap-2 animate-in fade-in duration-300 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
							>
								<Textarea
									className="flex-1 resize-none min-h-[64px]"
									value={o.outcome}
									placeholder="Describe an outcome..."
									onChange={(e) =>
										updateOutcome(realIndex, {
											...o,
											outcome: e.target.value,
										})
									}
								/>

								<div className="flex items-start gap-3">
									<Select
										value={o.barterType}
										onValueChange={(value) =>
											updateOutcome(realIndex, {
												...o,
												barterType: value,
											})
										}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select barter type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="trade">
												Trade
											</SelectItem>
											<SelectItem value="semi_trade">
												Semi Trade
											</SelectItem>
											<SelectItem value="paid">
												Paid
											</SelectItem>
										</SelectContent>
									</Select>
									{outcomes.length > 1 && (
										<Button
											variant="destructive"
											size="sm"
											className="w-1/10"
											onClick={() =>
												removeOutcome(realIndex)
											}
										>
											<Trash2 className="h-5 w-5" />
										</Button>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</ScrollArea>

			<Button
				type="button"
				onClick={addOutcome}
				variant="modern"
				className="w-full mt-4"
			>
				+ Add Outcome
			</Button>
		</div>
	);
}
