import {CoursType} from "../CoursType";
import './CoursCell.css';
import dayjs from "dayjs";

type CourseCellProps = {
    cours: CoursType;
};

const toUpperCaseFirstLetterOfEachWord = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
}

export const CourseCell = ({cours}: CourseCellProps) => {
    const isCourseNow = () => {
        const now = dayjs(new Date());
        const start = dayjs(cours.startTime);
        const end = dayjs(cours.endTime);
        return now.isAfter(start) && now.isBefore(end);
    }

    return (
        <div className={'courseCellContainer' + (isCourseNow() ? ' isActive' : '')} key={cours.id}>
            <p className='centerCellContentP'>{cours.courseName}</p>
            <p className='centerCellContentP'>{toUpperCaseFirstLetterOfEachWord(cours.profName)}</p>
            <div className='hoursCourseCell'>
                <p className='centerCellContentP'>{cours.startTime.substring(11)}</p>
                <p className='centerCellContentP'>{cours.endTime.substring(11)}</p>
            </div>
            <p className='centerCellContentP'>{cours.room}</p>
        </div>
    )
};
