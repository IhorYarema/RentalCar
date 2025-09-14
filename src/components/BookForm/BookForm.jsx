import { useDispatch, useSelector } from "react-redux";
import { bookCarThunk, resetBooking } from "../../redux/booking/bookingSlice";
import {
  selectBookingSuccess,
  selectBookingLoading,
  selectBookingError,
} from "../../redux/booking/selectors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./BookForm.module.css";
import Loader from "../Loader/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookForm = ({ carId }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectBookingLoading);
  const success = useSelector(selectBookingSuccess);
  const error = useSelector(selectBookingError);

  // Схема валідації через Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    bookingDate: Yup.date(),
    comment: Yup.string(),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(bookCarThunk({ id: carId, formData: values }));
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        bookingDate: "",
        comment: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.titles}>
            <h3 className={css.formTitle}>Book your car now</h3>
            <p className={css.formText}>
              Stay connected! We are always ready to help you.
            </p>
          </div>
          <div className={css.inputCont}>
            <div className={css.inputDiv}>
              <Field
                type="text"
                name="name"
                placeholder="Name*"
                className={css.input}
              />
              <ErrorMessage
                name="name"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div className={css.inputDiv}>
              <Field
                type="email"
                name="email"
                placeholder="Email*"
                className={css.input}
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            {/* <div className={css.inputDiv}>
              <Field
                type="text"
                name="bookingDate"
                placeholder="Booking date"
                className={css.input}
              />
              <ErrorMessage
                name="bookingDate"
                component="div"
                style={{ color: "red" }}
              />
            </div> */}

            <div className={css.inputDiv}>
              <Field name="bookingDate" className={css.input}>
                {({ field, form }) => (
                  <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => form.setFieldValue("bookingDate", date)}
                    dateFormat="MMMM d, yyyy"
                    formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
                    placeholderText="Booking date"
                    className={css.calendar}
                    calendarStartDay={1} // щоб тиждень починався з понеділка
                    renderCustomHeader={({
                      date,
                      decreaseMonth,
                      increaseMonth,
                      prevMonthButtonDisabled,
                      nextMonthButtonDisabled,
                    }) => {
                      const weekDays = [
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                        "Sun",
                      ];

                      return (
                        <div>
                          {/* Рядок з місяцем/роком і стрілками */}
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
                              style={{
                                color: "rgba(52, 112, 255, 1)",
                                backgroundColor: "transparent",
                                border: "none",
                                alignItems: "center",
                              }}
                            >
                              {"<"}
                            </button>
                            <span style={{ fontWeight: 600 }}>
                              {date.toLocaleString("en-US", {
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                            <button
                              onClick={increaseMonth}
                              disabled={nextMonthButtonDisabled}
                              style={{
                                color: "rgba(52, 112, 255, 1)",
                                backgroundColor: "transparent",
                                border: "none",
                                alignItems: "center",
                              }}
                            >
                              {">"}
                            </button>
                          </div>

                          {/* Дні тижня під місяцем і стрілками */}
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
                              <div
                                key={day}
                                style={{ width: "2rem", textAlign: "center" }}
                              >
                                {day}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }}
                  />
                )}
              </Field>
              <ErrorMessage
                name="bookingDate"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div className={`${css.inputDiv} ${css["last-inputDiv"]}`}>
              <Field
                type="text"
                name="comment"
                placeholder="Comment"
                className={`${css.input} ${css["last-input"]}`}
              />
              <ErrorMessage
                name="comment"
                component="div"
                style={{ color: "red" }}
              />
            </div>
          </div>
          <div className={css.btnDiv}>
            <button
              type="submit"
              disabled={loading || isSubmitting}
              className={css.btn}
            >
              {loading ? <Loader /> : "Send"}
            </button>
          </div>

          {success && (
            <p style={{ color: "green" }}>
              The car has been successfully booked!
            </p>
          )}
          {error && (
            <p style={{ color: "red" }}>
              {typeof error === "string"
                ? error
                : error.message || "Something went wrong"}
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default BookForm;
