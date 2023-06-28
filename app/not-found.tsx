import Link from "next/link";

function NotFound() {
  //   <div class="grid h-screen px-4 bg-white place-content-center">
  //   <h1 class="tracking-widest text-gray-500 uppercase">404 | Not Found</h1>
  // </div>
  return (
    <div className="grid h-screen place-content-center bg-[#130F40] py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex flex-col items-center">
          <p className="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">
            That&apos;s a 404
          </p>
          <h1 className="mb-2 text-center text-2xl font-bold text-white md:text-3xl">
            Page not found
          </h1>

          <p className="mb-12 max-w-screen-md text-center text-gray-500 md:text-lg">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>

          <Link
            href="/"
            className="text-black-800 mb-8 inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl"
            aria-label="logo"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
