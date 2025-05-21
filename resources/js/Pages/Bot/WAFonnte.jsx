import {Head, useForm} from "@inertiajs/react";
import {CustomField} from "@/Components/Forms/index.jsx";
import {Button, Input, Textarea} from "@chakra-ui/react";

export default function WAFonnte({wa_success, wa_error}) {

    const initialVal = {
        phone: '',
        message: ''
    }
    const {data, setData, post, errors} = useForm(initialVal)

    const submit = (e) => {
        e.preventDefault();
        post('/wa-fonnte')
    }

    return <>
        <Head title="WhatsApp" />
        <div className="px-10 py-10">
            <div className="w-1/3 bg-slate-100 px-8 py-8">
                {wa_success ? <div className="mb-5">{wa_success}</div> : ''}
                {wa_error ? <div className="mb-5">{wa_error}</div> : ''}
                <form onSubmit={submit}>
                    <CustomField label="Phone" className="mb-5">
                        <Input
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            type="text"
                            placeholder="Phone number"
                            bg="white"
                        />
                    </CustomField>
                    <CustomField label="Message" className="mb-5">
                        <Textarea
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            placeholder="Enter message"
                            rows={5}
                            bg="white"
                        />
                    </CustomField>
                    <Button type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    </>
}
