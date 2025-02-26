const Button = ({ type='submit', className, ...props }) => (

    props.href ? (
        <a
            className={`${className} flex items-center p-2 bg-primaryBlue border border-transparent rounded-l-md font-semibold text-xs text-white text-center justify-center uppercase tracking-widest hover:bg-blue-400 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150 whitespace-nowrap`}
            {...props}
        />


    ):(
        <button
            type={type}
            className={`${className} flex items-center p-2 bg-primaryBlue border border-transparent rounded-l-md font-semibold text-xs text-white text-center justify-center uppercase tracking-widest hover:bg-blue-400 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150 whitespace-nowrap`}
            {...props}
        />
    )
)

export default Button
