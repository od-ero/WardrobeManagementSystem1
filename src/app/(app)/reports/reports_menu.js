import { Header } from '@/app/commonVariable';
import MenuCard, { MenuCardBody, MenuLink} from '@/components/menu/MenuCard'
const UsersMenu = () => {
    return (


        <div>

            <MenuCard title={`Users`}>
                {/* Users Information Section */}
                <MenuCardBody title ={`Logs`}>
                    <MenuLink href={`/reports/login_logs/list`}
                              label= {`Logins Logs`}/>
                    <MenuLink href={`/users/list-inactive`}
                              label= {`List Inactive Users`}/>
                    <MenuLink href={`#`}
                              label= {`List User Roles`}/>

                </MenuCardBody>

            </MenuCard>

        </div>
    )

};

export default UsersMenu
