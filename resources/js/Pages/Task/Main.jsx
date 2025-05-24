import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import {Link, useForm} from "@inertiajs/react";
import {useMemo, useRef, useState} from "react";
import {Button, Checkbox, Field, Input, RadioCard, HStack, FileUpload, Stack, NativeSelect} from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import dataTable from "@/Utils/dataTable.js";
import {FaKey, FaPenToSquare, FaPlaneDeparture, FaRegPaperPlane, FaRegTrashCan} from "react-icons/fa6";
import DeleteModal from "@/Components/DeleteModal.jsx";

function Action({item, deleteUrl}) {
    return <div className="flex gap-3">
        <Link href={`/tasks/edit/${item.id}`}>
            <FaPenToSquare />
        </Link>
        <DeleteModal label={item.name} id={item.id} url={deleteUrl} />
    </div>
}

export default function Main({tasks}) {

    // console.log(tasks)

    const columns = [
        {name: '', cell: (row, index) => index + 1, grow: 0, width: '60px'},
        {name: 'Site', selector: row => row.site, sortable: true},
        {name: 'Thumb', selector: row => row.thumb, sortable: true, width: '120px'},
        {name: 'Name', selector: row => row.name, sortable: true},
        {name: 'Options', selector: row => row.options, sortable: true},
        {name: '', selector: row => row.action, width: '140px'},
    ];

    const mapped = tasks.map(task => {
        return {
            id: task.id,
            no: task.id,
            site: task.site.name,
            thumb: <img src={task.photo_thumb_path} alt="" className="w-[60px]" />,
            name: task.name,
            options: task.options.length > 0 ? task.options.map(option => option.label).join(', ') : '-',
            action: <Action
                item={task}
                deleteUrl={`/tasks/${task.id}`}
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

    return <AppLayout title="Task">
        <PageTitle>
            Task
        </PageTitle>
        <div className="mb-2 flex justify-between items-center">
            <div className="flex gap-2">
                <div>
                    <Button as={Link} href="/tasks/create">
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
