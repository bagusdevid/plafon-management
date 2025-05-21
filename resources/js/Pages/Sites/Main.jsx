import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import {useContext, useEffect, useMemo, useState} from "react";
import {Button, Input, Field, Group, Stack, Badge, DataList, Checkbox} from "@chakra-ui/react";
import {Link, useForm} from "@inertiajs/react";
import {FaEdit, FaPlus, FaRegFileAlt, FaTrashAlt} from "react-icons/fa";
import DataTable from "react-data-table-component";
import dataTable from "@/Utils/dataTable";
import {CustomField, Modal} from "@/Components/Forms/index.jsx";
import {IoMdRefresh} from "react-icons/io";
import {BsCodeSquare} from "react-icons/bs";
import DateRange, {DateStart, DateEnd} from "@/Components/DateRange";
import {LayoutContext} from "@/Layouts/Layout.jsx";

function Action({onEdit, itemDelete, invitationSite}) {
    return <div className="flex gap-3">
        <InvitationFormModal site={invitationSite} />
        <button type="button" title="Edit" onClick={onEdit} className="cursor-pointer">
            <FaEdit />
        </button>
        <Delete item={itemDelete} />
    </div>
}

function CustomBadge({isActive, label}) {
    return <Badge colorPalette={isActive ? 'green' : 'red'}>{label}</Badge>
}

