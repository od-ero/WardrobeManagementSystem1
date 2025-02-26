/*
"use client";

import { createContext, useContext } from "react";
import { useAuth} from '@/hooks/auth'

const PermissionsContext = createContext({ permissions: [] });
export const PermissionsProvider = ({ children }/!*: { children: React.ReactNode }*!/) => {

    const {user} = useAuth();


    return (
        <PermissionsContext.Provider value={ user?.permissions }>
            {children}
        </PermissionsContext.Provider>
    );
};

export const usePermissions = () => useContext(PermissionsContext);
*/

"use client";

import { createContext, useContext } from "react";
import { useAuth } from "@/hooks/auth";

const PermissionsContext = createContext({ permissions: [] });

export const PermissionsProvider = ({ children }) => {
    const { user } = useAuth();

    return (
        <PermissionsContext.Provider value={{ permissions: user?.permissions || [] }}>
            {children}
        </PermissionsContext.Provider>
    );
};

export const usePermissions = () => useContext(PermissionsContext);
