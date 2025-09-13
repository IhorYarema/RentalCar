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

            <div className={css.inputDiv}>
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
