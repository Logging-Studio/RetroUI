"use client";

import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";

export default function InputStyleError() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="pokemon">Favorite Pokemon</Label>
      <Input
        type="pokemon"
        id="pokemon"
        placeholder="Charmander"
        defaultValue="Son Goku"
        aria-invalid
      />
      <p className="text-sm text-red-500">Please provide a valid pokemon!</p>
    </div>
  );
}
