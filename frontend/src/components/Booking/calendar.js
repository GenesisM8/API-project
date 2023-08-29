// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { submitBooking } from "../../store/bookings"; 
// import "./calendar.css";

// const formatDate = (date) => {
//   if (!date) return '';
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

// const Calendar = ({ selectedStartDate, selectedEndDate, onDatesChange, spotId, bookedDates }) => {
//   const dispatch = useDispatch();
//   const [errorMessage, setErrorMessage] = useState('');
//   const [startDate, setStartDate] = useState(selectedStartDate ? new Date(selectedStartDate) : null);
//    const [endDate, setEndDate] = useState(selectedEndDate ? new Date(selectedEndDate) : null);
   

//   useEffect(() => {
//     if (selectedStartDate) {
//       const date = new Date(selectedStartDate);
//       const isLastDayOfMonth = date.getDate() === new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
//       if (isLastDayOfMonth) {
//         date.setMonth(date.getMonth() + 1);
//         date.setDate(1);
//       } else {
//         date.setDate(date.getDate() + 1);
//       }
//       setEndDate(date);
//     }
//   }, [selectedStartDate]);

//  const handleDateChange = (date, isStartDate) => {
//     if (isStartDate) {
//       setStartDate(date ? new Date(date) : null);
//       if (!endDate || (date && endDate && date > endDate)) {
//         setEndDate(date ? new Date(date) : null);
//       }
//     } else {
//       setEndDate(date ? new Date(date) : null);
//     }
//   };


//   const handleBookingSubmit = () => {
//     // Validate the dates before submitting the booking
//     const startDateObj = startDate ? new Date(startDate) : null;
//     const endDateObj = endDate ? new Date(endDate) : null;

//     if (endDateObj <= startDateObj) {
//       setErrorMessage('End date should be after the start date.');
//       return;
//     }

//     // Check if the selected dates are available
//     const isDatesAvailable = bookedDates.every((booking) => {
//       const bookingStartDate = new Date(booking.startDate);
//       const bookingEndDate = new Date(booking.endDate);
//       return (
//         (startDateObj >= bookingEndDate || endDateObj <= bookingStartDate)
//       );
//     });

//     if (!isDatesAvailable) {
//       setErrorMessage('The selected dates are not available. Please choose different dates.');
//       return;
//     }
//     // Clear the error message if the dates are available
//     setErrorMessage('');
//     dispatch(submitBooking(spotId, startDateObj, endDateObj));
//   };


//   const isDateBooked = (date) => {
//     const formattedDate = formatDate(date);
//     return bookedDates.some((booking) => {
//       const startDate = new Date(booking.startDate);
//       const endDate = new Date(booking.endDate);
//       return formattedDate >= formatDate(startDate) && formattedDate <= formatDate(endDate);
//     });
//   };

//     const renderCustomDay = (date, dateModifiers) => {
//     if (isDateBooked(date)) {
//       return (
//         <div className="DayPicker-Day" style={{ background: '#f0f0f0' }}>
//           <span className="DayPicker-DayLabel">{date.getDate()}</span>
//         </div>
//       );
//     }

//     return (
//       <div className="DayPicker-Day" {...dateModifiers}>
//         <span className="DayPicker-DayLabel">{date.getDate()}</span>
//       </div>
//     );
//   };

//   return (
//     <div className="calendar">
//       <div className='calendar-dates'>
//         <div className='calendar-left'>
//           <label>Check-in</label>
//           <input
//             className={`calendar-input ${isDateBooked(startDate) ? 'booked' : ''}`}
//             type="date"
//             // value={formatDate(startDate)}
//             onChange={(e) => handleDateChange(e.target.value, true)}
//           />
//         </div>
//         <div className='calendar-left'>
//           <label>Check-out</label>
//           <input
//             className={`calendar-input ${isDateBooked(endDate) ? 'booked' : ''}`}
//             type="date"
//             // value={formatDate(endDate)}
//             onChange={(e) => handleDateChange(e.target.value, false)}
//           />
//         </div>
//       </div>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       <button onClick={handleBookingSubmit} className="reserveButton">Reserve</button>
//     </div>
//   );
// };

// export default Calendar;


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitBooking } from "../../store/bookings";
import "./calendar.css";

const formatDate = (date) => {
  if (!date) return '';
  
  // Check if the date parameter is already a Date object
  if (!(date instanceof Date)) {
    // If it's not a Date object, assume it's an ISO string and create a new Date object
    date = new Date(date);
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate() ).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const CalendarDay = ({ day, isBooked, onClick }) => (
  <button
    className={`calendar-day ${isBooked ? 'booked-day' : ''}`}
    onClick={onClick}
    disabled={isBooked}
  >
    {day}
  </button>
);

const Calendar = ({ onDatesChange, spotId, bookedDates }) => {
  const dispatch = useDispatch();
   const selectedStartDate = useSelector((state) => state.bookings.checkInDate);
  const selectedEndDate = useSelector((state) => state.bookings.checkOutDate);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [isCheckInSelected, setIsCheckInSelected] = useState(false);

  const handleDateChange = (date, isStart) => {
    if (isStart) {
      onDatesChange({ startDate: date, endDate: selectedEndDate });
      setIsCheckInSelected(false);
    } else {
      onDatesChange({ startDate: selectedStartDate, endDate: date });
      setIsCheckInSelected(true);
    }
    setShowCalendar(false);
  };

  const isDateBooked = (date) => {
    for (const { startDate, endDate } of bookedDates) {
      const currentDate = new Date(date).getTime();
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      if (currentDate >= start && currentDate <= end) {
        return true;
      }
    }
    return false;
  };

  const renderCalendarDays = () => {
    const today = new Date();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const calendarDays = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const calendarRow = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfWeek) || day > daysInMonth) {
          calendarRow.push(null);
        } else {
          const date = new Date(year, month, day);
          const formattedDate = formatDate(date);
          const isBooked = isDateBooked(formattedDate);
          calendarRow.push(
            <CalendarDay
              key={formattedDate}
              day={day}
              isBooked={isBooked}
              onClick={() => handleDateChange(formattedDate, isCheckInSelected)}
            />
          );
          day++;
        }
      }
      calendarDays.push(<div key={i} className="calendar-row">{calendarRow}</div>);
    }

    return calendarDays;
  };

  const handleMonthChange = (increment) => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + increment);
      return newMonth;
    });
  };

  const handleCheckInClick = () => {
    setShowCalendar(true);
    setIsCheckInSelected(true);
  };

  const handleCheckOutClick = () => {
    setShowCalendar(true);
    setIsCheckInSelected(false);
  };

const handleBookClick = () => {
    // Handle booking here and submit to the server
    const bookingData = {
      spotId,
      startDate: formatDate(selectedStartDate),
      endDate: formatDate(selectedEndDate),
    };
    dispatch(submitBooking(bookingData));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => handleMonthChange(-1)}>&lt;</button>
        <h2>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={() => handleMonthChange(1)}>&gt;</button>
      </div>
      <div className="calendar-grid">
        <div className="calendar-row">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>
        {showCalendar && renderCalendarDays()}
      </div>
      <div className="calendar-actions">
        <button onClick={handleCheckInClick}>Check In</button>
        <button onClick={handleCheckOutClick}>Check Out</button>
        {selectedStartDate && selectedEndDate && (
          <button onClick={handleBookClick}>Book</button>
        )}
      </div>
    </div>
  );
};

export default Calendar;


