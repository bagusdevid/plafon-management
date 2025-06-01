import AppLayout from "@/Layouts/AppLayout.jsx";
import PageTitle from "@/Components/PageTitle.jsx";
import {Button, Field, FileUpload, Input, NativeSelect, Stack} from "@chakra-ui/react";
import {CustomField} from "@/Components/Forms/index.jsx";
import {useForm} from "@inertiajs/react";
import {HiUpload} from "react-icons/hi";
import {IoMdClose} from "react-icons/io";
import {useRef, useState} from "react";
import {FaKey, FaPlaneDeparture, FaPlus, FaRegPaperPlane} from "react-icons/fa6";
import {IoGlobeOutline} from "react-icons/io5";
import {FaRegEdit} from "react-icons/fa";
import {AiOutlineEdit} from "react-icons/ai";

export default function Create({task, sites}) {

    const initialValues = {
        site_id: task.site_id,
        name: task.name,
        time_limit: task.time_limit,
        photo: task.photo,
        photo_thumb_path: task.photo_thumb_path,
        thumbs_inside: task.thumbs_inside,
        thumbs_inside_arr: task.thumbs_inside ? task.thumbs_inside.split(',') : [],
        thumbs_inside_path: task.thumbs_inside_path,
        options: task.options,

    }
    const dataForm = useForm(initialValues)

    const [optionForm, setOptionForm] = useState(false)
    const [optionVal, setOptionVal] = useState({
        id: 0,
        label: '',
        cost: ''
    })

    // const optionRef = useRef('')
    // const costRef = useRef('')
    const handleSaveOption = () => {
        if(optionVal.label && optionVal.cost) {
            if(optionVal.id > 0) {
                const mapped = dataForm.data.options.map(mp => {
                    if(mp.id === optionVal.id) {
                        mp.label = optionVal.label;
                        mp.cost = optionVal.cost
                    }

                    return mp;
                })
                dataForm.setData('options', mapped);
            } else {
                dataForm.setData('options', [...dataForm.data.options, {
                    id: optionVal.id,
                    icon: '',
                    label: optionVal.label,
                    cost: optionVal.cost
                }])
            }
            setOptionForm(false)
            setOptionVal({id: 0, label: '', cost: ''})
        }
    }

    const handleDeleteOption = (key) => {
        const filtered = dataForm.data.options.filter((option, k) => key !== k)
        dataForm.setData('options', filtered)
    }

    const handleEditOption = (key) => {
        // console.log(key);
        const data = dataForm.data.options.filter((item, k) => k === key);
        // console.log(data)
        // optionRef.current = data[0].label;
        // costRef = data[0].cost;
        setOptionVal({id: data[0].id, label: data[0].label, cost: data[0].cost})
        setOptionForm(true)
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
        dataForm.post(`/tasks/${task.id}`);
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
            Edit task
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
                        <CustomField label="Time limit" orientation="horizontal" invalid={dataForm.errors.time_limit} isRequired>
                            <div className="flex-1">
                                <Input
                                    value={dataForm.data.time_limit}
                                    onChange={(e) => dataForm.setData('time_limit', e.target.value)}
                                    bg="white"
                                    type="number"
                                    placeholder="Enter time limit"
                                />
                                {dataForm.errors.time_limit ? <Field.ErrorText>{dataForm.errors.time_limit}</Field.ErrorText> : ''}
                            </div>
                        </CustomField>
                        <CustomField
                            className="items-start"
                            label="Photo" orientation="horizontal" invalid={dataForm.errors.photo} isRequired>
                            <div className="flex-1">
                                <div className="mb-3">
                                    <img src={dataForm.data.photo_thumb_path} alt="" />
                                </div>
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
                                <div className="flex gap-2 flex-wrap mb-2">
                                    {dataForm.data.thumbs_inside_path && dataForm.data.thumbs_inside_path.map((thumb, ky) => {
                                        return <div className="w-[70px]" key={ky}>
                                            <img src={thumb} alt="" className="w-full" />
                                        </div>
                                    })}
                                </div>
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
                                                {option.label} - {option.cost}
                                            </div>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => handleEditOption(key)}
                                                    type="button"
                                                    disabled={optionForm}
                                                    className="disabled:text-black/20 cursor-pointer text-blue-500">
                                                    <AiOutlineEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteOption(key)}
                                                    type="button"
                                                    disabled={optionForm}
                                                    className="disabled:text-black/20 text-red-500 cursor-pointer">
                                                    <IoMdClose />
                                                </button>
                                            </div>
                                        </div>
                                    })}
                                </div>
                                {optionForm ? <FormOption
                                    onSave={handleSaveOption}
                                    onCancel={() => setOptionForm(false)}
                                    optionVal={optionVal}
                                    setOptionVal={setOptionVal}
                                /> : ''}
                                <Button
                                    onClick={() => setOptionForm(true)}
                                    type="button"
                                    size="xs"
                                    variant="surface"
                                    bg="white"
                                    disabled={optionForm}
                                >
                                    <FaPlus />
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

function FormOption({optionVal, setOptionVal, onSave, onCancel}) {
    return <div className="border border-solid border-neutral-300 px-2 py-2 mb-2">
        <input type="hidden" value={optionVal.id} />
        <Input
            value={optionVal.label}
            onChange={(e) => setOptionVal({...optionVal, label: e.target.value})}
            placeholder="Masukkan pilihan"
            className="mb-1 bg-white"
        />
        <Input
            value={optionVal.cost}
            onChange={(e) => setOptionVal({...optionVal, cost: e.target.value})}
            type="number"
            placeholder="Masukkan harga/biaya"
            className="mb-1 bg-white"
        />
        <div>
            <Button
                onClick={onSave}
                type="button"
                size="xs"
                variant="solid"
                colorPalette="green">OK</Button>
            <Button
                onClick={onCancel}
                type="button"
                size="xs"
                variant="ghost"
                colorPalette="red"
            >Cancel</Button>
        </div>
    </div>
}
