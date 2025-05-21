import {Head} from "@inertiajs/react";

export default function Main({response}) {

    console.log(JSON.parse(response))

    return <>
        <Head title="Tele Bot" />
        <div className="px-10 py-10">
            tes ajah
        </div>
    </>
}
