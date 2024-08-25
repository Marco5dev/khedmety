import Link from "next/link";

export default function Header() {


  return (
    <>
      <header className="flex fixed top-0 min-w-[95%] h-17 z-10 justify-between content-center items-center p-4 right-0 left-0 m-5 shadow-2xl">
        <button className="text-2xl font-bold uppercase btn btn-ghost">
          Khedmety
        </button>

        <nav className="flex flex-row gap-2">
          <button className="btn btn-ghost">Subjects</button>

          <label className="input input-bordered bg-neutral flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <kbd className="kbd kbd-sm bg-neutral-600">⌘</kbd>
            <kbd className="kbd kbd-sm bg-neutral-600">K</kbd>
          </label>
          <button className="btn btn-secondary">Register</button>
          <Link className="btn btn-primary" href="/login">
            Login
          </Link>
        </nav>
      </header>
    </>
  );
}
