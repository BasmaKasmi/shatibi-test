"use client";

import Button from "@/components/Button";
import BackendApi, { ACCESS_TOKEN_COOKIE_NAME } from "@/lib/backend-api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import Image from "next/image";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const INPUT_CLASSNAMES =
  "rounded-xl border-gray-400 border p-4 w-full w-11/12 self-center";

type Inputs = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { register, watch } = useForm<Inputs>();

  const { mutate } = useMutation({
    mutationFn: (event: any) => login(event),
    onSuccess: (data) => {
      Cookie.set(ACCESS_TOKEN_COOKIE_NAME, data.token);

      router.push("/");
    },
    onError: () =>
      setErrorMessage("Identifiants invalides. Veillez réessayer."),
  });

  const router = useRouter();

  const login = async (event: any) => {
    event?.preventDefault();

    const { username, password } = watch();

    const formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);

    const response = await BackendApi.post("login_check", formData);

    return response.data;
  };

  // useEffect(() => {
  //   BackendApi.get("teacher/attendance/no/validate")
  //     .then(() => {
  //       router.push("/");
  //     })
  //     .catch(() => {});
  // }, []);

  return (
    <div className="h-full min-h-screen">
      <div className="flex h-full min-h-screen flex-col gap-2 p-3 items-center justify-between max-w-2xl mx-auto">
        <div>
          <h1 className="text-[54px] font-semibold mt-32">Espace Professeur</h1>

          <p className="text-gray-400 font-normal">
            Connectez-vous et notez l’assiduité de vos groupes
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full font-medium">
          <input
            className={clsx(INPUT_CLASSNAMES, {
              "border border-red-600 placeholder:text-red-600": errorMessage,
            })}
            {...register("username")}
            type="text"
            placeholder="Identifiant"
          />
          <input
            className={clsx(INPUT_CLASSNAMES, {
              "border border-red-600 placeholder:text-red-600": errorMessage,
            })}
            type="password"
            autoComplete="current-password"
            placeholder="Mot de passe"
            {...register("password")}
          />

          {errorMessage !== "" ? (
            <p className="text-red-600 font-semibold">{errorMessage}</p>
          ) : null}

          <Button
            className="w-10/12 self-center font-bold"
            onClick={(event: any) => mutate(event)}
          >
            Se connecter
          </Button>
        </div>

        <Image
          className="self-center mb-3 p-6"
          src="/logo-shatibi.png"
          alt="Logo Shatibi"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default LoginPage;
