import {CoursType} from "../CoursType";
import {CourseCell} from "../CoursCell/CoursCell";
import './WeekCell.css';

type WeekCellProps = {
    calendarByWeek: any;
}

export const DayCell = ({calendarByWeek}: WeekCellProps) => {
    return (
        <div className={'day_cell_container'}>
            <strong>{calendarByWeek[0]}</strong>
            {calendarByWeek[1].map((dayCourses: CoursType) => {
                return (
                    <CourseCell cours={dayCourses} key={dayCourses.id}/>
                )
            })
            }
        </div>
    );
}