import { useState } from "react";
import arrow from "@/public/Arrow - Left 2.svg";
import vector from "@/public/Vector.svg";
import keyboardopen from "@/public/keyboardopen.svg";
import note from "@/public/note.svg";
import group from "@/public/Group 223.svg";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

const OPEN_BUTTON_CLASSNAMES =
  "bg-white-200 shadow-md p-[14px] w-10 h-10 rounded-[16px] flex place-items-center";

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          OPEN_BUTTON_CLASSNAMES,
          "absolute md:hidden top-6 right-6"
        )}
      >
        <Image
          src={arrow}
          alt="open menu"
          className="text-black w-full"
          width={15}
          height={15}
        />
      </button>
    );

  return (
    <div className="relative md:hidden top-6 right-0">
      <div className="fixed inset-0 bg-black bg-opacity-50 z-30"></div>

      <div className="absolute top-0 right-0 w-64 h-96 rounded-l-2xl p-4 transition duration-300 bg-white shadow-2xl z-40">
        <div className="px-2 py-2 flex items-center space-x-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={clsx(OPEN_BUTTON_CLASSNAMES)}
          >
            <Image
              src={arrow}
              alt={""}
              className="h-10 w-10 text-black rotate-180"
            />
          </button>
          <h2 className="text-black font-normal">Menu</h2>
        </div>

        <div className="py-2">
          {[
            { href: "/", name: "Tableau de bord", icon: keyboardopen },
            { href: "/", name: "Mes émargements", icon: note },
            { href: "/", name: "Mes groupes", icon: vector },
            { href: "/", name: "Mon agenda", icon: group },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-2 text-black font-normal flex items-center"
            >
              <Image src={item.icon} alt="icon" className="h-4 w-4 mr-2" />
              {item.name}
            </Link>
          ))}
        </div>

        <Link
          className="absolute font-bold flex-row justify-center items-center text-center px-4 py-2 text-white bg-black rounded-full right-4 bottom-6"
          href="/login"
        >
          Se déconnecter
        </Link>
      </div>
    </div>
  );
};

export default FloatingMenu;
