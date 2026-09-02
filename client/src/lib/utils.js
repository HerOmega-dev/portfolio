//===Tailwind===
// class-variance-authority (CVA), clsx et tailwind-merrge (twMerge) sont des addons de tailwind les plus utilisés

import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs)) // 1.clsx 2.twMerge
}