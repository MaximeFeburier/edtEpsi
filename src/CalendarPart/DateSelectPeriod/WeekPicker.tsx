import * as React from 'react';
import dayjs, {Dayjs} from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import {styled} from '@mui/material/styles';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {PickersDay, PickersDayProps} from '@mui/x-date-pickers/PickersDay';
import updateLocale from 'dayjs/plugin/updateLocale';


dayjs.extend(isBetweenPlugin);


dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
    weekStart: 1,
    weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
})

interface WeekPicker extends PickersDayProps<Dayjs> {
    isSelected: boolean;
    isHovered: boolean;
}

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})<WeekPicker>(({theme, isSelected, isHovered, day}) => ({
    borderRadius: 0,
    ...(isSelected && {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.main,
        },
    }),
    ...(isHovered && {
        backgroundColor: theme.palette.primary[theme.palette.mode],
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary[theme.palette.mode],
        },
    }),
    ...(day.day() === 1 && {
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
    }),
    ...(day.day() === 0 && {
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
    }),
})) as React.ComponentType<WeekPicker>;

const isInSameWeek = (dayA: Dayjs, dayB: Dayjs | null | undefined) => {
    if (dayB == null) {
        return false;
    }

    return dayA.isSame(dayB, 'week');
};

function Day(
    props: PickersDayProps<Dayjs> & {
        selectedDay?: Dayjs | null;
        hoveredDay?: Dayjs | null;
    },
) {
    const {day, selectedDay, hoveredDay, ...other} = props;

    return (
        <CustomPickersDay
            {...other}
            day={day}
            sx={{px: 2.5}}
            disableMargin
            selected={false}
            isSelected={isInSameWeek(day, selectedDay)}
            isHovered={isInSameWeek(day, hoveredDay)}
        />
    );
}

type DateSelectPeriodProps = {
    dateSelectedStart: Dayjs | null;
    setDateSelectedStart: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>
    dateSelectedEnd: Dayjs | null;
    setDateSelectedEnd: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>
}

export const WeekPickerComp = ({
                                   dateSelectedStart,
                                   setDateSelectedStart,
                                   dateSelectedEnd,
                                   setDateSelectedEnd
                               }: DateSelectPeriodProps) => {
    const [hoveredDay, setHoveredDay] = React.useState<Dayjs | null>(null);
    const [value, setValue] = React.useState<Dayjs | null>(dayjs(new Date()));

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            <DateCalendar
                value={value}
                onChange={(newValue: Dayjs) => {
                    const valueStart = newValue.startOf('week');
                    const valueEnd = newValue.endOf('week');
                    setValue(valueStart);
                    setDateSelectedStart(valueStart);
                    setDateSelectedEnd(valueEnd);
                }}
                showDaysOutsideCurrentMonth
                slots={{day: Day}}
                slotProps={{
                    day: (ownerState) =>
                        ({
                            selectedDay: value,
                            hoveredDay,
                            onPointerEnter: () => setHoveredDay(ownerState.day),
                            onPointerLeave: () => setHoveredDay(null),
                        } as any),
                }}
            />
        </LocalizationProvider>
    );
}