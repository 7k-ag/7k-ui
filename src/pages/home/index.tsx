import NavBar from "./NavBar";
import SwapForm from "./SwapForm";

function HomePage() {
  return (
    <main className="flex flex-col gap-6 sm:gap-[3.75rem]">
      <NavBar />
      <SwapForm />
    </main>
  );
}

export default HomePage;
