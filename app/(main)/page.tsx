import { Metadata } from "next";
import { getServerSession } from "next-auth";
import LibraryItem from "~components/libraryItem";
import { siteConfig } from "~config/site";
import { authOptions } from "~lib/auth";
import { Item } from "~types/item";

async function getData(token: string) {
  const res = await fetch("https://re-me-api.onrender.com/api/v1/items", {
    next: {
      revalidate: 0,
    },
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch library");
  }

  return res.json();
}

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default async function IndexPage() {
  const session = await getServerSession(authOptions);
  const data = await getData(session?.user.token!);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-bold uppercase text-[#FFEC78] lg:text-3xl">
          library
        </h2>
      </div>

      <div className="grid gap-x-4 gap-y-8 px-6 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
        {data.map((item: Item) => (
          <LibraryItem
            // onDelete={deleteItem}
            // onMarkAsRead={markAsRead}
            item={item}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
}
