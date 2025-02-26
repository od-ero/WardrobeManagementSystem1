'use client'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const NotFoundPage = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>404 - Page Not Found</title>
                <meta name="description" content="The page you are looking for does not exist." />
            </Helmet>
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center pt-8 sm:justify-start sm:pt-0">
                        <div className="px-4 text-lg text-gray-500 border-r border-gray-400 tracking-wider">
                            404
                        </div>
                        <div className="ml-4 text-lg text-gray-500 uppercase tracking-wider">
                         Not Found
                        </div>
                    </div>
                    <div className="ml-4 mt-6 text-lg text-primaryBlue uppercase tracking-wider">
                        <button
                            className="text-primaryBlue hover:underline focus:outline-none"
                            onClick={() => {
                                if (window.history.length > 1) {
                                    window.history.back();
                                } else {
                                    window.location.href = '/home';
                                }
                            }}
                        >
                            {'<<-'} GO BACK
                        </button>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
};

export default NotFoundPage;
