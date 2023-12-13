import { displayDate } from '@/lib/dates';

const Emargement = ({ emargement, onClick }: any) => {
  return (
    <div
      key={emargement.date + emargement.name}
      onClick={onClick}
      className="rounded-xl bg-white px-4 py-2 text-sm"
    >
      <h2 className="font-semibold">
        {emargement.name} ({emargement.slot})
      </h2>
      <p className="italic text-[#898989] text-xs font-semibold">
        {displayDate(emargement.date)}
      </p>
    </div>
  );
};

export default Emargement;
