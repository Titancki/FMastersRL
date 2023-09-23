import type { FC, ReactElement, ReactNode } from 'react';

type RoundedButtonProps = {
    children: ReactNode;
    className?: string;
};

export const RoundedButton: FC<RoundedButtonProps> = ({ children, className }) => {
    return (
        <button className={`rounded-full border-2 hover:bg-gray-700 hover:bg-opacity-50 border-gray-100 text-gray-100 p-2 max-h-12 inline-block flex justify-center align-middle ${className}`}>
            {children}
        </button>
    );
};

export default RoundedButton;
