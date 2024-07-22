import React from "react";

import { CSRFToken, FieldHandler, FormHandler } from "@reactivated";
import { FieldMap } from "reactivated/dist/forms";
import { Alert } from "../alert/Alert";
import { BasicFormField } from "./BasicFormField";

interface BasicFormProps<T extends FieldMap> {
  form: FormHandler<T>;
  submitButtonLabel: string;
}

export const BasicForm = <T extends FieldMap>({
  form,
  submitButtonLabel,
}: BasicFormProps<T>) => {
  return (
    <form method="POST">
      <CSRFToken />
      {form.nonFieldErrors?.map((error) => (
        <Alert key={error} type="error">
          {error}
        </Alert>
      ))}
      {form.visibleFields.map((field) => (
        <BasicFormField
          key={field.name}
          // Typescript complains about this conversion, but it can't be avoided without changing types exposed by Reactivated.
          // The conversion is safe, because field's type is more specific than FieldHandler.
          // This approach allows us to automatically render all the fields defined in a Django form.
          // So for example if you add a field to a Django form, no frontend changes will be required.
          field={field as unknown as FieldHandler}
        />
      ))}
      <button type="submit" className="btn btn-primary btn-lg my-4 w-full">
        {submitButtonLabel}
      </button>
    </form>
  );
};
