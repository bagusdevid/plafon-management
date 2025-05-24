import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import {CustomField} from "@/Components/Forms/index.jsx";
import {Button, Field, Input} from "@chakra-ui/react";
import {useContext} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import {useForm} from "@inertiajs/react";

export default function ChangePassword() {

    const {auth} = useContext(LayoutContext)

    const initialValue = {
        current_password: '',
        password: '',
        confirmed: ''
    }
    const {data, setData, post, errors} = useForm(initialValue)

    const submit = (e) => {
        e.preventDefault()
        post('/change-password')
    }

    return <AppLayout title="Change Password">
        <PageTitle>
            Change Password
        </PageTitle>
        <div className="w-1/2 mx-auto">
            <form onSubmit={submit}>
                <div className="border border-solid border-slate-200 rounded-md px-10 py-8 mb-5">
                    <CustomField label="Current password" className="mb-5" invalid={errors.current_password} isRequired>
                        <Input
                            type="password"
                            placeholder="Masukkan password saat ini"
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                        />
                        {errors.current_password ? <Field.ErrorText>{errors.current_password}</Field.ErrorText> : ''}
                    </CustomField>
                    <CustomField label="New Password" invalid={errors.password} isRequired className="mb-5">
                        <Input
                            type="password"
                            value={data.password}
                            placeholder="Masukkan password baru"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password ? <Field.ErrorText>{errors.password}</Field.ErrorText> : ''}
                    </CustomField>
                    <CustomField label="New Password Confirmation" invalid={errors.password_confirmatio} isRequired>
                        <Input
                            type="password"
                            value={data.password}
                            placeholder="Ulangi password baru"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password_confirmation ? <Field.ErrorText>{errors.password_confirmation}</Field.ErrorText> : ''}
                    </CustomField>
                </div>
                <div className="flex gap-2">
                    <Button type="submit">
                        Submit
                    </Button>
                    <Button type="button" variant="ghost">
                        Reset
                    </Button>
                </div>
            </form>
        </div>
    </AppLayout>
}
