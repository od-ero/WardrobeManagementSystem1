import { Header } from '@/app/commonVariable';
import Link from 'next/link';

export const MenuLink = ({ href, label }) => {
    return (
        <Link href={href} passHref className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                {label}
        </Link>
    );
};
export const MenuCardBody = ({ title, children }) => {
    return (
        <div
            className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <a href="#"
           className="block w-full px-4 py-2 text-white bg-primaryGreen border-b border-gray-200 rounded-t-lg cursor-pointer dark:bg-gray-800 dark:border-gray-600">
            { title }
        </a>
            {children}
    </div>
)

}
const MenuCard = ({ title ,  children}) => {
    return (


        <div>
            <Header title={ title} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 mt-4">
                {/* Users Information Section */}
                {children}
            </div>


        </div>
    )

};

export default MenuCard
