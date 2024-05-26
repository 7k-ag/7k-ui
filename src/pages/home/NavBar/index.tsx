import ConnectButton from "./ConnectButton";
import Logo from "./Logo";

function NavBar() {
  return (
    <nav className="flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6">
      <div className="flex items-center gap-4">
        <Logo />
        <div className="flex items-center px-4 py-3 min-h-10 bg-[#252734] rounded-2xl">
          <span className="text-xs/none">Aggregator</span>
        </div>
      </div>
      <ConnectButton />
    </nav>
  );
}

export default NavBar;
