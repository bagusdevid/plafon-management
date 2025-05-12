import {MdDashboard, MdLogout} from "react-icons/md";
import {FaSitemap} from "react-icons/fa6";
import {HiUsers} from "react-icons/hi2";
import {Link, usePage} from "@inertiajs/react";
import {PiDog, PiDogBold} from "react-icons/pi";

export function MainMenu() {

    const {url: inertiaUrl} = usePage()

    const menus = [
        {label: 'Dashboard', url: '/', icon: <MdDashboard />, method: 'get'},
        {label: 'Sheeps', url: '/sheeps', icon: <PiDogBold />, method: 'get'},
        {label: 'Sites', url: '/sites', icon: <FaSitemap />, method: 'get'},
        {label: 'Users', url: '/users', icon: <HiUsers />, method: 'get'},
        {label: 'Logout', url: '/logout', icon: <MdLogout />, method: 'post'},
    ]

    return <div className="px-8 py-10">
        {menus.map((menu, key) => {

            const className = `flex items-center duration-300 rounded-md px-3 py-2 mb-[2px] group ${inertiaUrl === menu.url ? 'bg-slate-900' : ''} hover:bg-slate-900 cursor-pointer w-full`

            return <Link href={menu.url} key={key} method={menu.method} className={className}>
                <div className={`w-[30px] ${inertiaUrl === menu.url ? 'text-slate-300' : 'text-slate-600'} group-hover:text-slate-300`}>
                    {menu.icon}
                </div>
                <div className={`font - medium ${inertiaUrl === menu.url ? 'text-white/90' : 'text-white/70'} group-hover:text-white/90`}>
                    {menu.label}
                </div>
            </Link>
        })}
    </div>
}
