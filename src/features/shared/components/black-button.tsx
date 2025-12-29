export function BlackButton({ children, onClick }: { 
    children: React.ReactNode,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
    return (
        <button 
            onClick={onClick}
            className="cursor-pointer rounded-full bg-black px-3 py-2 text-white transition hover:bg-gray-800"
        >
            {children}
        </button>
    )
}
