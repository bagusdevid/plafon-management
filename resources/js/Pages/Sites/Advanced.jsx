import {Input, RadioCard, Table} from "@chakra-ui/react"
import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import {CustomField} from "@/Components/Forms/index.jsx";
import {useForm} from "@inertiajs/react";

export default function Advanced({site}) {

    const initialValue = {
        name: site.name,
        domain: site.domain,
        activation_code: site.activation_code,
    }
    const {data, setData, post, errors} = useForm(initialValue)

    return <AppLayout title="Site Advanced">
        <PageTitle>
            Site
        </PageTitle>

        <Table.Root size="sm" variant="outline" showColumnBorder>
            <Table.Body>
                <Table.Row>
                    <Table.Cell p={7} className="w-1/3 align-top">
                        Primary setting
                    </Table.Cell>
                    <Table.Cell p={7}>
                        <CustomField label="Name" className="mb-5">
                            <Input
                                value={data.name}
                                type="text"
                            />
                        </CustomField>
                        <CustomField label="Domain" className="mb-5">
                            <Input
                                value={data.domain}
                                type="text"
                            />
                        </CustomField>
                        <CustomField label="Activation code">
                            <Input
                                value={data.activation_code}
                                type="text"
                            />
                        </CustomField>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell className="w-1/3 align-top" p={5}>
                        Appearances
                    </Table.Cell>
                    <Table.Cell className="" p={7}>
                        <CustomField label="Logo" className="mb-5">
                            <Input
                                value={data.activation_code}
                                type="text"
                            />
                        </CustomField>
                        <CustomField label="Favicon" className="mb-5">
                            <Input
                                type="text"
                            />
                        </CustomField>
                        <RadioCard.Root
                            defaultValue="red"
                            justify="center"
                            maxW="auto"
                            className="flex-row gap-2 justify-start"
                        >
                            <RadioCard.Item
                                value="red"
                                className=""
                                bg="red"
                                w="120px"
                            >
                                <RadioCard.ItemHiddenInput />
                                <RadioCard.ItemControl>
                                    <RadioCard.ItemText ms="-4">
                                        Red
                                    </RadioCard.ItemText>
                                </RadioCard.ItemControl>
                            </RadioCard.Item>
                            <RadioCard.Item value="green">
                                <RadioCard.ItemHiddenInput />
                                <RadioCard.ItemControl>
                                    <RadioCard.ItemText ms="-4">
                                        Green
                                    </RadioCard.ItemText>
                                </RadioCard.ItemControl>
                            </RadioCard.Item>
                            <RadioCard.Item value="blue">
                                <RadioCard.ItemHiddenInput />
                                <RadioCard.ItemControl>
                                    <RadioCard.ItemText ms="-4">
                                        Blue
                                    </RadioCard.ItemText>
                                </RadioCard.ItemControl>
                            </RadioCard.Item>
                        </RadioCard.Root>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell className="w-1/3">
                        Others
                    </Table.Cell>
                    <Table.Cell>
                        primary
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table.Root>
    </AppLayout>
}
