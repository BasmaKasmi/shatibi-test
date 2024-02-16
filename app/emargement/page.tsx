"use client";
import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Button from "@/components/Button";
import SectionTitle from "@/components/SectionTitle";
import { SearchParamsComponent } from "@/components/SearchParamsComponent";

const EmargementPage = () => {
  const router = useRouter();

  return (
    <div style={{ paddingBottom: "env(safe-area-inset-bottom)" }} className="h-screen flex flex-col gap-4 relative overflow-hidden md:hidden">
      <div className="pt-3 flex-shrink-0">
        <SectionTitle title="Mes émargements" />
      </div>

      <Button className="h-7 text-sm absolute right-2 top-3" onClick={() => router.back()} variant="red">
        Retour
      </Button>

      <Suspense fallback={<p>Loading...</p>}>
        <SearchParamsComponent />
      </Suspense>
    </div>
  );
};

export default EmargementPage;
