import React from "react";

export function BasicCard() {
  return (
    <div className="inline-block border-2 p-4 shadow-md cursor-pointer transition-all hover:shadow-xs">
      <h4 className="font-head text-2xl font-medium mb-1">
        This is card Title
      </h4>
      <p>This is card description.</p>
    </div>
  );
}
