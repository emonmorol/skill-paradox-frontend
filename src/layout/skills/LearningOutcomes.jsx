import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

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
			<ScrollArea className="max-h-[20.5rem] overflow-y-auto overflow-x-hidden border rounded-lg bg-muted/30 shadow-inner">
				<div className="flex flex-col gap-3 p-4">
					{[...outcomes].reverse().map((o, i) => (
						<div
							key={i}
							className="flex items-start gap-3 animate-in fade-in duration-300"
						>
							<Textarea
								className="flex-1 resize-none min-h-[64px]"
								value={o.outcome}
								placeholder="Describe an outcome..."
								onChange={(e) =>
									updateOutcome(
										outcomes.length - 1 - i,
										e.target.value
									)
								}
							/>
							{outcomes.length > 1 && (
								<Button
									variant="ghost"
									size="icon"
									className="mt-1 text-destructive hover:bg-destructive/10"
									onClick={() =>
										removeOutcome(outcomes.length - 1 - i)
									}
								>
									<Trash2 className="h-5 w-5" />
								</Button>
							)}
						</div>
					))}
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
