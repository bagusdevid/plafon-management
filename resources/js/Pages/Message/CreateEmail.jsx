import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import {CustomField} from "@/Components/Forms/index.jsx";
import {Input, Textarea, NativeSelect, Stack, Button} from "@chakra-ui/react";

export default function CreateEmail() {
    return <AppLayout title="Email broadcast">
        <PageTitle>
            Email broadcast
        </PageTitle>

        <div className="w-full lg:w-2/3 mx-auto bg-slate-100 px-10 py-8">
            <Stack alignItems="start" css={{ "--field-label-width": "160px" }}>
                <CustomField label="Sender display" orientation="horizontal">
                    <Input
                        type="text"
                        placeholder="Masukkan sender"
                        bg="white"
                    />
                </CustomField>
                <CustomField label="Subject" orientation="horizontal">
                    <Input
                        type="text"
                        placeholder="Masukkan subject pesan"
                        bg="white"
                    />
                </CustomField>
                <CustomField label="Recipient" orientation="horizontal">
                    <Textarea
                        placeholder="Masukkan penerima/recipients"
                        bg="white"
                    />
                </CustomField>
                <CustomField label="Site" orientation="horizontal">
                    <NativeSelect.Root bg="white">
                        <NativeSelect.Field>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </CustomField>
                <CustomField label="Invitation code" orientation="horizontal">
                    <Input
                        type="text"
                        placeholder="Pilih invitation code"
                        bg="white"
                    />
                </CustomField>
                <CustomField alignItems="start" label="Pesan" className="mb-5">
                    <Textarea
                        placeholder="Tulis pesan disini"
                        bg="white"
                        rows={7}
                    />
                </CustomField>
                <div className="flex gap-2">
                    <Button>
                        Kirim
                    </Button>
                    <Button variant="ghost">
                        Reset
                    </Button>
                </div>
            </Stack>
        </div>
    </AppLayout>
}
