"use client";

import Button from "@/components/Button";
import Image from "next/image";

const NewPasswordPage = () => {

  return (
    <div className="h-full min-h-screen">
      <div className="flex h-full min-h-screen flex-col gap-2 p-3 items-center justify-between max-w-2xl mx-auto">
        <div>
          <h1 className="text-[50px] font-semibold mt-32">
          Réinitialisation
          </h1>
          <p className="text-shatibi-grey font-normal">
          Renseignez votre nouveau mot de passe.
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full font-medium">
        <input
        className="mt-1 block w-full px-3 py-4 bg-white border rounded-xl"
        type="password"
        placeholder="Nouveau mot de passe"
        />
        <input
        className="mt-1 block w-full px-3 py-4 bg-white border rounded-xl"
        type="password"
        placeholder="Confirmer le mot de passe"
        />
        <Button
            className="w-10/12 self-center font-bold mt-1"
          >
            Confirmer
        </Button>
        </div>
        <Image
          className="self-center mb-3 p-6"
          src="/logo-shatibi.png"
          alt="Logo Shatibi"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
};

export default NewPasswordPage;
