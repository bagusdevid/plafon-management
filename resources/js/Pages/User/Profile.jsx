import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import {CustomField} from "@/Components/Forms/index.jsx";
import {Button, Field, Input} from "@chakra-ui/react";
import {useContext} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import {useForm} from "@inertiajs/react";

export default function Profile() {

    const {auth} = useContext(LayoutContext)

    const initialValue = {
        name: auth.user.name,
        email: auth.user.email
    }
    const {data, setData, put, errors} = useForm(initialValue)

    const submit = (e) => {
        e.preventDefault()
        put('/profile')
    }

    return <AppLayout title="Profile">
        <PageTitle>
            Profile
        </PageTitle>
        <div className="w-1/2 mx-auto">
            <form onSubmit={submit}>
            <div className="border border-solid border-slate-200 rounded-md px-10 py-8 mb-5">
                <CustomField label="Name" className="mb-5" invalid={errors.name} isRequired>
                    <Input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name ? <Field.ErrorText>{errors.name}</Field.ErrorText> : ''}
                </CustomField>
                <CustomField label="Email" invalid={errors.email} isRequired>
                    <Input
                        type="text"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email ? <Field.ErrorText>{errors.email}</Field.ErrorText> : ''}
                </CustomField>
            </div>
            <div className="flex gap-2">
                <Button type="submit">
                    Update
                </Button>
                <Button type="button" variant="ghost">
                    Reset
                </Button>
            </div>
            </form>
        </div>
    </AppLayout>
}
