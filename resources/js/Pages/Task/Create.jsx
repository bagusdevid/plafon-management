import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import {Button, Field, FileUpload, Input, NativeSelect, Stack} from "@chakra-ui/react";
import {CustomField} from "@/Components/Forms/index.jsx";
import {useForm} from "@inertiajs/react";
import {HiUpload} from "react-icons/hi";
import {IoMdClose} from "react-icons/io";
import {useRef, useState} from "react";
import {FaKey, FaPlaneDeparture, FaRegPaperPlane} from "react-icons/fa6";
import {IoGlobeOutline} from "react-icons/io5";

export default function Create({sites}) {

    const initialValues = {
        site_id: '',
        name: '',
        photo: '',
        thumbs_inside: [],
        options: [],

    }
    const dataForm = useForm(initialValues)

    const [addOptionOpen, setAddOptionOpen] = useState(false)

    const optionRef = useRef('')
    const handleAddOption = () => {
        // console.log(optionRef.current.value)
        if(optionRef.current.value) {
            dataForm.setData('options', [...dataForm.data.options, {icon: '', label: optionRef.current.value}])
            optionRef.current.value = '';
            setAddOptionOpen(false)
        }
    }

    const handleDeleteOption = (key) => {
        const filtered = dataForm.data.options.filter((option, k) => key !== k)
        dataForm.setData('options', filtered)
    }

    const iconItems = [
        {value: 'FaRegPaperPlane', title: <FaRegPaperPlane />},
        {value: 'FaPlaneDeparture', title: <FaPlaneDeparture />},
        {value: 'IoGlobeOutline', title: <IoGlobeOutline />},
        {value: 'FaKey', title: <FaKey />}
    ]

    const submit = (e) => {
        e.preventDefault();
        // console.log(dataForm.data)
        dataForm.post('/tasks/create');
    }

    const handleThumbsChange = (e) => {
        let arr = [];
        for(let x=0;x<e.target.files.length;x++) {
            arr.push(e.target.files[x])
        }
        dataForm.setData('thumbs_inside', arr);
    }

    return <AppLayout title="Task">
        <PageTitle>
            Create task
        </PageTitle>
        <div className="w-2/3 mx-auto">
            <form onSubmit={submit}>
            <div className="px-10 py-7 rounded-md bg-neutral-100 mb-5">
                <Stack gap={3} css={{ "--field-label-width": "160px" }}>
                    <CustomField label="Site" orientation="horizontal" invalid={dataForm.errors.site_id} isRequired>
                        <NativeSelect.Root
                            bg="white"
                        >
                            <NativeSelect.Field
                                value={dataForm.data.site_id}
                                onChange={(e) => dataForm.setData('site_id', e.target.value)}
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
                        {dataForm.errors.site_id ? <Field.ErrorText>{dataForm.errors.site_id}</Field.ErrorText> : ''}
                    </CustomField>
                    <CustomField label="Name" orientation="horizontal" invalid={dataForm.errors.name} isRequired>
                        <div className="flex-1">
                            <Input
                                value={dataForm.data.name}
                                onChange={(e) => dataForm.setData('name', e.target.value)}
                                bg="white"
                                type="text"
                                placeholder="Enter your name"
                            />
                            {dataForm.errors.name ? <Field.ErrorText>{dataForm.errors.name}</Field.ErrorText> : ''}
                        </div>
                    </CustomField>
                    <CustomField
                        className="items-start"
                        label="Photo" orientation="horizontal" invalid={dataForm.errors.photo} isRequired>
                        <div className="flex-1">
                            <FileUpload.Root
                                value={dataForm.data.photo}
                                onChange={(e) => dataForm.setData('photo', e.target.files[0])}
                                // onChange={(e) => console.log(e.target.files)}
                            >
                                <FileUpload.HiddenInput />
                                <FileUpload.Trigger asChild>
                                    <Button variant="outline" bg="white" size="xs">
                                        <HiUpload /> Upload file
                                    </Button>
                                </FileUpload.Trigger>
                                <FileUpload.List showSize clearable />
                            </FileUpload.Root>
                            {dataForm.errors.photo ? <Field.ErrorText>{dataForm.errors.photo}</Field.ErrorText> : ''}
                        </div>
                    </CustomField>
                    <CustomField
                        className="items-start"
                        label="Thumbnail inside" orientation="horizontal">
                        <div className="flex-1">
                            <FileUpload.Root
                                maxFiles={5}
                                onChange={(e) => handleThumbsChange(e)}
                            >
                                <FileUpload.HiddenInput />
                                <FileUpload.Trigger asChild>
                                    <Button variant="outline" bg="white" size="xs">
                                        <HiUpload /> Upload file
                                    </Button>
                                </FileUpload.Trigger>
                                <FileUpload.List clearable />
                            </FileUpload.Root>
                        </div>
                    </CustomField>
                    <CustomField
                        className="items-start"
                        label="Options"
                        orientation="horizontal"
                    >
                        <div className="flex-1">
                            <div>
                                {dataForm.data.options.map((option, key) => {
                                    return <div className="flex gap-2 items-center mb-1" key={key}>
                                        <div className="border border-solid border-neutral-300 bg-white text-sm px-3 py-1 rounded">
                                            {option.label}
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => handleDeleteOption(key)}
                                                type="button"
                                                className="text-red-500 cursor-pointer">
                                                <IoMdClose />
                                            </button>
                                        </div>
                                    </div>
                                })}
                            </div>
                            {addOptionOpen ? <div className="border border-solid border-neutral-300 px-2 py-2 mb-2">
                                <Input ref={optionRef} placeholder="Masukkan pilihan" className="mb-1 bg-white" />
                                <div>
                                    <Button
                                        onClick={handleAddOption}
                                        type="button"
                                        size="xs"
                                        variant="solid"
                                        colorPalette="green">OK</Button>
                                    <Button
                                        onClick={() => setAddOptionOpen(false)}
                                        type="button"
                                        size="xs"
                                        variant="ghost"
                                        colorPalette="red"
                                    >Cancel</Button>
                                </div>
                            </div> : ''}
                            <Button
                                onClick={() => setAddOptionOpen(true)}
                                type="button"
                                size="xs"
                                variant="surface"
                                bg="white"
                                disabled={addOptionOpen}
                            >
                                Add option
                            </Button>
                        </div>
                    </CustomField>
                </Stack>
            </div>
            <Button type="submit">
                Submit
            </Button>
            </form>
        </div>
    </AppLayout>
}
