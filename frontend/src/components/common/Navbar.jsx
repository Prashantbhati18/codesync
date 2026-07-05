// Example shared component — top navigation bar used inside MainLayout.
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      <span className="font-bold">CodeSync</span>
      {/* Nav links go here */}
    </nav>
  );
}
