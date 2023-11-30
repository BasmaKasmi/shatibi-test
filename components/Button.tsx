import clsx from "clsx";


type Props = {
  variant?: "orange" | "base" | "green" | "red";
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const Button = ({ variant = "base", children, onClick, className }: Props) => {
  const classNames = clsx(
    { "text-white bg-shatibi-orange": variant === "base" },
    { "bg-shatibi-orange/[.15] text-shatibi-orange": variant === "orange" },
    { "bg-shatibi-green/[.15] text-shatibi-green": variant === "green" },
    { "bg-shatibi-red/[.15] text-shatibi-red": variant === "red" },
    "rounded-full p-3 px-7 font-bold flex flex-row place-items-center text-center",
    className
  );

  return (
    <button onClick={onClick} className={classNames}>
      <p className="w-full">{children}</p>
    </button>
  );
};

export default Button;
