"use client";

import { Input } from "@/components/retroui/Input";
import { Field } from "@/components/retroui/Field";

export default function InputStyleWithLabel() {
  return (
    <Field>
      <Field.Label htmlFor="pokemon">Favorite Pokemon</Field.Label>
      <Input type="pokemon" id="pokemon" placeholder="Charmander" />
    </Field>
  );
}
