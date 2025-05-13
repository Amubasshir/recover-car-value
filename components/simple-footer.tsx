export function SimpleFooter() {
  return (
    <footer className="border-t bg-white py-8 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
      <div className="container text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Prime Counsel Law Group. All rights reserved.
      </div>
    </footer>
  )
}
