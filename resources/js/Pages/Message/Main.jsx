import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import {Input, Menu, Portal, Button} from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import dataTable from "@/Utils/dataTable.js";
import {useMemo, useState} from "react";
import {FaEdit} from "react-icons/fa";
import {IoChevronDown} from "react-icons/io5";
import {Link} from "@inertiajs/react";

function Action() {
    return <div className="flex gap-3">
        <button className="cursor-pointer">
            <FaEdit />
        </button>
    </div>
}

export default function Main() {

    const messages = [];

    const columns = [
        {name: '', cell: (row, index) => index + 1, grow: 0, width: '60px'},
        {name: 'Subject', selector: row => row.subject, sortable: true},
        {name: 'Created at', selector: row => row.created_at, sortable: true, width: '240px'},
        {name: 'Sent by', selector: row => row.sent_by, sortable: true, width: '160px'},
        {name: '', selector: row => row.action, width: '90px'},
    ];

    const mapped = messages.map(message => {
        return {
            id: message.id,
            no: message.id,
            subject: message.subject,
            created_at: message.created_at,
            sent_by: message.sent_by,
            action: <Action />
        }
    })

    const [filterText, setFilterText] = useState('');

    const filteredItems = useMemo(() => {
        return mapped.filter(item => {
            const searchableValues = Object.values(item).join(' ').toLowerCase();
            return searchableValues.includes(filterText.toLowerCase());
        });
    }, [mapped, filterText]);

    return <AppLayout title="Broadcast">
        <PageTitle>
            Broadcast
        </PageTitle>
        <div className="mb-2 flex justify-between items-center">
            <div className="flex gap-2">
                <div>
                    <Menu.Root>
                        <Menu.Trigger asChild>
                            <Button variant="solid">
                                Create <IoChevronDown />
                            </Button>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content>
                                    <Menu.Item value="/broadcast/create/email">
                                        <Link href="/broadcast/create/email">
                                            By Email
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item value="/broadcast/create/phone">
                                        <Link href="/broadcast/create/phone">
                                            By Phone number
                                        </Link>
                                    </Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                </div>
            </div>
            <div>
                <Input
                    type="text"
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                    placeholder="Search..."
                    bgColor="#fff"
                />
            </div>
        </div>

        <DataTable
            columns={columns}
            data={filteredItems}
            persistTableHead
            pagination
            customStyles={dataTable.customStyle}
        />
    </AppLayout>
}
