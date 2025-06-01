import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import useDatatable from "@/Hooks/useDatatable.js";
import {Button, CloseButton, Table, DataList, Dialog, Input, Portal} from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import dataTable from "@/Utils/dataTable.js";
import thousandSeparator from "@/Utils/thousand-separator.js";
import {FaCheckCircle, FaRegFileAlt} from "react-icons/fa";
import {useState} from "react";
import {IoMdCheckmarkCircle, IoMdCloseCircle} from "react-icons/io";
import moment from "moment";

function Action({onDetail}) {
    return <div className="flex gap-3">
        <button onClick={onDetail} className="cursor-pointer" title="Edit">
            <FaRegFileAlt />
        </button>
    </div>
}

export default function Played({plays}) {

    console.log(plays)

    const fieldColums = [
        {name: 'Code', field: 'code'},
        {name: 'Username', field: 'username'},
        {name: 'Task', field: 'task'},
        {name: 'Spend', field: 'total'},
        {name: 'Result', field: 'result'},
    ]

    const mapped = plays.map(play => {
        const correct = play.bet_decode.filter((bd) => bd.answer === true)
        const result = () => {
            return <div>
                <div>bet: {play.bet_decode.length}</div>
                <div>correct: {correct.length}</div>
            </div>
        }

        return {
            id: play.id,
            no: play.id,
            code: play.code,
            username: play.sheep.username,
            task: play.task.name,
            total: thousandSeparator(play.total),
            result: result(),
            action: <Action onDetail={() => handleDetail(play)} />,
        }
    })

    const {filteredItems, filterText, setFilterText, columns} = useDatatable(fieldColums, mapped)

    const initialValue = {
        code: '',
        sheep: '',
        created_at: '',
        total: '',
        bet: '',
        bet_decode: [],
        bet_options_decode: [],
        bet_options: ''
    }
    const [detailData, setDetailData] = useState(initialValue)
    const [modalOpen, setModalOpen] = useState(false)

    const handleDetail = (item) => {
        setDetailData(item);
        setModalOpen(true)
    }

    return <AppLayout title="Task played">
        <PageTitle>
            Task played
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

        <Detail
            data={detailData}
            open={modalOpen}
            onOpenChange={(e) => setModalOpen(!!e.open)}
            size="lg"
        />
    </AppLayout>
}

function Detail({data, ...rest}) {

    const {code, sheep, bet, bet_decode, bet_options_decode, bet_options, total, created_at} = data;

    const stats = [
        {label: 'Code', value: code},
        {label: 'Username', value: sheep.username},
        {label: 'Total spend', value: `IDR ${thousandSeparator(total)}`},
        {label: 'Played at', value: moment(created_at).format("MMM Do, YYYY HH:mm")},
    ]

    return <Modal {...rest}>
        <DataList.Root orientation="horizontal">
                {stats.map((item) => (
                    <DataList.Item key={item.label}>
                        <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                        <DataList.ItemValue>{item.value}</DataList.ItemValue>
                    </DataList.Item>
                ))}
            <Table.Root size="md" variant="outline" showColumnBorder>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Bet</Table.ColumnHeader>
                        <Table.ColumnHeader>Options</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                        <Table.Row className="align-top">
                            <Table.Cell className="w-1/2 text-[14px]">
                                {bet_decode.map((bd, kx) => {
                                    return <div className="mb-1" key={kx}>
                                        <div className="flex items-center gap-2">
                                            <div className="font-semibold">{bd.label}</div>
                                            <div>{thousandSeparator(bd.cost)}</div>
                                            <div>
                                                {bd.answer ? <IoMdCheckmarkCircle className="text-green-600 text-[18px]" /> : <IoMdCloseCircle className="text-red-600 text-[18px]" />}
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </Table.Cell>
                            <Table.Cell>
                                {bet_options_decode.map((bd, ky) => {
                                    return <div className="mb-1" key={ky}>
                                        <div className="flex items-center gap-2">
                                            <div>{bd.label}</div>
                                            <div>
                                                {bd.answer ? <IoMdCheckmarkCircle className="text-green-600 text-[18px]" /> : <IoMdCloseCircle className="text-red-600 text-[18px]" />}
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </Table.Cell>
                        </Table.Row>
                </Table.Body>
            </Table.Root>
        </DataList.Root>
    </Modal>
}

function Modal({children, ...rest}) {

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
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button type="button" variant="outline">Close</Button>
                            </Dialog.ActionTrigger>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
        </Portal>
    </Dialog.Root>
}
