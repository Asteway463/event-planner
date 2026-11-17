import * as React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

type TableProps = React.ComponentProps<"table"> & {
    className?: string
}

function Table({ className, ...props }: TableProps) {
    return (
        <div
            data-slot="table-container"
            className="table-container"
        >
            <table
                data-slot="table"
                className={cn(className)}
                {...props}
            />
        </div>
    )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
    return (
        <thead
            data-slot="table-header"
            className={cn(className)}
            {...props}
        />
    )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
    return (
        <tbody
            data-slot="table-body"
            className={cn(className)}
            {...props}
        />
    )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
    return (
        <tfoot
            data-slot="table-footer"
            className={cn(className)}
            {...props}
        />
    )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
    return (
        <tr
            data-slot="table-row"
            className={cn(className)}
            {...props}
        />
    )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
    return (
        <th
            data-slot="table-head"
            className={cn(className)}
            {...props}
        />
    )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
    return (
        <td
            data-slot="table-cell"
            className={cn(className)}
            {...props}
        />
    )
}

function TableCaption({
    className,
    ...props
}: React.ComponentProps<"caption">) {
    return (
        <caption
            data-slot="table-caption"
            className={cn(className)}
            {...props}
        />
    )
}

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
    Slot,
}