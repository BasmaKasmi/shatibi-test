"use client";
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';
import FeuilleEmargement from './FeuilleEmargement';
import { formatCourseName } from '@/lib/format-utils';
import { formatDayToThreeLetters } from '@/lib/dates';

export const SearchParamsComponent = () => {
    const search = useSearchParams();
    const groupId = Number(search.get("groupId"));
    const date = search.get("date") || "";
    const groupName = search.get("groupName") || "";
    const groupSlot = search.get("groupSlot") || "";
  
    if (!(date && groupId)) {
      return <p>The group id and date should be specified as search params in url</p>;
    }
  
    return (
      <>
        {groupName && groupSlot && (
          <div>
            <h1 className="text-xl font-bold text-center mt-6">{formatCourseName(groupName)}</h1>
            <p className="text-md font-semibold text-center">{formatDayToThreeLetters(groupSlot)}</p>
          </div>
        )}
        <FeuilleEmargement groupId={groupId} date={date} groupName={groupName} groupSlot={groupSlot} />
      </>
    );
  };
  