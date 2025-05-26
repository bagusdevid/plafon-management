import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import useDatatable from "@/Hooks/useDatatable.js";
import DataTable from "react-data-table-component";
import dataTable from "@/Utils/dataTable.js";
import thousandSeparator from "@/Utils/thousand-separator.js";
import {FaRegFileLines} from "react-icons/fa6";
import {Button, DataList, CloseButton, Dialog, Portal, Input} from "@chakra-ui/react";
import {useState} from "react";
import {Link} from "@inertiajs/react";

function Action({onDetail}) {
    return <div className="flex gap-3">
        <button onClick={onDetail} className="cursor-pointer" title="Edit">
            <FaRegFileLines />
        </button>
    </div>
}

export default function Topup({archives}) {

    const fieldColums = [
        {name: 'Username', field: 'username'},
        {name: 'Jumlah', field: 'amount'},
        {name: 'Tanggal transfer', field: 'transfer_date'},
    ]

    const mapped = archives.map(archive => {
        return {
            id: archive.id,
            no: archive.id,
            username: archive.sheep.username,
            amount: thousandSeparator(archive.amount),
            transfer_date: archive.transfer_date,
            action: <Action
                onDetail={() => handleDetail(archive)}
            />,
        }
    })

    const {filteredItems, filterText, setFilterText, columns} = useDatatable(fieldColums, mapped)

    const [detailOpen, setDetailOpen] = useState(false)
    const [archiveDetail, setArchiveDetail] = useState(null)

    const handleDetail = (archive) => {
        setArchiveDetail(archive)
        setDetailOpen(true)
    }

    return <AppLayout title="Daftar topup">
        <PageTitle>
            Daftar topup
        </PageTitle>
        <div className="mb-2 flex justify-between items-center">
            <div className="flex gap-2">
                <div>
                    <Button type="button" as={Link} href="/topup/create">
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

        <DetailModal
            open={detailOpen}
            onOpenChange={(e) => setDetailOpen(!!e.open)}
            scrollBehavior="inside"
            size="lg"
        >
            <Detail archive={archiveDetail} />
        </DetailModal>

    </AppLayout>
}

function Detail({archive}) {

    const items = [
        {label: 'Username', value: archive.sheep.username},
        {label: 'Jumlah', value: thousandSeparator(archive.amount)},
        {label: 'Nama bank sumber', value: archive.source_bank_name},
        {label: 'No Rekening bank sumber', value: archive.source_bank_acc_no},
        {label: 'Rekening Acc bank sumber', value: archive.source_bank_acc_name},
        {label: 'Bank tujuan', value: archive.destination_bank_name},
        {label: 'Tanggal transfer', value: archive.transfer_date},
        {label: 'Bukti transfer', value: <img src={archive.transfer_evidence_path} alt="" />},
        {label: 'Saldo akun sebelum', value: thousandSeparator(archive.before_balance)},
        {label: 'Saldo akun setelah', value: thousandSeparator(archive.after_balance)},
        {label: 'Di Topup oleh', value: archive.user.name},
        {label: 'Tanggal dibuat', value: archive.created_at},
        {label: 'Tanggal diupdate', value: archive.updated_at},
    ]

    return <DataList.Root orientation="horizontal" divideY="1px">
        {items.map((item) => (
            <DataList.Item key={item.label} pt="4">
                <DataList.ItemLabel className="w-[240px]">{item.label}</DataList.ItemLabel>
                <DataList.ItemValue>{item.value}</DataList.ItemValue>
            </DataList.Item>
        ))}
    </DataList.Root>
}

function DetailModal({children, ...rest}) {
    return <Dialog.Root {...rest}>
        <Portal>
            <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>
                                Detail
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
