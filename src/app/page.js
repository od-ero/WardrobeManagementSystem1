'use client';  // Add this at the top of the file to mark it as a Client Component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth';

const MyComponent = () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

  useEffect(() => {
        if (isAuthenticated) {
            router.push('/home');  // Redirect to /home if authenticated
        } else {
            router.push('/login'); // Redirect to /login if not authenticated
        }
    }, [isAuthenticated, router]);

    return null; // Render nothing while handling the redirect
};

export default MyComponent;
