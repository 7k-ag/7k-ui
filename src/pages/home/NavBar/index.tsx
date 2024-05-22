import ConnectButton from "./ConnectButton";
import Logo from "./Logo";

function NavBar() {
  return (
    <nav className="flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6">
      <Logo />
      <ConnectButton />
    </nav>
  );
}

export default NavBar;
