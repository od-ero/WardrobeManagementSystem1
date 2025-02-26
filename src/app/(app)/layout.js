'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/Navigation'
import Loading from '@/app/(app)/Loading'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { PermissionsProvider } from '@/lib/permissions';
const AppLayout = ({ children, metadata }) => {
    const { user } = useAuth({ middleware: 'auth' });
    const [menuLink, setMenuLink] = useState(null);
    const [menuLinkBody, setMenuLinkBody] = useState(null);
    const [menuLinkTitle, setMenuLinkTitle] = useState(null);
    const [menuLinkComponent, setMenuLinkComponent ] = useState(null);
    const router = useRouter();

    const onSelectMenuLink = (menuLink, menuLinkBody,  menuLinkTitle) => {
        setMenuLink(menuLink);
        setMenuLinkBody(menuLinkBody);
        setMenuLinkTitle(menuLinkTitle);
    };

    useEffect(() => {
        if (menuLink && menuLinkBody) {
            // Dynamically import the component based on the menu link
            import(`@/app/(app)/${menuLinkBody}`)
                .then((module) => {
                    setMenuLinkComponent(() => module.default);

                    if (typeof window !== 'undefined' && router?.replace) {
                        router.replace(`${menuLink}`, undefined, { shallow: true });
                    }

                    // Update the document title
                    document.title = menuLinkTitle || 'Menu Page';
                })
                .catch(() => {
                    setMenuLinkComponent(() => () => "Menu not found");


                    document.title = "404 - Menu Not Found";
                });
        } else {
            // Clear the component if no menu link is provided
            setMenuLinkComponent(null);
        }
    }, [menuLink, menuLinkBody, menuLinkTitle, router]);



    if (!user) {
        return <Loading />;
    }


    return (
        <div className="min-h-screen bg-white">
            <Navigation
                user={user}
                onSelectMenuLink={(menuLink, menuLinkBody, menuLinkTitle) => {
                    setMenuLink(menuLink);
                    setMenuLinkBody(menuLinkBody);
                    setMenuLinkTitle(menuLinkTitle);
                }}
            />  {/* Passing the user object to Navigation component */}

            <main>
                <div
                    className="absolute left-0 top-14 sm:top-28 sm:left-60 right-0 sm:w-[calc(100%-15rem)] bottom-0 pb-20 overflow-y-scroll border-2 border-gray-100">
                    <PermissionsProvider>
                    {menuLinkComponent ? React.createElement(menuLinkComponent) : children}
                    </PermissionsProvider>
                    {/* Rendering children passed to the layout */}


                </div>

            </main>
        </div>
    );
};

export default AppLayout

