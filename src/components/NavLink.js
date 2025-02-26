import Link from 'next/link'

const NavLink = ({ active = false, children, ...props }) => (
    <Link
        {...props}
        className={`inline-flex items-center px-1 pt-1 border-b-4 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out h-full ${
            active
                ? 'border-blue-600 text-gray-900 focus:border-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-blue-600 focus:text-gray-700 focus:border-gray-300'
        }`}>
        {children}
    </Link>
)

export default NavLink
