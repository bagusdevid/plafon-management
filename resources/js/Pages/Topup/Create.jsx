import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import {CustomField} from "@/Components/Forms/index.jsx";
import {
    Button,
    Dialog,
    Group,
    Input,
    NativeSelect,
    FileUpload,
    Stack,
    Portal,
    CloseButton,
    Field
} from "@chakra-ui/react";
import {FaSearch} from "react-icons/fa";
import {MdSearch} from "react-icons/md";
import {HiUpload} from "react-icons/hi";
import {useMemo, useState} from "react";
import dataTable from "@/Utils/dataTable.js";
import DataTable from "react-data-table-component";
import {LiaArrowRightSolid} from "react-icons/lia";
import DatePicker from "react-datepicker";
import moment from "moment";
import {useForm} from "@inertiajs/react";
import CurrencyInput from "react-currency-input-field";

export default function Create({sheeps, managementBanks}) {

    const banks = [
        {label: 'Bank Mandiri', value: ''},
        {label: 'Bank BCA', value: ''},
        {label: 'Bank BRI', value: ''},
        {label: 'Bank BNI', value: ''},
        {label: 'Bank BTN', value: ''},
        {label: 'Bank CIMB', value: ''},
        {label: 'Bank Permata', value: ''},
        {label: 'Bank Syariah Indonesia', value: ''},
    ]

    const columns = [
        {name: '', cell: (row, index) => index + 1, grow: 0, width: '60px'},
        {name: 'Username', selector: row => row.username, sortable: true},
        {name: 'Name', selector: row => row.name, sortable: true},
        {name: '', selector: row => row.action, width: '140px'},
    ];

    const mapped = sheeps.map(sheep => {
        return {
            id: sheep.id,
            no: sheep.id,
            username: sheep.username,
            name: sheep.name,
            action: <button type="button" onClick={() => handleGetAccount(sheep)} className="cursor-pointer">
                <LiaArrowRightSolid />
            </button>
        }
    })

    const [filterText, setFilterText] = useState('');

    const filteredItems = useMemo(() => {
        return mapped.filter(item => {
            const searchableValues = Object.values(item).join(' ').toLowerCase();
            return searchableValues.includes(filterText.toLowerCase());
        });
    }, [mapped, filterText]);

    const [userModal, setUserModal] = useState(false)

    const initialValue = {
        sheep: {id: '', name: '', username: ''},
        amount: 0,
        source_bank_name: '',
        source_bank_acc_no: '',
        source_bank_acc_name: '',
        destination_bank_id: '',
        transfer_evidence: '',
        transfer_date: null
    }
    const dataForm = useForm(initialValue)

    const handleGetAccount = (sheep) => {
        dataForm.setData('sheep', {id: sheep.id, name: sheep.name, username: sheep.username})
        setUserModal(false)
    }

    const submit = (e) => {
        e.preventDefault()
        console.log(dataForm.data)
        dataForm.post('/topup/create')
    }

    return <AppLayout title="Topup">
        <PageTitle>
            Topup
        </PageTitle>
        <div className="w-full lg:w-2/3 mx-auto">
            <form onSubmit={submit}>
            <div className="px-10 py-7 mb-5 rounded-md mx-auto bg-slate-100">
                <Stack gap="3" css={{ "--field-label-width": "200px" }}>
                    <CustomField label="Account" orientation="horizontal" isRequired invalid={dataForm.errors['sheep.id']}>
                        <div className="flex-1">
                            <Group attached w="full" maxW="sm">
                                <Input
                                    defaultValue={dataForm.data.sheep.id ? `${dataForm.data.sheep.name} (${dataForm.data.sheep.username})` : ''}
                                    readOnly
                                    bg="white"
                                    flex="1" placeholder="Find account here" />
                                <Button bg="bg.subtle" variant="outline" onClick={() => setUserModal(true)}>
                                    <MdSearch />
                                </Button>
                            </Group>
                            {dataForm.errors['sheep.id'] ? <Field.ErrorText>{dataForm.errors['sheep.id']}</Field.ErrorText> : ''}
                        </div>
                    </CustomField>
                    <CustomField label="Nominal" orientation="horizontal" isRequired invalid={dataForm.errors.amount && dataForm.errors.amount === 0}>
                        <div className="flex-1">
                            <CurrencyInput
                                decimalSeparator=","
                                groupSeparator="."
                                placeholder="Please enter a number"
                                value={dataForm.data.amount}
                                decimalsLimit={2}
                                onValueChange={(value, name, values) => dataForm.setData('amount', values.float)}
                                className="bg-white outline-0 rounded border border-solid border-neutral-200 text-right px-3 py-2"
                            />
                            {dataForm.errors.amount && dataForm.errors.amount === 0 ? <Field.ErrorText>{dataForm.errors.amount}</Field.ErrorText> : ''}
                        </div>
                    </CustomField>
                    <CustomField label="Rekening bank sumber" orientation="horizontal">
                        <div className="flex-1">
                            <NativeSelect.Root
                                value={dataForm.data.source_bank_name}
                                onChange={(e) => dataForm.setData('source_bank_name', e.target.value)}
                                bg="white"
                            >
                                <NativeSelect.Field>
                                    <option value="">
                                        Pilih bank sumber
                                    </option>
                                    {banks.map((bank, key) => {
                                        return <option value={bank.label} key={key}>
                                            {bank.label}
                                        </option>
                                    })}
                                </NativeSelect.Field>
                                <NativeSelect.Indicator />
                            </NativeSelect.Root>
                        </div>
                    </CustomField>
                    <CustomField label="No rekening sumber" orientation="horizontal">
                        <Input
                            value={dataForm.data.source_bank_acc_no}
                            onChange={(e) => dataForm.setData('source_bank_acc_no', e.target.value)}
                            type="text"
                            bg="white"
                        />
                    </CustomField>
                    <CustomField label="Nama rekening sumber" orientation="horizontal">
                        <Input
                            value={dataForm.data.source_bank_acc_name}
                            onChange={(e) => dataForm.setData('source_bank_acc_name', e.target.value)}
                            type="text"
                            bg="white"
                        />
                    </CustomField>
                    <CustomField label="Rekening tujuan" orientation="horizontal" isRequired invalid={dataForm.errors.destination_bank_id}>
                        <div className="flex-1">
                            <NativeSelect.Root
                                value={dataForm.data.destination_bank_id}
                                onChange={(e) => dataForm.setData('destination_bank_id', e.target.value)}
                                bg="white"
                            >
                                <NativeSelect.Field>
                                    <option value="">
                                        Pilih bank tujuan
                                    </option>
                                    {managementBanks.map((bank, key) => {
                                        return <option value={bank.id} key={key}>
                                            {bank.bank_name} ({bank.bank_acc_no})
                                        </option>
                                    })}
                                </NativeSelect.Field>
                                <NativeSelect.Indicator />
                            </NativeSelect.Root>
                            {dataForm.errors.destination_bank_id ? <Field.ErrorText>{dataForm.errors.destination_bank_id}</Field.ErrorText> : ''}
                        </div>
                    </CustomField>
                    <CustomField label="Tanggal transfer" orientation="horizontal">
                        <div className="flex-1">
                            <DatePicker
                                dateFormat="dd-MM-yyyy"
                                className="border border-solid border-neutral-300 bg-white outline-0 px-3 py-2 rounded-md text-sm"
                                selected={dataForm.data.transfer_date}
                                onChange={(dt) => dataForm.setData("transfer_date", moment(dt).format("YYYY-MM-DD"))}
                                onKeyDown={e => e.preventDefault()}
                                placeholderText="Enter date"
                            />
                        </div>
                    </CustomField>
                    <CustomField label="Bukti transfer" orientation="horizontal" isRequired invalid={dataForm.errors.transfer_evidence}>
                        <div className="flex-1">
                        <FileUpload.Root
                            value={dataForm.data.transfer_evidence}
                            onChange={(e) => dataForm.setData('transfer_evidence', e.target.files[0])}
                            className="w-full"
                        >
                            <FileUpload.HiddenInput />
                            <FileUpload.Trigger asChild>
                                <Button variant="outline" size="sm" bg="white">
                                    <HiUpload /> Upload file
                                </Button>
                            </FileUpload.Trigger>
                            <FileUpload.List />
                        </FileUpload.Root>
                                {dataForm.errors.transfer_evidence ? <Field.ErrorText>{dataForm.errors.transfer_evidence}</Field.ErrorText> : ''}
                        </div>
                    </CustomField>
                </Stack>
            </div>
            <div className="flex">
                <div className="w-[240px]"></div>
                <div>
                    <Button type="submit">
                        Submit
                    </Button>
                </div>
            </div>
            </form>
        </div>

        <AccountModal
            open={userModal}
            onOpenChange={(e) => setUserModal(!!e.open)}
            size="lg"
            scrollBehavior="inside"
        >
            <div>
                <DataTable
                    columns={columns}
                    data={filteredItems}
                    persistTableHead
                    pagination
                    customStyles={dataTable.customStyle}
                />
            </div>
        </AccountModal>
    </AppLayout>
}

function AccountModal({children, ...rest}) {
    return <Dialog.Root {...rest}>
        <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>
                            Account
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        {children}
                    </Dialog.Body>
                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    </Dialog.Root>
}
