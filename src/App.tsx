import React from "react";
import "./App.css";
import { CalendarPart } from "./CalendarPart/CalendarPart";
import { CourseCell } from "./CalendarPart/CoursCell/CoursCell";

function App() {
  return (
    <div className="App">
      <CalendarPart />
      <CourseCell />
    </div>
  );
}

export default App;
