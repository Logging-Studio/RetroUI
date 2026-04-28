"use client";

import { Select } from "@/components/base-retroui/Select";
import React from "react";

export default function SelectStyleDefault() {
  return (
    <Select>
      <Select.Trigger className="w-60">
        <Select.Value placeholder="Pick your Pokemon" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Item value="pikachu">Pikachu</Select.Item>
          <Select.Item value="charizard">Charizard</Select.Item>
          <Select.Item value="bulbasaur">Bulbasaur</Select.Item>
          <Select.Item value="squirtle">Squirtle</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select>
  );
}
