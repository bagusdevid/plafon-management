import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import {useMemo, useState} from "react";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import {Input} from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import dataTable from "@/Utils/dataTable.js";

function Action() {
    return <div className="flex gap-3">
        <button className="cursor-pointer">
            <FaEdit />
        </button>
        <button className="cursor-pointer">
            <FaTrashAlt />
        </button>
    </div>
}

export default function Sheep({sheeps}) {

    const columns = [
        {name: '', cell: (row, index) => index + 1, grow: 0, width: '60px'},
        {name: 'Name', selector: row => row.name, sortable: true},
        {name: 'Email', selector: row => row.email, sortable: true},
        {name: 'Phone', selector: row => row.phone, sortable: true},
        {name: '', selector: row => row.action, width: '140px'},
    ];

    const mapped = sheeps.map(sheep => {
        return {
            id: sheep.id,
            no: sheep.id,
            name: sheep.name,
            email: sheep.email,
            phone: sheep.phone,
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

    return <AppLayout title="Sheeps">
        <PageTitle>
            Sheeps
        </PageTitle>
        <div className="mb-2 flex justify-between items-center">
            <div className="flex gap-2">
                <div>

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
