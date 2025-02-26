import { Header } from '@/app/commonVariable';
import MenuCard, { MenuCardBody, MenuLink} from '@/components/menu/MenuCard'
import { can } from "@/lib/can"
const UsersMenu = () => {
    return (


        <div>

            <MenuCard title={`Users`}>
                {/* Users Information Section */}
                     <MenuCardBody title ={`Users`}>
                     <MenuLink href={`/users/list-active`}
                         label= {`List Active Users`}/>
                     <MenuLink href={`/users/list-inactive`}
                              label= {`List Inactive Users`}/>
                         <MenuLink href={`/users/create`}
                                   label= {`Add New User`}/>

                </MenuCardBody>
                <MenuCardBody title ={`Roles And Permission`}>
                    <MenuLink href={`/roles-permissions/list-active`}
                              label= {`List Active Roles`}/>
                    {can("delete-posts") && (
                    <MenuLink href={`/roles-permissions/create`}
                              label= {`Create Role`}/>
                        )}
                    <MenuLink href={`/users/user-organization-branches`}
                              label= {`Assign / Update user Role`}/>

                </MenuCardBody>



                {/* Users Permission & Roles Section */}

               {/* <MenuCardBody title ={` Users Permission & Roles`}>
                    <MenuLink href={`/users/list`}
                              label= {`List Active Users`}/>
                    <MenuLink href={`/users/list-deleted`}
                              label= {`List Inactive Users`}/>
                    <MenuLink href={`#`}
                              label= {`List User Roles`}/>
                </MenuCardBody>*/}

            </MenuCard>

        </div>
    )

};

export default UsersMenu
