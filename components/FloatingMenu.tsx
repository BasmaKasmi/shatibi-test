import arrow from "@/public/Arrow - Left 2.svg";
import vector from "@/public/Vector.svg";
import keyboardopen from "@/public/keyboardopen.svg";
import note from "@/public/note.svg";
import group from "@/public/Group 223.svg";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/lib/backend-api";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const Menu = ({ close }: any) => {
  const router = useRouter();

  const logout = () => {
    Cookies.remove(ACCESS_TOKEN_COOKIE_NAME);
    router.push("/login");
  };

  return (
    <div className="md:hidden">
      <div className="flex items-center space-x-3">
        <button onClick={close} className={clsx(OPEN_BUTTON_CLASSNAMES)}>
          <Image
            src={arrow}
            alt={""}
            className="h-10 w-10 text-black rotate-180"
          />
        </button>
        <h2 className="text-black font-normal">Menu</h2>
      </div>

      <div className="py-2 mb-3">
        {[
          { href: "/", name: "Tableau de bord", icon: keyboardopen },
          { href: "/", name: "Mes émargements", icon: note },
          { href: "/", name: "Mes groupes", icon: vector },
          { href: "/", name: "Mon agenda", icon: group },
        ].map((item) => (
          <Link
            onClick={close}
            key={item.name}
            href={item.href}
            className="px-4 py-2 text-black font-normal flex items-center"
          >
            <Image src={item.icon} alt="icon" className="h-4 w-4 mr-2" />
            {item.name}
          </Link>
        ))}
      </div>
      <div className="pb-6 mb-8">
        <button
          className="absolute font-bold flex-row justify-center items-center text-center px-4 py-2 text-white bg-black rounded-full right-4"
          onClick={logout}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

const OPEN_BUTTON_CLASSNAMES =
  "bg-white-200 shadow-md p-[14px] w-10 h-10 rounded-[16px] flex place-items-center";

const FloatingMenu = () => {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <div className="absolute md:hidden top-6 right-6">
        <button
          onClick={open}
          className={clsx(OPEN_BUTTON_CLASSNAMES, { hidden: opened })}
        >
          <Image
            src={arrow}
            alt="open menu"
            className="text-black w-full"
            width={15}
            height={15}
          />
        </button>
      </div>

      <Modal
        transitionProps={{ transition: "slide-left" }}
        styles={{
          inner: {
            padding: 0,
          },
          content: {
            position: "absolute",
            top: 12,
            right: 0,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        }}
        size="70%"
        onClose={close}
        opened={opened}
        withCloseButton={false}
      >
        <Menu close={close} />
      </Modal>
    </>
  );
};

export default FloatingMenu;
