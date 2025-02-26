import MenuCard, { MenuCardBody, MenuLink } from '@/components/menu/MenuCard';
const HomeMenu = () => {
    return (


        <div>

            <MenuCard title={`Home`}>
                {/* Users Information Section */}
                     <MenuCardBody title ={`Users`}>
                     <MenuLink href={`/users/list-active`}
                         label= {`List Active Users`}/>
                     <MenuLink href={`/users/list-inactive`}
                              label= {`List Inactive Users`}/>
                         <MenuLink href={`/users/create`}
                                   label= {`Add New User`}/>

                </MenuCardBody>
                <MenuCardBody title ={`Wardrobe`}>
                    <MenuLink href={`/wardrobe/list-active`}
                              label= {`List Items`}/>
                   
                    <MenuLink href={`/wardrobe/create`}
                              label= {`Add Item`}/>
                      
                    <MenuLink href={`/wardrobe/list-inactive`}
                              label= {`List Deleted Items`}/>

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

export default HomeMenu;
