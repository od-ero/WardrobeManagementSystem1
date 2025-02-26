import MenuCard, { MenuCardBody, MenuLink} from '@/components/menu/MenuCard'
import { useAuth } from '@/hooks/auth'
const Menu = () => {
    const { user } = useAuth()
    return (


        <div>

            <MenuCard title={`Settings`}>

                <MenuCardBody title ={`Organizations`}>
                    <MenuLink href={`/settings/organizations/list-active`}
                              label= {`List Active Organizations`}/>
                    <MenuLink href={`/settings/organizations/create`}
                              label= {`Create An Organization`}/>
                    <MenuLink href={`/settings/organizations/list-inactive`}
                              label= {`Inactive Organizations`}/>
                </MenuCardBody>
                { user?.login_info?.organization_id && (<>
                <MenuCardBody title ={`Branches`}>

                        <MenuLink href={`/settings/organization_branches?org_id=${user?.login_info?.organization_id}`}
                                  label={`List Active Branches`} />
                    <MenuLink href={`/settings/organization_branches/create`}
                              label= {`Create An Organization Branch`}/>

                </MenuCardBody>

                {/* Users Information Section */}
                <MenuCardBody title ={`Devices`}>
                    <MenuLink href={`/settings/devices/list-active`}
                              label= {`List Active Devices`}/>
                    <MenuLink href={`/settings/devices/create`}
                              label= {`Create A Device`}/>
                    <MenuLink href={`/settings/devices/list-inactive`}
                              label= {`Inactive Devices`}/>
                </MenuCardBody>
                </>  )}
            </MenuCard>

        </div>
    )

};

export default Menu
