const Button = ({ type='submit', className, ...props }) => (

    props.href ? (
        <a
            className={`${className} flex items-center px-4 py-2 bg-primaryBlue border border-transparent rounded-md font-semibold text-xs text-white text-center justify-center uppercase tracking-widest hover:bg-blue-400 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150 ${props.disabled && `cursor-not-allowed`} `}
            {...props}
        />
        ):(
    <button
        type={type}
        className={`${className} flex items-center px-4 py-2 bg-primaryBlue border border-transparent rounded-md font-semibold text-xs text-white text-center justify-center uppercase tracking-widest hover:bg-blue-400 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150 ${props.disabled && `cursor-not-allowed`}`}
        {...props}
    />
    )
)

export default Button
