const Input = ({disabled = false, className, ...props}) => (
    <input
        disabled={disabled}
        className={`${className} text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
        {...props}
    />
)

export default Input
