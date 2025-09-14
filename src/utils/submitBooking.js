import { toast } from "react-toastify";

/**
 *
 * @param {object} dispatch
 * @param {function} thunk
 * @param {string|number} id
 * @param {object} values
 * @param {function} resetForm
 * @param {function} setSubmitting
 */

export const submitBooking = async (
  dispatch,
  thunk,
  id,
  values,
  resetForm,
  setSubmitting
) => {
  setSubmitting(true);
  try {
    await dispatch(thunk({ id, formData: values })).unwrap();
    toast.success("The car has been successfully booked!");
    resetForm();
  } catch (err) {
    if (err.fieldErrors) {
      Object.entries(err.fieldErrors).forEach(([field, message]) => {
        toast.error(`${field}: ${message}`);
      });
    } else {
      toast.error(err.message || "Something went wrong");
    }
  } finally {
    setSubmitting(false);
  }
};
