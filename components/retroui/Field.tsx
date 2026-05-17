"use client"

import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Field } from '@base-ui/react/field';
import { cn } from "@/lib/utils"

function Separator({ className, ...props }: React.ComponentProps<"hr">) {
  return <hr className={cn("border-t border-border", className)} {...props} />;
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Field.Label>) {
  return (
    <Field.Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:bg-input/30 has-[>[data-slot=field]]:rounded-2xl has-[>[data-slot=field]]:border *:data-[slot=field]:p-4",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <Field.Description
      data-slot="field-description"
      className={cn(
        "text-left text-sm leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
        "last:mt-0 nth-last-2:-mt-1",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}


function FieldError({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <Field.Description
      data-slot="field-description"
      className={cn(
        "text-left text-sm leading-normal font-normal text-destructive group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
        "last:mt-0 nth-last-2:-mt-1",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}


const FieldObj = Object.assign(Field.Root, {
  Label: FieldLabel,
  Description: FieldDescription,
  Error: FieldError,
})

export {
  FieldObj as Field,
}