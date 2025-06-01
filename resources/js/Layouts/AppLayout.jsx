import {Head, Link} from "@inertiajs/react";
import {AppLogo, MainMenu} from "@/Components/Sidebar/index.jsx";
import {FaBars, FaRegCircleUser} from "react-icons/fa6";
import { Button, Menu, Portal } from "@chakra-ui/react"
import {useContext, useEffect, useState} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import FloatingMessage from "@/Components/FloatingMessage.jsx";

export default function AppLayout({title = 'Default', children}) {

    const {flashMessage, auth} = useContext(LayoutContext)

    const [alert, setAlert] = useState({
        show: false,
        status: 'success',
        message: ''
    })

    useEffect(() => {
        if(flashMessage) {

            setAlert({show: true, status: 'success', message: flashMessage})

            const timeoutId = setTimeout(() => {
                setAlert({show: false, status: 'success', message: flashMessage})
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [flashMessage])

    return <>
        <FloatingMessage
            show={alert.show}
            status={alert.status}
        >
            {alert.message}
        </FloatingMessage>
        <Head title={title} />
        <div>
            <div className="fixed -left-[300px] lg:left-0 top-0 h-full w-[300px] bg-slate-950 text-white/60">
                <AppLogo />
                <MainMenu />
            </div>
            <div className="fixed z-10 right-0 top-0 flex justify-between items-center px-5 h-[55px] w-full lg:w-[calc(100%_-_300px)] bg-neutral-100 border-b border-solid border-b-neutral-300">
                <div>
                    <FaBars />
                </div>
                <div>
                    <RightMenu label={auth.user.name} />
                </div>
            </div>
            <div className="w-full lg:w-[calc(100%_-_300px)] ml-0 lg:ml-[300px] pt-[75px] lg:pt-[95px] px-6 lg:px-12 pb-5 lg:pb-10">
                {children}
            </div>
        </div>
    </>
}

function RightMenu({label}) {
    return <Menu.Root positioning={{ placement: "bottom-end" }}>
        <Menu.Trigger asChild>
            <Button size="sm" colorPalette="gray" variant="surface">
                <FaRegCircleUser /> {label}
            </Button>
        </Menu.Trigger>
        <Portal>
            <Menu.Positioner>
                <Menu.Content>
                    <Menu.ItemGroup>
                        <Menu.Item value="/profile">
                            <Link href="/profile">
                                Profile
                            </Link>
                        </Menu.Item>
                        <Menu.Item value="/chang-password">
                            <Link href="/change-password">
                                Change Password
                            </Link>
                        </Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.Separator />
                    <Menu.ItemGroup>
                        <Menu.Item value="export">
                            <Link href="/logout" method="post" as="button">
                                Logout
                            </Link>
                        </Menu.Item>
                    </Menu.ItemGroup>
                </Menu.Content>
            </Menu.Positioner>
        </Portal>
    </Menu.Root>
}
