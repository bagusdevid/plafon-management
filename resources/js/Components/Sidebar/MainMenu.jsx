import {MdDashboard, MdLogout} from "react-icons/md";
import {FaSitemap} from "react-icons/fa6";
import {HiUsers} from "react-icons/hi2";
import {Link, usePage} from "@inertiajs/react";
import {PiDog, PiDogBold} from "react-icons/pi";
import {IoChevronDown, IoChevronForward} from "react-icons/io5";
import {useState} from "react";
import {GoTasklist} from "react-icons/go";

export function MainMenu() {

    const {url: inertiaUrl} = usePage()

    // console.log(inertiaUrl)

    const [menuToggle, setMenuToggle] = useState(0)

    const menus = [
        {label: 'Dashboard', url: '/', icon: <MdDashboard />, method: 'get', children: []},
        {label: 'Sheeps', url: '#', icon: <PiDogBold />, method: 'get', children: [
                {label: 'All Sheeps', url: '/sheeps'},
                {label: 'Broadcast', url: '/broadcast'},
            ]},
        {label: 'Sites', url: '/sites', icon: <FaSitemap />, method: 'get', children: []},
        {label: 'Tasks', url: '/tasks', icon: <GoTasklist />, method: 'get', children: []},
        {label: 'Users', url: '/users', icon: <HiUsers />, method: 'get', children: []},
        {label: 'Logout', url: '/logout', icon: <MdLogout />, method: 'post', children: []},
    ]

    const handleMenuToggle = (key) => {
        if(menuToggle === key) {
            setMenuToggle(0)
        } else {
            setMenuToggle(key)
        }
    }

    const urlPrefixMatch = (url, prefix) => {
        const pattern = new RegExp(`^${prefix}`);
        if(prefix === '/') return false;
        return pattern.test(url);
    }

    return <div className="px-8 py-10">
        {menus.map((menu, key) => {

            if(menu.children.length > 0) {
                return <div key={key}>
                <button
                    onClick={() => handleMenuToggle(key+1)}
                    type="button"
                    className={`flex items-center text-left duration-300 rounded-md px-3 py-2 mb-[2px] group ${inertiaUrl === menu.url ? 'bg-slate-900' : ''} hover:bg-slate-900 cursor-pointer w-full`}>
                        <div className={`w-[30px] ${inertiaUrl === menu.url ? 'text-slate-300' : 'text-slate-600'} group-hover:text-slate-300`}>
                            {menu.icon}
                        </div>
                        <div className={`flex-1 font-medium ${inertiaUrl === menu.url ? 'text-white/90' : 'text-white/70'} group-hover:text-white/90`}>
                            {menu.label}
                        </div>
                        <div>
                            {menuToggle === key+1 || ['/sheeps','/broadcast'].includes(inertiaUrl) ? <IoChevronDown /> : <IoChevronForward />}
                        </div>
                </button>
                <ul className={`duration-300 ${menuToggle === key+1 || ['/sheeps','/broadcast'].includes(inertiaUrl) ? 'h-auto' : 'h-0'} overflow-hidden`}>
                    {menu.children.map((child, k) => {
                        return <li key={k} className="">
                            <Link preserveState href={child.url} className={`block text-[14px] pl-[42px] pr-3 py-[6px] ${inertiaUrl === child.url || urlPrefixMatch(inertiaUrl, child.url) ? 'bg-slate-900' : ''} hover:bg-slate-900 rounded-md mb-[2px]`}>
                                {child.label}
                            </Link>
                        </li>
                    })}
                </ul>
                </div>
            }

            return <Link href={menu.url} key={key} method={menu.method} className={`flex items-center duration-300 rounded-md px-3 py-2 mb-[2px] group ${inertiaUrl === menu.url || urlPrefixMatch(inertiaUrl, menu.url) ? 'bg-slate-900' : ''} hover:bg-slate-900 cursor-pointer w-full`}>
                <div className={`w-[30px] ${inertiaUrl === menu.url ? 'text-slate-300' : 'text-slate-600'} group-hover:text-slate-300`}>
                    {menu.icon}
                </div>
                <div className={`font-medium ${inertiaUrl === menu.url ? 'text-white/90' : 'text-white/70'} group-hover:text-white/90`}>
                    {menu.label}
                </div>
            </Link>
        })}
    </div>
}
