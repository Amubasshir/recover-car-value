import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link href="/">
            <img
              src="https://i.ibb.co/ccSw4bWf/shodwe-4-e1744727392385.png"
              alt="Recover Car Value"
              className="h-10 md:h-14"
            />
          </Link>
        </div>

        <div className="flex items-center flex-col gap-0 text-xs md:text-base">
          <span className="">⭐⭐⭐⭐⭐ </span>
          <span className="!text-black"> Trusted Law Firm</span>
        </div>
      </div>
    </header>
  );
}
