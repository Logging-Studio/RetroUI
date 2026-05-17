import { Input } from "@/components/retroui";
import { Field } from "@/components/retroui/Field";

export default function LabelStyleDefault() {
  return (
    <Field className="grid w-full max-w-sm items-center gap-1.5">
      <Field.Label htmlFor="pokemon">Favorite Pokemon</Field.Label>
      <Input type="pokemon" id="pokemon" placeholder="Charmander" />
    </Field>
  );
}
