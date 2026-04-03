import React from "react";
import { Button } from "./Button";

export function ProductCard() {
  return (
    <div className="max-w-80 p-4 border-2 border-black">
      <img
        alt="product image"
        src="https://images.unsplash.com/photo-1596998791568-386ef5297c2e?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="mt-4 space-y-4">
        <h3 className="font-head text-3xl font-medium mb-1">Classic Gameboy</h3>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">$29.99</span>
          <Button>Add To Cart</Button>
        </div>
      </div>
    </div>
  );
}
