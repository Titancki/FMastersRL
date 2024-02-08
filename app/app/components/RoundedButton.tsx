import { FC, ReactNode, MouseEvent } from 'react';

type RoundedButtonProps = {
    children: ReactNode;
    enabled: boolean;
    className?: string;
    onClick?: (event: MouseEvent) => void;
};

export const RoundedButton: FC<RoundedButtonProps> = ({ children, enabled, className, onClick }) => {
    const buttonClickHandler = (event: MouseEvent) => {
        if (enabled && onClick) {
            onClick(event);
        }
    };

    return (
        <button
            className={`rounded-full border-2 border-gray-100 text-gray-100 p-2 max-h-12 inline-block flex justify-center items-center ${className}
            hover:bg-gray-700 hover:bg-opacity-50
            disabled:bg-gray-600 disabled:border-gray-400 disabled:text-gray-400 disabled:bg-opacity-30`}
            disabled={!enabled}
            onClick={buttonClickHandler} // Call the custom click handler
        >
            {children}
        </button>
    );
};

export default RoundedButton