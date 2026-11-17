"use client"

import * as React from "react"
import { Check } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const Checkbox = React.forwardRef<
    HTMLInputElement,
    React.ComponentPropsWithoutRef<"button"> & {
        checked?: boolean
        defaultChecked?: boolean
        onCheckedChange?: (checked: boolean) => void
        id?: string
        name?: string
        value?: string
        required?: boolean
    }
>(({ className, checked, defaultChecked, onCheckedChange, id, name, value, required, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked ?? defaultChecked ?? false)

    const handleChange = (nextChecked: boolean) => {
        setIsChecked(nextChecked)
        onCheckedChange?.(nextChecked)
    }

    return (
        <Slot.Root
            ref={ref}
            data-checked={isChecked}
            onCheckedChange={handleChange as any}
            className={cn("checkbox", className)}
            {...(props as any)}
        >
            <span className="pointer-events-none flex items-center justify-center w-full h-full">
                {isChecked ? (
                    <Check className="size-4" />
                ) : (
                    <span className="w-full h-full" />
                )}
            </span>
            <input
                type="checkbox"
                id={id}
                name={name}
                value={value}
                required={required}
                className="sr-only peer"
                checked={isChecked}
                onChange={(e) => handleChange(e.target.checked)}
                defaultChecked={defaultChecked}
            />
        </Slot.Root>
    )
})

Checkbox.displayName = "Checkbox"

export { Checkbox }