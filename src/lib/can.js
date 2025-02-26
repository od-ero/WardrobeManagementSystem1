import { usePermissions } from '@/lib/permissions'

export const can = (module, permission) => {
    const { permissions } = usePermissions();
    console.log('per  :'+ permissions);

   return permissions?.module?.includes(permission);
};
