import * as React from "react"
import { cn } from "@/lib/utils"

const badgeVariants = {
    default: "badge badge-default",
    secondary: "badge badge-secondary",
    destructive: "badge badge-destructive",
    outline: "badge badge-outline",
    ghost: "badge badge-ghost",
    success: "badge badge-success",
    warning: "badge badge-warning",
    link: "badge badge-link",
}

function Badge({
    className,
    variant = "default",
    asChild = false,
    ...props
}: React.ComponentProps<"span"> & {
    variant?: keyof typeof badgeVariants
    asChild?: boolean }) {
    return (
        <span
            data-slot="badge"
            data-variant={variant}
            className={cn(badgeVariants[variant], className)}
            {...props}
        />
    )
}

export { Badge, badgeVariants }