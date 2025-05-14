import "react-datepicker/dist/react-datepicker.css";
import {createContext, useState} from "react";
import {DateStart} from "@/Components/DateRange/DateStart";
import {DateEnd} from "@/Components/DateRange/DateEnd";

export {DateStart, DateEnd}
export const DateRangeContext = createContext();

export default function DateRange({startDate, endDate, flexDirection = 'flex-row', children, ...rest}) {

    return (
        <DateRangeContext.Provider value={{startDate, endDate}}>
            <div className={`flex ${flexDirection} gap-1`} {...rest}>
                {children}
            </div>
        </DateRangeContext.Provider>
    )
}
