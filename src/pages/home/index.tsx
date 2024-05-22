import NavBar from "./NavBar";
import SwapForm from "./SwapForm";

function HomePage() {
  return (
    <main className="flex flex-col gap-[3.75rem]">
      <NavBar />
      <div className="flex items-center justify-center">
        <SwapForm />
      </div>
    </main>
  );
}

export default HomePage;
