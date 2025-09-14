import { useDispatch, useSelector } from "react-redux";
import { bookCarThunk } from "../../redux/booking/bookingSlice";
import { selectBookingLoading } from "../../redux/booking/selectors";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import css from "./BookForm.module.css";
import Loader from "../Loader/Loader";
import { useFormikToastErrors } from "../../utils/useFormikToastErrors";
import Calendar from "../Calendar/Calendar";
import { submitBooking } from "../../utils/submitBooking";

const BookForm = ({ carId }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectBookingLoading);

  // Схема валідації через Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    bookingDate: Yup.date(),
    comment: Yup.string(),
  });

  // пуш-повідомлення
  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    submitBooking(
      dispatch,
      bookCarThunk,
      carId,
      values,
      resetForm,
      setSubmitting
    );
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
      {({ errors, touched, isSubmitting }) => {
        useFormikToastErrors(errors, touched);
        return (
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
              </div>

              <div className={css.inputDiv}>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email*"
                  className={css.input}
                />
              </div>

              <div className={css.inputDiv}>
                <Field name="bookingDate" className={css.input}>
                  {({ field, form }) => (
                    <Calendar
                      selectedDate={field.value ? new Date(field.value) : null}
                      onChange={(date) =>
                        form.setFieldValue("bookingDate", date)
                      }
                    />
                  )}
                </Field>
              </div>

              <div className={`${css.inputDiv} ${css["last-inputDiv"]}`}>
                <Field
                  type="text"
                  name="comment"
                  placeholder="Comment"
                  className={`${css.input} ${css["last-input"]}`}
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
          </Form>
        );
      }}
    </Formik>
  );
};

export default BookForm;
