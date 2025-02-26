import { Header } from '@/app/commonVariable';
import MenuCard, { MenuCardBody, MenuLink} from '@/components/menu/MenuCard'
const UsersMenu = () => {
    return (


        <div>

            <MenuCard title={`Users`}>
                {/* Users Information Section */}
                     <MenuCardBody title ={`Users Information`}>
                     <MenuLink href={`/users/list-active`}
                         label= {`List Active Users`}/>
                     <MenuLink href={`/users/list-inactive`}
                              label= {`List Inactive Users`}/>
                     <MenuLink href={`#`}
                              label= {`List User Roles`}/>

                </MenuCardBody>

                {/* Users Action Section */}
                <MenuCardBody title ={`Users Actions`}>
                    <MenuLink href={`/users/create`}
                              label= {`Add New User`}/>
                    <MenuLink href={`#`}
                              label= {`Add New Role`}/>
                </MenuCardBody>


                {/* Users Permission & Roles Section */}

                <MenuCardBody title ={` Users Permission & Roles`}>
                    <MenuLink href={`/users/list`}
                              label= {`List Active Users`}/>
                    <MenuLink href={`/users/list-deleted`}
                              label= {`List Inactive Users`}/>
                    <MenuLink href={`#`}
                              label= {`List User Roles`}/>
                </MenuCardBody>

            </MenuCard>

        </div>
    )

};

export default UsersMenu
