"use client";

import Button from "@/components/Button";
import FeuilleEmargement from "@/components/FeuilleEmargement";
import SectionTitle from "@/components/SectionTitle";
import { useRouter, useSearchParams } from "next/navigation";

const EmargementPage = () => {
  const router = useRouter();
  const search = useSearchParams();
  const groupId = Number(search.get("groupId"));
  const date = search.get("date");

  if (!(date && groupId))
    return (
      <p>The group id and date should be specified as search params in url</p>
    );
  return (
    <div>
      <div className="h-screen flex flex-col gap-3 relative overflow-hidden">
      <div className="mt-3">
        <SectionTitle title="Emargement" />
      </div>
      <Button
        className="h-7 text-sm absolute right-0 mt-3 mr-8"
        onClick={() => router.back()}
        variant="red"
      >
        Annuler
      </Button>

      <FeuilleEmargement groupId={groupId} date={date} />
    </div>
    </div>

  );
};

export default EmargementPage;
