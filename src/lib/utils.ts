import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function VALID_DOMAINS() {

  const domains = ['gmail.com','yahoo.com','hotmail.com','outlook.com']

  if(process.env.NODE_ENV === "production"){
    domains.push("gmail.com")
  }

  return domains
}