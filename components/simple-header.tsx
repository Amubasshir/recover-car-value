import Link from "next/link"

export function SimpleHeader() {
  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-10">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <img src="https://i.ibb.co/ccSw4bWf/shodwe-4-e1744727392385.png" alt="Recover Car Value" className="h-14" />
        </Link>
      </div>
    </header>
  )
}
