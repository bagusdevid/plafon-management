import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import dataTable from "@/Utils/dataTable.js";
import DataTable from "react-data-table-component";
import {useMemo, useState} from "react";
import {Button, CloseButton, Dialog, Field, Input, Portal, Stack} from "@chakra-ui/react";
import {CustomField} from "@/Components/Forms/index.jsx";
import {useForm} from "@inertiajs/react";
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

export default function Bank({banks}) {

    const columns = [
        {name: '', cell: (row, index) => index + 1, grow: 0, width: '60px'},
        {name: 'Bank name', selector: row => row.bank_name, sortable: true},
        {name: 'Bank Acc no', selector: row => row.bank_acc_no, sortable: true},
        {name: 'Bank Acc Name', selector: row => row.bank_acc_name, sortable: true},
        {name: '', selector: row => row.action, width: '140px'},
    ];

    const mapped = banks.map(bank => {
        return {
            id: bank.id,
            no: bank.id,
            bank_name: bank.bank_name,
            bank_acc_no: bank.bank_acc_no,
            bank_acc_name: bank.bank_acc_name,
            action: <Action
                item={bank}
                onEdit={() => handleEdit(bank)}
                deleteUrl={`/setting/bank/${bank.id}`}
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

    const [modalOpen, setModalOpen] = useState(false)

    const initialValue = {
        bank_name: '',
        bank_acc_name: '',
        bank_acc_no: '',
    }
    const dataForm = useForm(initialValue)

    const submit = (e) => {
        e.preventDefault()
        dataForm.post('/setting/bank', {
            onSuccess: () => setModalOpen(false)
        })
    }

    const editSubmit = (e) => {
        e.preventDefault()
        dataForm.put(`/setting/bank/${singleField.id}`, {
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

    return <AppLayout title="Management Bank">
        <PageTitle>
            Management bank
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

    const {bank_name, bank_acc_name, bank_acc_no} = dataForm.data;
    const {setData, errors} = dataForm;

    return <Stack gap="2" css={{ "--field-label-width": "160px" }}>
        <CustomField label="Nama bank" orientation="horizontal" isRequired invalid={errors.bank_name}>
            <div className="flex-1">
                <Input
                    value={bank_name}
                    onChange={(e) => setData('bank_name', e.target.value)}
                    placeholder="Masukkan nama bank"
                    type="text"
                />
                {errors.bank_name ? <Field.ErrorText>{errors.bank_name}</Field.ErrorText> : ''}
            </div>
        </CustomField>
        <CustomField label="Nomor rekening" orientation="horizontal" isRequired invalid={errors.bank_acc_no}>
            <div className="flex-1">
                <Input
                    value={bank_acc_no}
                    onChange={(e) => setData('bank_acc_no', e.target.value)}
                    placeholder="Masukkan no rekening"
                    type="text"
                />
                {errors.bank_acc_no ? <Field.ErrorText>{errors.bank_acc_no}</Field.ErrorText> : ''}
            </div>
        </CustomField>
        <CustomField label="(Atas nama) bank" orientation="horizontal" isRequired invalid={errors.bank_acc_name}>
            <div className="flex-1">
                <Input
                    value={bank_acc_name}
                    onChange={(e) => setData('bank_acc_name', e.target.value)}
                    placeholder="Masukkan atas nama"
                    type="text"
                />
                {errors.bank_acc_name ? <Field.ErrorText>{errors.bank_acc_name}</Field.ErrorText> : ''}
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
