export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      {/* <div className="container flex flex-col gap-8 py-12 md:flex-row md:gap-12 md:py-16 px-4 md:px-6">
        <div className="flex flex-col gap-4 md:gap-6 md:flex-1">
          <div className="flex items-center">
            <img src="https://i.ibb.co/ccSw4bWf/shodwe-4-e1744727392385.png" alt="Recover Car Value" className="h-10 md:h-14" />
          </div>
          <p className="text-gray-500">Helping vehicle owners recover diminished value since 2010.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:flex-1">
          {[
            {
              title: "Company",
              links: [
                { href: "#about", label: "About Us" },
                { href: "#", label: "Contact" },
              ],
            },
            {
              title: "Resources",
              links: [
                { href: "#faq", label: "FAQ" },
                { href: "#", label: "Blog" },
              ],
            },
            {
              title: "Legal",
              links: [
                { href: "#", label: "Privacy Policy" },
                { href: "#", label: "Terms of Service" },
              ],
            },
          ].map((column, i) => (
            <div key={i} className="space-y-3">
              <h4 className="text-sm font-semibold">{column.title}</h4>
              <ul className="space-y-3 text-sm">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-primary hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div> */}
      <div className="border-t py-8 text-center text-sm text-gray-500">
        <div className="container">
          © {new Date().getFullYear()} Prime Counsel Law Group. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
