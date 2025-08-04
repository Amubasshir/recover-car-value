export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="border-t py-8 text-center text-sm text-gray-500">
        <div className="container">
          © {new Date().getFullYear()} Prime Counsel Law Group. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
