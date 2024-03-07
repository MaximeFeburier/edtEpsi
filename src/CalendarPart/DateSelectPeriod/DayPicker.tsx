import {DateCalendar} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import React from "react";

type DateSelectPeriodProps = {
    dateSelected: Dayjs | null;
    setDateSelected:React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>
}

export const DayPicker = ({dateSelected,setDateSelected}:DateSelectPeriodProps) => {
    const [hoveredDay, setHoveredDay] = React.useState<Dayjs | null>(null);

    return (
        <div>
            <DateCalendar defaultValue={dateSelected} value={dateSelected} onChange={(newValue) => setDateSelected(newValue)} slotProps={{
                day: (ownerState) =>
                    ({
                        selectedDay: dateSelected,
                        hoveredDay,
                        onPointerEnter: () => setHoveredDay(ownerState.day),
                        onPointerLeave: () => setHoveredDay(null),
                    } as any),
            }} />
        </div>
    )
}