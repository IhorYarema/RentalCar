import { useEffect } from "react";
import { toast } from "react-toastify";

export const useFormikToastErrors = (errors, touched) => {
  useEffect(() => {
    Object.entries(errors).forEach(([field, message]) => {
      if (touched[field]) toast.error(`${field}: ${message}`);
    });
  }, [errors, touched]);
};
