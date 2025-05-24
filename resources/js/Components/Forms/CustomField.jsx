import { Field } from "@chakra-ui/react"

export function CustomField({label, isRequired = false, children, ...rest}) {
    return <Field.Root {...rest}>
        <Field.Label>
            {label}
            {isRequired ? <span className="text-red-500">*</span> : ''}
        </Field.Label>
        {children}
    </Field.Root>
}
