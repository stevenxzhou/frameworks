import { useEffect, useState } from "react";

const Calendar = () => {

    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getUTCFullYear());
    const [days, setDays] = useState([]);

    const getDays = () => {
        // check first week day for the month. 
        let date = new Date(year, month, 1);
        let curMonthStartWeekDay = date.getDay();
        let curMonthDays = new Date(year, month + 1, 0).getDate();
        let preMonthDays = new Date(year, month, 0).getDate();
        let daysHolder = [];

        // Fill with prev month days.
        for (let d = preMonthDays - curMonthStartWeekDay + 1; d < preMonthDays + 1; d++) {
            daysHolder.push([false, d]);
        }

        // Fill with current month days.
        for (let d = 1; d < curMonthDays + 1; d++) {
            daysHolder.push([true, d]);
        }

        // Fill with next month days.
        let remainingSlots = 35 - curMonthDays - curMonthStartWeekDay;
        if (remainingSlots < 0) {
            remainingSlots = 42 - curMonthDays - curMonthStartWeekDay;
        }

        for (let d = 1; d < remainingSlots + 1; d++) {
            daysHolder.push([false, d]);
        }
        return daysHolder;
    }

    useEffect(() => {
        setDays(getDays());
    }, [month, year])

    return (
        <div class="bg-white shadow-lg rounded-lg p-6 w-80">
            {/* <!-- Month and Year Picker --> */}
            <div class="flex justify-between items-center mb-4">
                <button class="bg-gray-200 p-2 rounded hover:bg-gray-300" id="prev-month" disabled={month === 0} onClick={() => month - 1 >= 0 ? setMonth(month - 1) : setMonth(0)}>←</button>
                <div>
                    <select id="month-picker" class="border rounded px-2 py-1" value={month} onChange={(e) => setMonth(e.target.value)}>
                        <option value="0">January</option>
                        <option value="1">February</option>
                        <option value="2">March</option>
                        <option value="3">April</option>
                        <option value="4">May</option>
                        <option value="5">June</option>
                        <option value="6">July</option>
                        <option value="7">August</option>
                        <option value="8">September</option>
                        <option value="9">October</option>
                        <option value="10">November</option>
                        <option value="11">December</option>
                    </select>
                    <select id="year-picker" class="border rounded px-2 py-1" value={year} onChange={(e) => setYear(e.target.value)}>
                        <option>2025</option>
                        <option>2024</option>
                        <option>2023</option>
                        {/* <!-- Add more years as needed --> */}
                    </select>
                </div>
                <button class="bg-gray-200 p-2 rounded hover:bg-gray-300" disabled={month + 1 === 12} id="next-month" onClick={() => month + 1 <= 12 ? setMonth(month + 1) : setMonth(12)}>→</button>
            </div>

            {/* <!-- Calendar Grid --> */}
            <div class="grid grid-cols-7 gap-2 text-center">
                <div class="font-bold">Sun</div>
                <div class="font-bold">Mon</div>
                <div class="font-bold">Tue</div>
                <div class="font-bold">Wed</div>
                <div class="font-bold">Thu</div>
                <div class="font-bold">Fri</div>
                <div class="font-bold">Sat</div>

                {/* <!-- Placeholder for calendar dates --> */}
                {days.map((d)=> {
                    return <div className={!d[0] ? "text-gray-500": ""} class="hover:bg-yellow-100 cursor-pointer">{d[1]}</div>
                })}
                
                {/* <!-- Add dates dynamically as needed --> */}
            </div>
        </div>)
}

export default Calendar;