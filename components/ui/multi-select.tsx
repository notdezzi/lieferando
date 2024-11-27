// components/ui/multi-select.tsx
import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  name: string;
}

export function MultiSelect({ options, name }: MultiSelectProps) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox 
            id={`option-${option.value}`} 
            name={name} 
            value={option.value}
          />
          <Label 
            htmlFor={`option-${option.value}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  )
}