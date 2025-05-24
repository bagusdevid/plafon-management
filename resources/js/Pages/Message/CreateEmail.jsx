import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import {CustomField} from "@/Components/Forms/index.jsx";
import {Input, Textarea, NativeSelect, Stack, Button} from "@chakra-ui/react";
import {useForm} from "@inertiajs/react";

export default function CreateEmail({sites}) {

    const initialValue = {
        sender: '',
        subject: '',
        recipients: '',
        body: '',
        site_id: '',
        invitation_codes: [],
    }
    const dataForm = useForm(initialValue)

    const onSiteChange = (e) => {
        dataForm.setData('site_id', e.target.value)
        axios.post('/api/sites/getInvitationCodes', {site_id: parseInt(e.target.value)})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const submit = (e) => {
        e.preventDefault()
        dataForm.post('/broadcast/store/email')
    }

    return <AppLayout title="Email broadcast">
        <PageTitle>
            Email broadcast
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
                <CustomField label="Subject" orientation="horizontal">
                    <Input
                        value={dataForm.data.subject}
                        onChange={(e) => dataForm.setData('subject', e.target.value)}
                        type="text"
                        placeholder="Masukkan subject pesan"
                        bg="white"
                    />
                </CustomField>
                <CustomField label="Recipient" orientation="horizontal">
                    <Textarea
                        value={dataForm.data.recipients}
                        onChange={(e) => dataForm.setData('recipients', e.target.value)}
                        placeholder="Masukkan penerima/recipients"
                        bg="white"
                    />
                </CustomField>
                <CustomField label="Site" orientation="horizontal">
                    <NativeSelect.Root
                        bg="white"
                    >
                        <NativeSelect.Field
                            value={dataForm.data.site_id}
                            onChange={(e) => onSiteChange(e)}
                            placeholder="Select site"
                        >
                            {sites.map((site, key) => {
                                return <option key={key} value={site.id}>
                                    {site.name}
                                </option>
                            })}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </CustomField>
                <CustomField label="Invitation code" orientation="horizontal">
                    <NativeSelect.Root
                        bg="white"
                    >
                        <NativeSelect.Field
                            disabled={dataForm.data.invitation_codes.length === 0}
                        >
                            {dataForm.data.invitation_codes && dataForm.data.invitation_codes.map((ic, key) => {
                                return <option key={key} value={ic.id}>
                                    {ic.name}
                                </option>
                            })}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </CustomField>
                <CustomField alignItems="start" label="Pesan" className="mb-5">
                    <Textarea
                        value={dataForm.data.body}
                        onChange={(e) => dataForm.setData('body', e.target.value)}
                        placeholder="Tulis pesan disini"
                        bg="white"
                        rows={7}
                    />
                </CustomField>
                <div className="flex gap-2">
                    <Button type="submit">
                        Kirim
                    </Button>
                    <Button variant="ghost">
                        Reset
                    </Button>
                </div>
            </Stack>
            </form>
        </div>
    </AppLayout>
}
