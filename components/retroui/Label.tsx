import * as React from "react";
import { Field } from "@base-ui/react/field";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

export const Label = ({
  className,
  ...props
}: React.ComponentProps<typeof Field.Label>) => (
  <Field.Label className={cn(labelVariants(), className)} {...props} />
);
