import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import {useMemo, useState} from "react";
import {Badge, Button, Field, Group, Checkbox, Input, Stack} from "@chakra-ui/react";
import {Link, useForm} from "@inertiajs/react";
import {FaEdit, FaPlus, FaTrashAlt} from "react-icons/fa";
import DataTable from "react-data-table-component";
import dataTable from "@/Utils/dataTable";
import {CustomField, Modal} from "@/Components/Forms/index.jsx";
import {IoMdRefresh} from "react-icons/io";

function Action({onEdit, itemDelete}) {
    return <div className="flex gap-3">
        <button onClick={onEdit} className="cursor-pointer">
            <FaEdit />
        </button>
        <Delete item={itemDelete} />
    </div>
}

function Active({isActive}) {
    return <Badge colorPalette={isActive ? 'green' : 'red'}>{isActive ? 'true' : 'false'}</Badge>
}

export default function Main({users}) {

    // console.log(users)

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
            active: <Active isActive={user.active} />,
            action: <Action
                onEdit={() => handleEdit(user)}
                itemDelete={user}
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

    const [open, setOpen] = useState(false)

    const initialValues = {
        name: '',
        email: '',
        password: '',
        active: true
    }
    const dataForm = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault()
        console.log(dataForm.data)
        dataForm.post('/users', {
            onSuccess: () => setOpen(false)
        })
    }

    const handleGenerateCode = () => {
        axios.post('/users/random-passwd', {})
            .then(res => {
                dataForm.setData('password', res.data.results)
            })
            .catch(err => console.log(err))
    }

    const [isEdit, setIsEdit] = useState(false)
    const [singleField, setSingleField] = useState({
        id: null,
        name: ''
    })

    const handleEdit = (obj) => {
        const {id} = obj;
        setIsEdit(true)
        setSingleField({...singleField, id})
        dataForm.setData(obj)
        setOpen(true)
    }

    const editSubmit = (e) => {
        e.preventDefault()
        dataForm.put(`/users/${singleField.id}`, {
            onSuccess: () => {
                dataForm.setData(initialValues)
                setSingleField({...singleField, id: null})
                setOpen(false)
            },
        })
    }

    const handleCloseModal = () => {
        dataForm.setData(initialValues)
        dataForm.clearErrors();
        setIsEdit(false)
        setSingleField({id: null, name: ''})
    }

    return <AppLayout title="Users">
        <PageTitle>
            Users
        </PageTitle>
        <div className="mb-2 flex justify-between items-center">
            <div className="flex gap-2">
                <div>
                    <FormModal
                        dataForm={dataForm}
                        onSubmit={isEdit ? editSubmit : submit}
                        onGenerateCode={handleGenerateCode}
                        trigger={{open, setOpen}}
                        onExit={handleCloseModal}
                        isEdit={isEdit}
                    />
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

function FormModal({dataForm, onSubmit, isEdit, onGenerateCode, onExit, trigger}) {
    return <Modal
        title={isEdit ? 'Edit' : 'Create'}
        trigger={<Button type="button">Create record</Button>}
        onSubmit={onSubmit}
        onExitComplete={onExit}
        size="md"
        lazyMount open={trigger.open} onOpenChange={(e) => trigger.setOpen(e.open)}
    >
        <Stack gap={3} css={{ "--field-label-width": "120px" }}>
            <CustomField label="Name" orientation="horizontal" invalid={dataForm.errors.name}>
                <div className="flex-1">
                    <Input
                        value={dataForm.data.name}
                        onChange={(e) => dataForm.setData('name', e.target.value)}
                        type="text"
                        placeholder="Enter your name"
                    />
                    {dataForm.errors.name ? <Field.ErrorText>{dataForm.errors.name}</Field.ErrorText> : ''}
                </div>
            </CustomField>
            <CustomField label="Email" orientation="horizontal" invalid={dataForm.errors.email}>
                <div className="flex-1">
                    <Input
                        value={dataForm.data.email}
                        onChange={(e) => dataForm.setData('email', e.target.value)}
                        type="text"
                        placeholder="Enter email"
                    />
                    {dataForm.errors.email ? <Field.ErrorText>{dataForm.errors.email}</Field.ErrorText> : ''}
                </div>
            </CustomField>
            {isEdit ? '' : <Field.Root orientation="horizontal" invalid={dataForm.errors.password}>
                <Field.Label>
                    Password <button type="button" onClick={onGenerateCode}><IoMdRefresh /></button>
                </Field.Label>
                <div className="flex-1">
                        <Input
                            value={dataForm.data.password}
                            onChange={(e) => dataForm.setData('password', e.target.value)}
                            type="password"
                            flex="1"
                            placeholder="Enter password"
                        />
                    {dataForm.errors.password ? <Field.ErrorText>{dataForm.errors.password}</Field.ErrorText> : ''}
                </div>
            </Field.Root>}
            <CustomField label="Active" orientation="horizontal">
                <div className="flex-1">
                    <Checkbox.Root
                        checked={dataForm.data.active}
                        onCheckedChange={(e) => dataForm.setData('active', !!e.checked)}
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>Ya</Checkbox.Label>
                    </Checkbox.Root>
                </div>
            </CustomField>
        </Stack>
    </Modal>
}

function Delete({item}) {

    const {delete: destroy} = useForm({id: item.id});
    const [open, setOpen] = useState(false)

    return <Modal
        title="Delete"
        trigger={<Button type="button" unstyled className="cursor-pointer"><FaTrashAlt /></Button>}
        size="xs"
        role="alertdialog"
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        onSubmit={(e) => {
            e.preventDefault();
            destroy(`/users/${item.id}`, {
                onSuccess: () => setOpen(false)
            })
        }}
    >
        Are you sure want to delete record <strong>{item.name}</strong>?
    </Modal>
}
