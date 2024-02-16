import Image from "next/image";
import statusup from "@/public/statusup.svg";

type GroupRecap = {
  inscrits: number;
  abandons: number;
  groupPresence: number;
  progression: any;
};

const GroupRecap = ({ groupRecap }: { groupRecap: GroupRecap }) => {
  
  return (
    <div>
      <div className="flex items-center ml-6 mt-4">
        <Image
          src={statusup}
          alt="Recapitulatif du groupe"
          width={17}
          height={17}
        />
        <h1 className="text-[14px] font-semibold ml-2">Récapitulatif du groupe :</h1>
      </div>
      <div className="flex justify-around bg-white shadow-md rounded-lg pt-4 pb-4 mb-2 ml-6 mr-6">
        <div className="flex justify-around space-x-8">
          {[
            {
              name: "Inscrits",
              number: groupRecap.inscrits,
              isPercentage: false,
            },
            {
              name: "Abandons",
              number: groupRecap.abandons,
              isPercentage: false,
            },
            {
              name: "Présence",
              number: groupRecap.groupPresence,
              isPercentage: true,
            },
            {
              name: "Progression",
              number: groupRecap.progression,
              isPercentage: false,
            },
          ].map(({ name, number, isPercentage }) => (
            <div
              key={name}
              className="flex flex-col items-center justify-center"
            >
              <span className="text-black font-semibold text-lg">
                {number}
                {isPercentage ? " %" : ""}
              </span>
              <div className="text-black font-light text-xs">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupRecap;
