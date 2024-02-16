"use client";

import Button from "@/components/Button";
import Image from "next/image";

const ResetPasswordPage = () => {

  return (
    <div className="h-full min-h-screen">
      <div className="flex h-full min-h-screen flex-col gap-2 p-3 items-center justify-between max-w-2xl mx-auto">
        <div>
          <h1 className="text-[54px] font-semibold mt-32">Mot de passe oublié ?</h1>

          <p className="text-shatibi-grey font-normal">
          Renseignez votre adresse mail pour redéfinir votre mot de passe.
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full font-medium">
        <input
        className="mt-1 block w-full px-3 py-4 bg-white border rounded-xl"
        type="email"
        placeholder="Adresse mail"
        />
        <Button
            className="w-10/12 self-center font-bold mt-1"
          >
            Envoyer
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

export default ResetPasswordPage;
