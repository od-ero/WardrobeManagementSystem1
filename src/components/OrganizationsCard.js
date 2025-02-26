
import Image from 'next/image'
import Button from '@/components/Button'


const OrganizationCard = ({ name, location, href, phone, onSelectBranch }) => {


    return (
        <div
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4">


                <div id="dropdown"
                     className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                    <ul className="py-2" aria-labelledby="dropdownButton">
                        <li>
                            <a href="#"
                               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                        </li>
                        <li>
                            <a href="#"
                               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export
                                Data</a>
                        </li>
                        <li>
                            <a href="#"
                               className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center pb-10">

                <Image
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src="/images/auth/organization-logo.jpg"
                    alt="User image"
                    width={96} // Adjust width
                    height={96} // Adjust height
                    priority
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{phone}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{location}</span>
                <div className="flex mt-4 md:mt-6">
                    {href && ( <Button href={href}>Select Organization</Button>)}

                    {onSelectBranch && ( <Button type={`button`} onClick={() => onSelectBranch()}>Select Branch</Button>)}



                </div>
            </div>
        </div>

    );
};

export default OrganizationCard;


