import DatePicker from "react-datepicker";
import {useContext} from "react";
import {DateRangeContext} from "@/Components/DateRange/index.jsx";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";

export function DateEnd({...props}) {

    const {endDate, startDate} = useContext(DateRangeContext)

    return <div>
        <DatePicker
            selected={endDate}
            // onChange={(date) => setEndDate(date)}
            selectsEnd
            dateFormat="MMM d, yyyy"
            startDate={startDate}
            placeholderText="Select date end"
            endDate={endDate}
            minDate={startDate}
            className="border border-solid border-neutral-300 rounded outline-neutral-400 text-sm px-3 py-2"
            {...props}
        />
    </div>
}
