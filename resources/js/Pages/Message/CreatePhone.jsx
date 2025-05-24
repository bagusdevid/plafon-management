import PageTitle from "@/Components/PageTitle.jsx";
import AppLayout from "@/Layouts/AppLayout.jsx";
import {Input, Stack} from "@chakra-ui/react";
import {CustomField} from "@/Components/Forms/index.jsx";
import {useForm} from "@inertiajs/react";

export default function PhoneBroadcast() {

    const initialValue = {
        sender: '',
        subject: '',
        recipients: '',
        body: '',
        site_id: '',
        invitation_codes: [],
    }
    const dataForm = useForm(initialValue)

    const submit = () => {}

    return <AppLayout title="WhatsApp broadcast">
        <PageTitle>
            WhatsApp broadcast
        </PageTitle>

        <div className="w-full lg:w-2/3 mx-auto bg-slate-100 px-10 py-8">
            <form onSubmit={submit}>
                <Stack alignItems="start" css={{ "--field-label-width": "160px" }}>
                    <CustomField label="Sender display" orientation="horizontal">
                        <Input
                            value={dataForm.data.sender}
                            onChange={(e) => dataForm.setData('sender', e.target.value)}
                            type="text"
                            placeholder="Masukkan sender"
                            bg="white"
                        />
                    </CustomField>
                </Stack>
            </form>
        </div>
    </AppLayout>
}
