import thousandSeparator from "@/Utils/thousand-separator.js";
import useDatatable from "@/Hooks/useDatatable.js";
import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import {Button, NativeSelect, CloseButton, Dialog, Field, Input, Portal, Stack} from "@chakra-ui/react";
import {Link, useForm} from "@inertiajs/react";
import DataTable from "react-data-table-component";
import dataTable from "@/Utils/dataTable.js";
import {CustomField} from "@/Components/Forms/index.jsx";
import {useState} from "react";
import {FaPenToSquare} from "react-icons/fa6";
import DeleteModal from "@/Components/DeleteModal.jsx";

function Action({item, onEdit, deleteUrl}) {
    return <div className="flex gap-3">
        <button onClick={onEdit} className="cursor-pointer" title="Edit">
            <FaPenToSquare />
        </button>
        <DeleteModal label={`${item.bank_name} (${item.bank_acc_no})`} id={item.id} url={deleteUrl} />
    </div>
}

export default function CS({customer_service}) {

    const fieldColums = [
        {name: 'Service', field: 'service'},
        {name: 'Account', field: 'account'},
    ]

    const mapped = customer_service.map(cs => {
        return {
            id: cs.id,
            no: cs.id,
            service: cs.service,
            account: cs.account,
            action: <Action
                item={cs}
                onEdit={() => handleEdit(cs)}
                deleteUrl={`/setting/customer-service/${cs.id}`}
            />,
        }
    })

    const {filteredItems, filterText, setFilterText, columns} = useDatatable(fieldColums, mapped)

    const [modalOpen, setModalOpen] = useState(false)

    const initialValue = {
        service: '',
        account: '',
    }
    const dataForm = useForm(initialValue)

    const submit = (e) => {
        e.preventDefault()
        dataForm.post('/setting/customer-service', {
            onSuccess: () => setModalOpen(false)
        })
    }

    const editSubmit = (e) => {
        e.preventDefault()
        dataForm.put(`/setting/customer-service/${singleField.id}`, {
            onSuccess: () => {
                dataForm.setData(initialValue)
                setSingleField({...singleField, id: null})
                setModalOpen(false)
            },
        })
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
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        dataForm.setData(initialValue)
        dataForm.clearErrors();
        setIsEdit(false)
        setSingleField({id: null, name: ''})
    }

    return <AppLayout title="Customer service">
        <PageTitle>
            Customer service
        </PageTitle>
        <div className="mb-2 flex justify-between items-center">
            <div className="flex gap-2">
                <div>
                    <Button type="button" onClick={() => setModalOpen(true)}>
                        Create
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

        <FormModal
            open={modalOpen}
            onOpenChange={(e) => setModalOpen(!!e.open)}
            onSubmit={isEdit ? editSubmit : submit}
            onExitComplete={handleCloseModal}
        >
            <Form
                dataForm={dataForm}
            />
        </FormModal>

    </AppLayout>
}

function Form({dataForm}) {

    const {service,account} = dataForm.data;
    const {setData, errors} = dataForm;

    return <Stack gap="2" css={{ "--field-label-width": "160px" }}>
        <CustomField label="Service" orientation="horizontal" isRequired invalid={errors.service}>
            <div className="flex-1">
                <NativeSelect.Root>
                    <NativeSelect.Field
                        value={service}
                        onChange={(e) => setData('service', e.target.value)}
                    >
                        <option value="">Pilih service</option>
                        <option value="telegram">Telegram</option>
                        <option value="whatsapp">WhatsApp</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                </NativeSelect.Root>
                {errors.service ? <Field.ErrorText>{errors.service}</Field.ErrorText> : ''}
            </div>
        </CustomField>
        <CustomField label="Account" orientation="horizontal" isRequired invalid={errors.account}>
            <div className="flex-1">
                <Input
                    value={account}
                    onChange={(e) => setData('account', e.target.value)}
                    placeholder="Masukkan account/username"
                    type="text"
                />
                {errors.account ? <Field.ErrorText>{errors.account}</Field.ErrorText> : ''}
            </div>
        </CustomField>
    </Stack>
}

function FormModal({onSubmit, children, ...rest}) {
    return <Dialog.Root {...rest}>
        <Portal>
            <Dialog.Backdrop />
            <form onSubmit={onSubmit}>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>
                                Create
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            {children}
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button type="submit">Save</Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </form>
        </Portal>
    </Dialog.Root>
}
