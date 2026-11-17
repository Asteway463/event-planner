import * as React from "react"
import { cn } from "@/lib/utils"

const buttonVariants = {
    default: "btn btn-default",
    destructive: "btn btn-destructive",
    outline: "btn btn-outline",
    secondary: "btn btn-secondary",
    ghost: "btn btn-ghost",
    link: "btn btn-link",
}

const buttonSizes = {
    default: "",
    sm: "btn-sm",
    lg: "btn-lg",
    xs: "",
    icon: "btn-icon",
    "icon-sm": "btn-icon-sm",
}

function Button({
    className,
    variant = "default",
    size = "default",
    asChild = false,
    ...props
}: React.ComponentProps<"button"> & {
    variant?: keyof typeof buttonVariants
    size?: keyof typeof buttonSizes
    asChild?: boolean }) {
    const Comp = asChild ? React.forwardRef((props: any, ref: any) => (
        <a ref={ref} {...props} />
    )) : "button"

    return (
        <Comp
            data-slot="button"
            data-variant={variant}
            data-size={size}
            className={cn(
                buttonVariants[variant],
                buttonSizes[size],
                className
            )}
            {...props}
        />
    )
}

export { Button, buttonVariants, buttonSizes }