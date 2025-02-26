import MenuCard, { MenuCardBody, MenuLink } from '@/components/menu/MenuCard';
const WardrobeMenu = () => {
    return (


        <div>

            <MenuCard title={`Wardrobe`}>
               
                <MenuCardBody title ={`Wardrobe`}>
                    <MenuLink href={`/wardrobe/list-active`}
                              label= {`List Items`}/>
                   
                    <MenuLink href={`/wardrobe/create`}
                              label= {`Add Item`}/>
                      
                    <MenuLink href={`/wardrobe/list-inactive`}
                              label= {`List Deleted Items`}/>

                </MenuCardBody>

            </MenuCard>

        </div>
    )

};

export default WardrobeMenu;
