import { useState } from "react";
import { CoursType } from "./CoursType";

export const CalendarPart = () => {
  const [calendar, setCalendar] = useState<CoursType[]>([]);

  const getAllInformations = async () => {
    let myHeaders = new Headers();
    myHeaders.append(
      "Cookie",
      "ARRAffinity=22a7daa836b64a8ce56c907737553d08297ff2e76cd06a1f52c29956b9a85c17; ARRAffinitySameSite=22a7daa836b64a8ce56c907737553d08297ff2e76cd06a1f52c29956b9a85c17",
    );

    let requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(
      "https://calendar-epsi.azurewebsites.net/Calendar/getAllCalendar",
      requestOptions,
    );
    const data = await response.json();
    setCalendar(data.filter((cours: CoursType) => cours.levelAcademyId === 2));
  };

  return (
    <div>
      <button onClick={getAllInformations}>showIt</button>
      <button
        onClick={() => {
          console.log(calendar);
        }}
      >
        showCalendar
      </button>
    </div>
  );
};
