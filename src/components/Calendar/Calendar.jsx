import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./Calendar.module.css";

const Calendar = ({ selectedDate, onChange, placeholder = "Booking date" }) => {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <DatePicker
      selected={selectedDate ? new Date(selectedDate) : null}
      onChange={onChange}
      dateFormat="MMMM d, yyyy"
      formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
      placeholderText={placeholder}
      className={css.calendar}
      calendarStartDay={1} // тиждень починається з понеділка
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div>
          {/* Місяць/рік і стрілки */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              type="button"
              style={{
                color: "rgba(52, 112, 255, 1)",
                border: "none",
                background: "transparent",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 34 32"
                aria-hidden="true"
                className={css.svgLeft}
              >
                <use href={"/icons.svg#icon-arrow"} />
              </svg>
            </button>
            <span style={{ fontWeight: 600 }}>
              {date.toLocaleString("en-US", { month: "long", year: "numeric" })}
            </span>
            <button
              type="button"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              style={{
                color: "rgba(52, 112, 255, 1)",
                border: "none",
                background: "transparent",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 34 32"
                aria-hidden="true"
                className={css.svgRight}
                fill="rgba(52, 112, 255, 1)"
              >
                <use href={"/icons.svg#icon-arrow"} />
              </svg>
            </button>
          </div>

          {/* Дні тижня */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "600",
              fontSize: "12px",
              color: "rgba(141, 146, 154, 1)",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {weekDays.map((day) => (
              <div key={day} style={{ width: "2rem", textAlign: "center" }}>
                {day}
              </div>
            ))}
          </div>
        </div>
      )}
    />
  );
};

export default Calendar;
