export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} StockTrader. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-600">About</a>
          <a href="#" className="hover:text-blue-600">Privacy</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </div>
      </div>
    </footer>
  )
}