export default function Main({sites}) {

    // console.log(sites)

    const {flashData} = useContext(LayoutContext)

    const [createdInvitationModal, setCreatedInvitationModal] = useState(false)
    const [createdInvitationData, setCreatedInvitationData] = useState(null)

    useEffect(() => {
        if(flashData) {
            setCreatedInvitationData(flashData)
            setCreatedInvitationModal(true)
        }
    }, [flashData])

    const columns = [
        {name: '', cell: (row, index) => index + 1, grow: 0, width: '60px'},
        {name: 'Name', selector: row => row.name, sortable: true},
        {name: 'Domain', selector: row => row.domain, sortable: true},
        {name: 'Invitation codes', selector: row => row.invitation_codes, sortable: true},
        {name: 'Active', selector: row => row.active, sortable: true, width: '120px'},
        {name: '', selector: row => row.action, width: '140px'},
    ];

    const mapped = sites.map(site => {
        return {
            id: site.id,
            no: site.id,
            name: <Link href={`/sites/advanced/${site.id}`} className="text-blue-500 underline">{site.name}</Link>,
            domain: site.domain,
            invitation_codes: <InvitationListModal codes={site.invitations} />,
            active: <CustomBadge isActive={site.active} label={site.active ? 'active' : 'inactive'} />,
            action: <Action
                onEdit={() => handleEdit(site)}
                itemDelete={site}
                invitationSite={site}
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
        domain: '',
        activation_code: '',
        active: true,
    }
    const dataForm = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault()
        // console.log(dataForm.data)
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
        dataForm.put(`/sites/${singleField.id}`, {
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

    return <AppLayout title="Sites">
        <PageTitle>
            Sites
        </PageTitle>

        <InvitationAddedModal
            open={createdInvitationModal}
            setOpen={setCreatedInvitationModal}
            data={createdInvitationData}
        />

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
            destroy(`/sites/${item.id}`, {
                onSuccess: () => setOpen(false)
            })
        }}
    >
        Are you sure want to delete record <strong>{item.name}</strong>?
    </Modal>
}

function InvitationListModal({codes}) {

    const columns = [
        {name: '', cell: (row, index) => index + 1, grow: 0, width: '50px'},
        {name: 'Code', selector: row => row.code, sortable: true},
        {name: 'Valid from', selector: row => row.valid_start, sortable: true, width: '140px'},
        {name: 'Valid end', selector: row => row.valid_end, sortable: true, width: '140px'},
        {name: 'URL Referral', selector: row => row.referral, sortable: true, width: '280px'},
        {name: '', selector: row => row.action, width: '60px'},
    ]

    const mapped = codes.map(cd => {
        return {
            id: cd.id,
            no: cd.id,
            code: <>{cd.code} <CustomBadge isActive={cd.is_valid} label={cd.is_valid ? 'active' : 'expired'} /></>,
            valid_start: cd.valid_start,
            valid_end: cd.valid_end,
            referral: <a href={cd.referrer} title={cd.referrer} className="underline text-blue-500" target="_blank">{cd.referrer}</a>,
            action: ''
        }
    })

    return <Modal
        title="Invitation list"
        size="xl"
        trigger={<button className="text-blue-500 underline cursor-pointer">
            <div className="flex gap-1 items-center">
                <FaRegFileAlt /> See invitations
            </div>
        </button>}
    >

        <DataTable
            columns={columns}
            data={mapped}
            persistTableHead
            pagination
            customStyles={dataTable.customStyle}
        />
    </Modal>
}

function InvitationAddedModal({open, setOpen, data}) {

    if(!data) return null;

    const lists = [
        {label: 'Site name', value: data.site.name},
        {label: 'Domain/URL', value: data.site.domain},
        {label: 'Invitation code', value: <strong>{data.code}</strong>},
        {label: 'Sheep referrer', value: <div className="text-wrap w-full"><a href={data.referrer} target="_blank" className="text-blue-500 underline text-wrap">{data.referrer}</a></div>},
        {label: 'Valid from', value: data.valid_start},
        {label: 'Valid end', value: data.valid_end},
    ]

    return <Modal
        title="Site invitation"
        size="sm"
        open={open}
        onOpenChange={(e) => setOpen(!!e.open)}
    >
        <Stack gap="4">
            <DataList.Root size="md">
                {lists.map((list, key) => {
                    return <DataList.Item key={key}>
                        <DataList.ItemLabel>{list.label}</DataList.ItemLabel>
                        <DataList.ItemValue>{list.value}</DataList.ItemValue>
                    </DataList.Item>
                })}
            </DataList.Root>
        </Stack>
    </Modal>
}

function InvitationFormModal({site}) {

    const [open, setOpen] = useState(false)

    const initVal = {
        site_id: site.id,
        valid_start: null,
        valid_end: null,
        code: ''
    }
    const {data, setData, post} = useForm(initVal)

    const handleInvitationCode = () => {
        axios.post('/sites/getInvitationCode')
            .then(res => setData('code', res.data.results))
            .catch(err => console.log(err))
    }

    const submit = (e) => {
        e.preventDefault()
        post('/sites/invitation-code', {
            onSuccess: () => setOpen(false)
        })
    }

    return <Modal
        title={'Invitation code'}
        trigger={<Button unstyled className="cursor-pointer" type="button"><BsCodeSquare /></Button>}
        open={open}
        onOpenChange={(e) => setOpen(!!e.open)}
        size="sm"
        onSubmit={submit}
    >
        <div className="mb-5">
            <div className="mb-1">Site</div>
            <div>
                <strong>{site.name}</strong> ({site.domain})
            </div>
        </div>
        <CustomField label="Activation code" className="mb-5">
            <div className="flex-1">
                <Group attached w="full" maxW="sm">
                    <Button
                        onClick={handleInvitationCode}
                        type="button"
                        variant="solid"
                        className="bg-slate-700"
                    >
                        <IoMdRefresh />
                    </Button>
                    <Input
                        value={data.code}
                        flex="1"
                        readOnly
                        placeholder="Enter code"
                    />
                </Group>
            </div>
        </CustomField>
            <div className="mb-5">
                <DateRange
                    startDate={data.valid_start}
                    endDate={data.valid_end}
                    className=""
                >
                    <div className="mb-3">
                        <label className="mb-1 block">Valid start</label>
                        <DateStart onChange={(dt) => setData('valid_start', dt)} />
                    </div>
                    <div>
                        <label className="mb-1 block">Valid end</label>
                        <DateEnd onChange={(dt) => setData('valid_end', dt)} />
                    </div>
                </DateRange>
            </div>
    </Modal>
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
            {isEdit ? '' : <CustomField label="Activation code" orientation="horizontal" invalid={dataForm.errors.activation_code}>
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
            </CustomField>}
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
