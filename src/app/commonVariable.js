export const getPageTitle = (pageTitle ) => {
    const systemName = process.env.PUBLIC_SYSTEM_NAME;
    return `${pageTitle} | ${systemName}`;
};


export const Header = ({ title }) => {
    return (
        <header className="bg-white shadow">

            <div className="py-3 ">

                <h2 className="flex font-semibold text-xl text-black leading-tight items-center justify-center ">
                    { title }
                </h2>
            </div>

        </header>
    )
};

//export default Header


