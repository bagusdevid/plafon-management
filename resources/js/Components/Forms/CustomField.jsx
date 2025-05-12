import { Field } from "@chakra-ui/react"

export function CustomField({label, children, ...rest}) {
    return <Field.Root {...rest}>
        <Field.Label>
            {label}
        </Field.Label>
        {children}
    </Field.Root>
}
