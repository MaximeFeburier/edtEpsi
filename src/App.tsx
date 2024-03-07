import React from "react";
import "./App.css";
import { CalendarPart } from "./CalendarPart/CalendarPart";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CalendarPart/>
        </LocalizationProvider>
    );
}

export default App;
