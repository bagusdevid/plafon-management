import {Head} from "@inertiajs/react";
import {AppLogo, MainMenu} from "@/Components/Sidebar/index.jsx";
import {FaBars, FaRegCircleUser} from "react-icons/fa6";
import { Button, Menu, Portal } from "@chakra-ui/react"
import {useContext} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";

export default function AppLayout({title = 'Default', children}) {

    const {auth} = useContext(LayoutContext)

    return <>
        <Head title={title} />
        <div>
            <div className="fixed left-0 top-0 h-full w-[300px] bg-slate-950 text-white/60">
                <AppLogo />
                <MainMenu />
            </div>
            <div className="fixed right-0 top-0 flex justify-between items-center px-5 h-[55px] w-[calc(100%_-_300px)] bg-neutral-100 border-b border-solid border-b-neutral-300">
                <div>
                    <FaBars />
                </div>
                <div>
                    <RightMenu label={auth.user.name} />
                </div>
            </div>
            <div className="w-[calc(100%_-_300px)] ml-[300px] pt-[95px] px-12 pb-10">
                {children}
            </div>
        </div>
    </>
}

function RightMenu({label}) {
    return <Menu.Root>
        <Menu.Trigger asChild>
            <Button size="sm" colorPalette="gray" variant="surface">
                <FaRegCircleUser /> {label}
            </Button>
        </Menu.Trigger>
        <Portal>
            <Menu.Positioner>
                <Menu.Content>
                    <Menu.ItemGroup>
                        <Menu.Item value="new-txt">Profile</Menu.Item>
                        <Menu.Item value="new-txt2">Change Password</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.Separator />
                    <Menu.ItemGroup>
                        <Menu.Item value="export">Logout</Menu.Item>
                    </Menu.ItemGroup>
                </Menu.Content>
            </Menu.Positioner>
        </Portal>
    </Menu.Root>
}
