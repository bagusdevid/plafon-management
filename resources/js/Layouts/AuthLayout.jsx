import {Head} from "@inertiajs/react";
import {IoSkullOutline} from "react-icons/io5";

export default function AuthLayout({title = 'Default', children}) {
    return <>
        <Head title={title} />
        <div className="min-h-screen py-5 lg:py-0 px-5 lg:px-0 flex lg:items-center justify-center w-full bg-slate-900">
            <div className="w-full lg:w-[550px]">
                <div className="mb-5 text-center">
                    <div className="text-white text-[55px] lg:text-[70px]">
                        <IoSkullOutline className="mx-auto" />
                    </div>
                    <div className="text-white text-[26px] lg:text-[32px] uppercase">
                        <span className="font-bold">Plafon</span>
                        <span className="font-thin">Management</span>
                    </div>
                </div>
                <div className="bg-white rounded-xl px-10 py-8">
                    <h2 className="font-bold pb-3 mb-5 border-b border-solid border-b-neutral-300">
                        {title}
                    </h2>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </>
}
