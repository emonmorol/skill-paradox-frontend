"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function SlotButton({ slotNumber, onClick }) {
  return (
    <Button
      variant="outline"
      className="h-16"
      onClick={() => onClick(slotNumber)}
    >
      Slot {slotNumber}
    </Button>
  );
}
