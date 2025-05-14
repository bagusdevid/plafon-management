import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import DatePicker from "react-datepicker";
import {useContext} from "react";
import {DateRangeContext} from "@/Components/DateRange";

export function DateStart({...props}) {

    const {startDate, endDate} = useContext(DateRangeContext)

    return <div>
        <DatePicker
            selected={startDate}
            // onChange={(date) => setStartDate(date)}
            selectsStart
            dateFormat="MMM d, yyyy"
            startDate={startDate}
            placeholderText="Select date start"
            endDate={endDate}
            showDisabledMonthNavigation
            className="border border-solid border-neutral-300 rounded outline-neutral-400 text-sm px-3 py-2"
            {...props}
        />
    </div>
}
