import AuthLayout from "@/Layouts/AuthLayout.jsx";
import {
    Button,
    Field,
    Fieldset,
    Input,
    Stack,
} from "@chakra-ui/react"
import {Link, useForm} from "@inertiajs/react";

export default function Login() {

    const initialValues = {
        email: '',
        password: '',
    }
    const dataForm = useForm(initialValues)
    const handleSubmit = (e) => {
        e.preventDefault()
        dataForm.post('/login')
    }

    return <AuthLayout title="Login">
        <Fieldset.Root size="lg">
            <form onSubmit={handleSubmit}>
                <Fieldset.Content>
                    <Field.Root invalid={dataForm.errors.email}>
                        <Field.Label>Email</Field.Label>
                        <Input
                            value={dataForm.data.email}
                            onChange={(e) => dataForm.setData('email', e.target.value)}
                            type="email"
                            size="xl"
                            placeholder="Masukkan email Anda"
                            className="w-full" />
                        {dataForm.errors.email ? <Field.ErrorText>{dataForm.errors.email}</Field.ErrorText> : ''}
                    </Field.Root>
                    <Field.Root invalid={dataForm.errors.password}>
                        <Field.Label>Password</Field.Label>
                        <Input
                            value={dataForm.data.password}
                            onChange={(e) => dataForm.setData('password', e.target.value)}
                            type="password"
                            size="xl"
                            placeholder="Masukkan password" />
                        {dataForm.errors.password ? <Field.ErrorText>{dataForm.errors.password}</Field.ErrorText> : ''}
                    </Field.Root>
                </Fieldset.Content>

                <Stack mt={5}>
                    <Button
                        size="xl"
                        type="submit" alignSelf="flex-start" className="w-full">
                        Login
                    </Button>
                    <div className="flex justify-between">
                        <Link href="#" className="text-[13px] text-gray-500">
                            Forgot password
                        </Link>
                    </div>
                </Stack>
            </form>
        </Fieldset.Root>
    </AuthLayout>
}
