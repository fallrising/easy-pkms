'use client'

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { buttonVariants } from "@/components/common/button";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar = ({
                      className,
                      classNames,
                      showOutsideDays = true,
                      ...props
                  }: CalendarProps) => {
    // Define the default class names for DayPicker
    const defaultClassNames = {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center mb-4",
        caption_label: "text-sm font-semibold",
        nav: "flex items-center space-x-1",
        nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-8 w-8 bg-transparent p-0 hover:opacity-75 transition-opacity"
        ),
        nav_button_previous: "absolute left-2",
        nav_button_next: "absolute right-2",
        table: "w-full border-separate border-spacing-1",
        head_row: "flex w-full",
        head_cell: cn(
            "text-muted-foreground rounded-md w-10 font-normal text-xs",
            "flex items-center justify-center h-10"
        ),
        row: "flex w-full mt-0",
        cell: cn(
            "relative p-0",
            "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
        ),
        day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-10 w-10 p-0 font-normal rounded-md",
            "hover:bg-accent hover:text-accent-foreground"
        ),
        day_selected: cn(
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
            "focus:bg-primary focus:text-primary-foreground"
        ),
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
    };

    // Combine default class names with any additional class names provided via props
    const combinedClassNames = { ...defaultClassNames, ...classNames };

    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-4 select-none", className)}
            classNames={combinedClassNames}
            {...props}
        />
    );
};

Calendar.displayName = "Calendar";

export { Calendar };