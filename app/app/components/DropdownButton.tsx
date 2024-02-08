import { FC, ReactNode, MouseEvent } from 'react';

type DropdowButtonProps = {
    children: ReactNode;
    enabled: boolean;
    className?: string;
    onClick?: (event: MouseEvent) => void;
};

export const DropdownButton: FC<DropdowButtonProps> = ({ children, enabled, className, onClick }) => {
    const buttonClickHandler = (event: MouseEvent) => {
        if (enabled && onClick) {
            onClick(event);
        }
    };

    return (
        <button>
            
        </button>
    );
};

export default DropdownButton

