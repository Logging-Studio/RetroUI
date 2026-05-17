"use client";

import { Input } from "@/components/retroui/Input";
import { Field } from "@/components/retroui/Field";

export default function InputStyleError() {
  return (
    <Field className="grid w-full max-w-sm items-center gap-1.5">
      <Field.Label htmlFor="pokemon">Favorite Pokemon</Field.Label>
      <Input
        type="pokemon"
        id="pokemon"
        placeholder="Charmander"
        defaultValue="Son Goku"
        aria-invalid
      />
      <Field.Error>Please provide a valid pokemon!</Field.Error>
    </Field>
  );
}
