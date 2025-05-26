import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import {useMemo, useState} from "react";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import {Input} from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import dataTable from "@/Utils/dataTable.js";
import DeleteModal from "@/Components/DeleteModal.jsx";
import {FaRegFileLines} from "react-icons/fa6";
import thousandSeparator from "@/Utils/thousand-separator.js";

function Action({item, deleteUrl, onDetail}) {
    return <div className="flex gap-3">
        <button onClick={onDetail} className="cursor-pointer" title="Edit">
            <FaRegFileLines />
        </button>
        <button className="cursor-pointer">
            <FaEdit />
        </button>
        <DeleteModal label={`${item.name} (${item.username})`} id={item.id} url={deleteUrl} />
    </div>
}

export default function Sheep({sheeps}) {

    const columns = [
        {name: '', cell: (row, index) => index + 1, grow: 0, width: '60px'},
        {name: 'Username', selector: row => row.username, sortable: true},
        {name: 'Nama lengkap', selector: row => row.name, sortable: true},
        {name: 'Saldo', selector: row => row.balance, sortable: true},
        {name: 'Kredit', selector: row => row.credit, sortable: true},
        {name: '', selector: row => row.action, width: '140px'},
    ];

    const mapped = sheeps.map(sheep => {
        return {
            id: sheep.id,
            no: sheep.id,
            username: sheep.username,
            name: sheep.name,
            balance: thousandSeparator(sheep.balance),
            credit: sheep.credit,
            action: <Action
                item={sheep}
                deleteUrl={`/sheep/${sheep.id}`}
                onDetail={() => handleDetail(sheep)}
            />
        }
    })

    const [filterText, setFilterText] = useState('');

    const filteredItems = useMemo(() => {
        return mapped.filter(item => {
            const searchableValues = Object.values(item).join(' ').toLowerCase();
            return searchableValues.includes(filterText.toLowerCase());
        });
    }, [mapped, filterText]);

    const handleDetail = (sheep) => {

    }

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

        <div className="border border-solid border-neutral-300">
            <DataTable
                columns={columns}
                data={filteredItems}
                persistTableHead
                pagination
                customStyles={dataTable.customStyle}
            />
        </div>
    </AppLayout>
}
