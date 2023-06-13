import { getServerSession } from "next-auth";
import ArchiveItem from "~components/archiveItem";
import { authOptions } from "~lib/auth";
import { Item } from "~types/item";

async function getArchive() {
  const session = await getServerSession(authOptions);
  const res = await fetch("https://re-me-api.onrender.com/api/v1/archives", {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: session?.user.token!,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch library");
  }

  return res.json();
}

export default async function Page() {
  const data = await getArchive();

  return (
    <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
      <div className="mb-6 flex flex-col gap-2.5">
        <h2 className="text-2xl font-bold uppercase text-[#FFEC78] lg:text-3xl">
          archived
        </h2>
        <div className="h-px bg-[#93A3B6]" />
      </div>

      <h2 className="mb-10 mt-4 text-xl font-medium uppercase">Completed!</h2>
      <div className="grid gap-x-4 gap-y-8 px-6 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
        {data.map((item: Item) => (
          <ArchiveItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
