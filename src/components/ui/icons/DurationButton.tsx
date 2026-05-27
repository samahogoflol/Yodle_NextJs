import clsx from "clsx";

interface DurationButtonProps {
    duration : string;
    isActive : boolean;
    onClick: () => void;
    className?: string;
}

const DurationButton:React.FC<DurationButtonProps> = ({duration, isActive, onClick, className}) => {
    return (
        <button 
          onClick={onClick}
          className={clsx("md:pl-3 md:pr-8 text-[16px] text-center py-3 px-2 md:p-3 h-full w-full border border-white text-white leading-[130%] transition-colors",
            !isActive && "hover:bg-[#D3DCF8] hover:text-black hover:border-none",
            isActive && "bg-[#2E78E5] text-white border-none", className
          )}
        >
            {duration}
        </button>
    )
}

export default DurationButton;