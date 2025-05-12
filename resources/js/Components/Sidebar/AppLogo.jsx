import {IoSkullOutline} from "react-icons/io5";

export function AppLogo() {
    return <div className="border-b border-solid border-b-slate-800 px-5 py-8">
        <div className="flex items-center">
            <div className="w-[72px]">
                <div className="text-[60px]">
                    <IoSkullOutline />
                </div>
            </div>
            <div>
                <div className="uppercase text-center">
                    <div className="text-[38px] font-bold text-white/90 leading-9">plafon</div>
                    <div className="text-[15px] font-light tracking-[5px]">management</div>
                </div>
            </div>
        </div>
    </div>
}
