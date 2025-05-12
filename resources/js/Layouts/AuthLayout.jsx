import {Head} from "@inertiajs/react";
import {IoSkullOutline} from "react-icons/io5";

export default function AuthLayout({title = 'Default', children}) {
    return <>
        <Head title={title} />
        <div className="min-h-screen flex items-center justify-center w-full bg-slate-900">
            <div className="w-[550px]">
                <div className="mb-5 text-center">
                    <div className="text-white text-[70px]">
                        <IoSkullOutline className="mx-auto" />
                    </div>
                    <div className="text-white text-[32px] uppercase">
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
