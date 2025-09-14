import { useEffect } from "react";
import { toast } from "react-toastify";

export const useFormikToastErrors = (errors, touched, submitCount = 0) => {
  useEffect(() => {
    if (submitCount > 0) {
      Object.entries(errors).forEach(([field, message]) => {
        if (touched[field]) {
          toast.error(`${field}: ${message}`);
        }
      });
    }
  }, [errors, touched, submitCount]);
};
