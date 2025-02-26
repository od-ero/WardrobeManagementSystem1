import { Icon } from "@iconify/react";
import Link from 'next/link';
export const SidebarLinks = ({ label, href }) => (

    <Link href={href} className="">
        <div className="flex p-2 items-center text-gray-900 hover:bg-blue-600 hover:text-white">
            <Icon icon="heroicons:check-circle" className="w-4 h-4 mr-2" />
            {label}
        </div>
    </Link>
)


export const SidebarLinksSmall = ({ label, href }) => (
    <div className="flex p-2 items-center text-white hover:bg-blue-600 hover:text-white">
        <Link href={href} className="flex items-center text-wrap">
            <Icon icon="heroicons:check-circle" className="w-4 h-6 mr-2" />
            {label}
        </Link>
    </div>
);
