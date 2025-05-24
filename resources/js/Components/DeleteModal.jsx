import {useForm} from "@inertiajs/react";
import {useState} from "react";
import {Modal} from "@/Components/Forms/index.jsx";
import {Button} from "@chakra-ui/react";
import {FaRegTrashCan} from "react-icons/fa6";

export default function DeleteModal({url, label, id}) {

    const {delete: destroy} = useForm({id: id});
    const [open, setOpen] = useState(false)

    return <Modal
        title="Delete"
        trigger={<Button type="button" unstyled className="cursor-pointer text-red-700"><FaRegTrashCan /></Button>}
        size="xs"
        role="alertdialog"
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        onSubmit={(e) => {
            e.preventDefault();
            destroy(url, {
                onSuccess: () => setOpen(false)
            })
        }}
    >
        Are you sure want to delete record <strong>{label}</strong>?
    </Modal>
}
