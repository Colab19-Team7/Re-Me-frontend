import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import LibraryItem from "~components/libraryItem";
import { authOptions } from "~lib/auth";
import { Item } from "~types/item";

async function getData() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/signin");

  const res = await fetch("https://re-me-api.onrender.com/api/v1/items", {
    next: {
      revalidate: 60,
    },
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // @ts-ignore
      // TODO: add type for session
      Authorization: session?.user?.token,
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
    // console.log(res.json());
  }

  // console.log(res.json());

  return res.json();
}

export default async function IndexPage() {
  const data = await getData();

  // console.log(data);
  return (
    <section className="grid min-h-screen grid-cols-12 gap-6 bg-[#130F40] px-6 py-8 text-[#FEF8FD]">
      <div className="col-span-2 h-fit items-start space-y-5 rounded-3xl bg-[#1E1633] px-3 py-4">
        <div>
          <h1 className="text-2xl font-bold text-[#FFEC78] lg:text-3xl">
            Re-Me
          </h1>
          <p className="text-sm text-[#93A3B6]">a bookmarking reminder app</p>
        </div>

        <ul className="text-[#FEF8FD]">
          <li className="cursor-pointer">Library</li>
          <li className="cursor-pointer">Account</li>
        </ul>
      </div>

      <div className="col-span-10 rounded-3xl bg-[#1E1633] py-10">
        <div className="">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold uppercase text-[#FFEC78] lg:text-3xl">
                library
              </h2>
            </div>

            <div className="grid gap-x-4 gap-y-8 px-6 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
              {data.map((item: Item) => (
                <LibraryItem item={item} key={item.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
