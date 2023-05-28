import { Check, X } from "lucide-react"

function LibraryItem() {
  return (
    <div className="overflow-hidden rounded-3xl border-4 border-[#93A3B6] bg-[#202124]">
      <a
        href="#"
        className="group relative mb-2 block h-64 overflow-hidden bg-gray-100 lg:mb-3"
      >
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&q=75&fit=crop&w=600"
          loading="lazy"
          alt="Photo by Rachit Tank"
          className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
        />
      </a>

      <div className="space-y-4">
        <div className="px-3 text-center">
          <h2 className="hover:gray-800 mb-1 truncate font-bold uppercase text-[#FEF8FD] transition duration-100 lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, cum!
          </h2>
          <a className="text-[#93A3B6] underline lg:text-lg">www.youtube.com</a>
        </div>

        <div className="border-2 border-[#2A2A2A]" />

        <div className="flex justify-between gap-2 px-3 pb-3">
          <Check
            color="#FFEC78"
            size={40}
            strokeWidth={3}
            className="cursor-pointer"
          />
          <X
            size={40}
            color="#B90E0E"
            strokeWidth={3}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

export default LibraryItem
