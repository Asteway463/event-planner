"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type FormProps = React.ComponentProps<"form">

function Form({ className, ...props }: FormProps) {
    return (
        <form
            className={cn("space-y-6", className)}
            {...props}
        />
    )
}

type FormFieldProps = {
    children: React.ReactNode
    className?: string
}

function FormField({
    children,
    className,
}: FormFieldProps) {
    return (
        <div className={cn("space-y-2", className)}>
            {children}
        </div>
    )
}

type FormMessageProps = React.ComponentProps<"p">

function FormMessage({
    className,
    children,
    ...props
}: FormMessageProps) {
    return (
        <p
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        >
            {children}
        </p>
    )
}

export {
    Form,
    FormField,
    FormMessage,
}