import background from '../../../public/images/auth/mountain.png'
import Image from 'next/image'

const AuthCard = ({ children }) => (

   <div className="loginwrapper bg-card flex items-center min-h-screen w-full">
        <div className="lg-inner-column  flex w-full flex-wrap justify-center lg:justify-center py-10">
            <Image src={background} alt="image" className="absolute top-0 left-0 w-full h-full" />
            <div className="basis-full lg:basis-1/2 w-full  flex justify-center items-center relative lg:pr-12 xl:pr-20 2xl:pr-[110px] px-5">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-blue-50 shadow-md sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    </div>

)

export default AuthCard
