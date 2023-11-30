"use client";

import Button from "@/components/Button";
import BackendApi, { ACCESS_TOKEN_COOKIE_NAME } from "@/lib/backend-api";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import Image from "next/image";

const INPUT_CLASSNAMES =
  "rounded-xl border-gray-400 border p-4 w-full w-11/12 self-center";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const login = async () => {
    const formData = new FormData();

    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    const response = await BackendApi.post("login_check", formData, {
      responseType: "json",
    });

    return response.data;
  };

  const { mutate } = useMutation({
    mutationFn: () => login(),
    onSuccess: (data) => {
      Cookie.set(ACCESS_TOKEN_COOKIE_NAME, data.token);

      router.push("/");
    },
  });

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
            className={INPUT_CLASSNAMES}
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            type="text"
            placeholder="Identifiant"
          />
          <input
            className={INPUT_CLASSNAMES}
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />

          <Button className="w-10/12 self-center font-bold" onClick={() => mutate()}>
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
