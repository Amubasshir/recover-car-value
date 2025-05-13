import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link href="/">
            <img src="https://i.ibb.co/ccSw4bWf/shodwe-4-e1744727392385.png" alt="Recover Car Value" className="h-14" />
          </Link>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link
            href="#how-it-works"
            className="text-sm font-medium hover:text-primary hover:underline underline-offset-4 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium hover:text-primary hover:underline underline-offset-4 transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium hover:text-primary hover:underline underline-offset-4 transition-colors"
          >
            About Us
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/qualify/step1">
            <Button className="font-bold rounded-xl">FREE INSTANT QUOTE</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
