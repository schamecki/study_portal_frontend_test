import type {ReactNode} from "react";

interface ProfileTabContentProps {
    active: boolean;
    children?: ReactNode | ReactNode[];
}

function  ProfileTabContent ({active, children}: ProfileTabContentProps) {

    return <>
        <div
            className={`transition-all duration-500 ease-in-out transform ${
                active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
            {active && (
                <>
                    {children}
                </>
            )}
        </div>
    </>
}

export default ProfileTabContent;