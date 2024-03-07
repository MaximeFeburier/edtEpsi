import {useEffect, useState} from "react";
import {CoursType} from "./CoursType";
import "./CalendarPart.css";
import dayjs, {Dayjs} from "dayjs";
import {MenuItem, Select} from "@mui/material";
import {WeekPickerComp} from "./DateSelectPeriod/WeekPicker";
import {DayCell} from "./WeekCell/DayCell";

export const CalendarPart = () => {
    const [calendarAll, setCalendarAll] = useState<CoursType[]>([]);
    const [calendar, setCalendar] = useState<CoursType[]>([]);
    const [calendarByWeek, setCalendarByWeek] = useState<any>({});
    const [dateSelectedStart, setDateSelectedStart] = useState<Dayjs | null>(dayjs(new Date()));
    const [dateSelectedEnd, setDateSelectedEnd] = useState<Dayjs | null>(dayjs(new Date()));
    const [groupSelected, setGroupSelected] = useState<number>(2);

    const getAllInformations = async () => {
        let myHeaders = new Headers();
        let requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
        };

        //https://calendar-epsi.azurewebsites.net/Calendar/getAllCalendar to add after url request are fixed
        const response = await fetch(
            "./FakeData/GetAllCalendar.json",
            requestOptions,
        );
        const data = await response.json();
        setCalendarAll(data);
        filteredCalendar();
    };

    const filteredCalendar = () => {
        const filteredCalendar = calendarAll.filter((cours: CoursType) => {
            return (dayjs(cours.date).isBetween(dateSelectedStart, dateSelectedEnd, 'day') || dayjs(cours.date).isSame(dateSelectedStart) || dayjs(cours.date).isSame(dateSelectedEnd)) && cours.levelAcademyId === groupSelected;
        });
        return filteredCalendar;
    }

    const separateAsDay = (calendar: CoursType[]) => {
        const calendarByDay = calendar.reduce((acc: any, cours: CoursType) => {
            const date = dayjs(cours.date).format('YYYY-MM-DD');
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(cours);
            return acc;
        }, {});

        return calendarByDay;
    }

    useEffect(() => {
        getAllInformations();
        setCalendar(filteredCalendar());
    }, []);

    useEffect(() => {
        setCalendar(filteredCalendar());
    }, [dateSelectedStart, groupSelected, calendarAll]);

    useEffect(() => {
        setCalendarByWeek(separateAsDay(calendar));
    }, [calendar])

    useEffect(() => {
        setCalendar(filteredCalendar());
    }, [calendarAll]);

    return (
        <div className='calendarContainer'>
            <div className='calendarSearch'>
                <Select
                    value={groupSelected}
                    onChange={(event) => {
                        setGroupSelected(+event.target.value)

                    }}
                    defaultValue={2}
                >
                    <MenuItem value={1}>Groupe A</MenuItem>
                    <MenuItem value={2}>Groupe B</MenuItem>
                    <MenuItem value={3}>Groupe C</MenuItem>
                </Select>
                <WeekPickerComp dateSelectedStart={dateSelectedStart} setDateSelectedStart={setDateSelectedStart}
                                dateSelectedEnd={dateSelectedEnd} setDateSelectedEnd={setDateSelectedEnd}/>
            </div>
            <div className={'weekcell_container'}>
                {Object.entries(calendarByWeek).map((week) => {
                    return (<DayCell calendarByWeek={week}/>);
                })}
            </div>
        </div>
    );
};
