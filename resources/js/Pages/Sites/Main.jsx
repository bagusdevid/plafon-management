import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import {useMemo, useState} from "react";
import {Button, Input, Field, Group, Stack, Badge} from "@chakra-ui/react";
import {Link, useForm} from "@inertiajs/react";
import {FaEdit, FaPlus, FaTrashAlt} from "react-icons/fa";
import DataTable from "react-data-table-component";
import dataTable from "@/Utils/dataTable";
import {CustomField, Modal} from "@/Components/Forms/index.jsx";
import {IoMdRefresh} from "react-icons/io";

function Action({onEdit, onDelete}) {
    return <div className="flex gap-3">
        <button onClick={onEdit} className="cursor-pointer">
            <FaEdit />
        </button>
        <Delete item={onDelete} />
    </div>
}

function Active({isActive}) {
    return <Badge colorPalette={isActive ? 'green' : 'red'}>{isActive ? 'true' : 'false'}</Badge>
}

export default function Main({sites}) {

    const columns = [
        {name: '', cell: (row, index) => index + 1, grow: 0, width: '60px'},
        {name: 'Name', selector: row => row.name, sortable: true},
        {name: 'Domain', selector: row => row.domain, sortable: true},
        {name: 'Active', selector: row => row.active, sortable: true, width: '120px'},
        {name: '', selector: row => row.action, width: '140px'},
    ];

    const mapped = sites.map(site => {
        return {
            id: site.id,
            no: site.id,
            name: site.name,
            domain: site.domain,
            active: <Active isActive={site.active} />,
            action: <Action onEdit={() => handleEdit(site)} onDelete={site} />
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
        domain: '',
        activation_code: '',
    }
    const dataForm = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault()
        console.log(dataForm.data)
        dataForm.post('/sites', {
            onSuccess: () => setOpen(false)
        })
    }

    const handleGenerateCode = () => {
        axios.post('/sites/activation-code', {})
            .then(res => {
                dataForm.setData('activation_code', res.data.results)
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
        dataForm.put(`/mng/vendors/${singleField.id}`, {
            onSuccess: () => {
                dataForm.setData(initialValues)
                setSingleField({...singleField, id: null})
                disclosure.onClose()
            },
        })
    }

    const handleCloseModal = () => {
        dataForm.setData(initialValues)
        dataForm.clearErrors();
        setIsEdit(false)
        setSingleField({id: null, name: ''})
    }

    return <AppLayout title="Sites">
        <PageTitle>
            Sites
        </PageTitle>
        <div className="mb-2 flex justify-between items-center">
            <div className="flex gap-2">
                <div>
                    <CreateNew
                        dataForm={dataForm}
                        onSubmit={isEdit ? editSubmit : submit}
                        onGenerateCode={handleGenerateCode}
                        trigger={{open, setOpen}}
                        onExit={handleCloseModal}
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

function Delete({item}) {
    return <Modal
        title="Delete"
        trigger={<Button type="button" unstyled className="cursor-pointer"><FaTrashAlt /></Button>}
        size="xs"
        role="alertdialog"
        onSubmit={() => console.log('ok')}
    >
        Are you sure want to delete record <strong>{item.name}</strong>?
    </Modal>
}

function CreateNew({dataForm, onSubmit, onGenerateCode, onExit, trigger}) {
    return <Modal
        title="Create record"
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
                        placeholder="Enter name of site"
                    />
                    {dataForm.errors.name ? <Field.ErrorText>{dataForm.errors.name}</Field.ErrorText> : ''}
                </div>
            </CustomField>
            <CustomField label="Domain" orientation="horizontal" invalid={dataForm.errors.domain}>
                <div className="flex-1">
                    <Input
                        value={dataForm.data.domain}
                        onChange={(e) => dataForm.setData('domain', e.target.value)}
                        type="text"
                        placeholder="https://"
                    />
                    {dataForm.errors.domain ? <Field.ErrorText>{dataForm.errors.domain}</Field.ErrorText> : ''}
                </div>
            </CustomField>
            <CustomField label="Activation code" orientation="horizontal" invalid={dataForm.errors.activation_code}>
                <div className="flex-1">
                    <Group attached w="full" maxW="sm">
                        <Button
                            onClick={onGenerateCode}
                            type="button"
                            variant="solid"
                            className="bg-slate-700"
                        >
                            <IoMdRefresh />
                        </Button>
                        <Input
                            value={dataForm.data.activation_code}
                            onChange={(e) => dataForm.setData('activation_code', e.target.value)}
                            flex="1"
                            placeholder="Enter code"
                        />
                    </Group>
                    {dataForm.errors.activation_code ? <Field.ErrorText>{dataForm.errors.activation_code}</Field.ErrorText> : ''}
                </div>
            </CustomField>
        </Stack>
    </Modal>
}
