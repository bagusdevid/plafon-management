import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import {useMemo, useState} from "react";
import {Button, Input} from "@chakra-ui/react";
import {Link} from "@inertiajs/react";
import {FaPlus} from "react-icons/fa";
import DataTable from "react-data-table-component";
import dataTable from "@/Utils/dataTable";

export default function Main({users}) {

    console.log(users)

    const columns = [
        {name: '', cell: (row, index) => index + 1, grow: 0, width: '60px'},
        {name: 'Name', selector: row => row.name, sortable: true, width: '240px'},
        {name: 'Email', selector: row => row.email, sortable: true},
        {name: 'Active', selector: row => row.active, sortable: true},
        {name: '', selector: row => row.action, width: '90px'},
    ];

    const mapped = users.map(user => {
        return {
            id: user.id,
            no: user.id,
            name: user.name,
            email: user.email,
            active: user.active,
            checklist: user.id
        }
    })

    const [filterText, setFilterText] = useState('');

    const filteredItems = useMemo(() => {
        return mapped.filter(item => {
            const searchableValues = Object.values(item).join(' ').toLowerCase();
            return searchableValues.includes(filterText.toLowerCase());
        });
    }, [mapped, filterText]);

    return <AppLayout title="Users">
        <PageTitle>
            Users
        </PageTitle>
        <div className="mb-2 flex justify-between items-center">
            <div className="flex gap-2">
                <div>
                    <Button
                        colorScheme="blue"
                        leftIcon={<FaPlus />}
                        as={Link}
                        href="/attendance-book/create"
                    >
                        Create record
                    </Button>
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
