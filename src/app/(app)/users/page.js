import MenuCard, { MenuCardBody, MenuLink } from '@/components/menu/MenuCard';
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

            </MenuCard>

        </div>
    )

};

export default UsersMenu
