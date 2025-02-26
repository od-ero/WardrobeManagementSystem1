//Sidebar.js
import { SidebarLinks, SidebarLinksSmall } from '@/components/SidebarLinks';


const Sidebar = ({openSidebar, logOut}) => {

    return (
        <div className="flex ">
            {/*main Sidebar */}
            <div className={`bg-white text-gray-900 hidden sm:block
                    fixed transition-all top-28 duration-300 border-r-2 overflow-y-auto w-60 max-h-screen`
            } >
                {/* Sidebar content */}
                <div className="flex flex-col mb-10">
                   <>
                    <SidebarLinks href="/wardrobe/create" label="Add Item" />

                   <SidebarLinks href="/wardrobe/list-active" label="List Items" />

                    <SidebarLinks href="/users/create" label="Add User" />
                    <SidebarLinks href="/users/list-active" label="List Users" /> 
                        </>
                      
                    {/* <button  onClick={() => {
                        logOut();
                    }}>Log Out</button> */}


                    <div className="h-28">

                    </div>
                </div>
            </div>


            {/*small screen Sidebar */}
            <div
                className={`bg-gray-800 text-white
                    fixed top-14 h-screen transition-all
                    duration-300 z-10 border-r-2 overflow-y-scroll xxsm:xxhidden
                    ${openSidebar ? 'w-30' : 'w-0 '
                }`}>
                {/* Sidebar content */}
                <div className="flex flex-col mb-2 text-white">
                     <>
                    <SidebarLinksSmall href="/home" label="Home" />

                    <SidebarLinksSmall href="/users" label="Users" />

                    <SidebarLinksSmall href="/wardrobe" label="Wardrobe" />

                </>
                    <button onClick={() => {
                        logOut()
                    }}>Log Out
                    </button>
                    <div className="h-14">

                    </div>
                </div>

            </div>

            <style jsx>{`
                ::-webkit-scrollbar {
                    width: 4px;
                    ! *Width of the scrollbar *!
                    height: 4px;
                    ! *Height for horizontal scrollbar *!
                }

                ::-webkit-scrollbar-thumb {
                    background: #888;
                    ! *Thumb color *!
                    border-radius: 4px;
                    ! *Rounded corners *!
                }

                ::-webkit-scrollbar-track {
                    background: #f0f0f0;
                    ! *Track background color *!
                }

                !
                * For Firefox *!
                .scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #888 #f0f0f0;
                }

            `}</style>
        </div>

    );
};

export default Sidebar;
