import React from "react";

import { CSRFToken, FieldHandler, FormHandler } from "@reactivated";
import { FieldMap } from "reactivated/dist/forms";
import { Alert } from "../Alert";
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
          // @ts-expect-error Typescript complains about this conversion, but it can't be avoided without changing types exposed by Reactivated.
          // The conversion is safe, because `field`'s type is more specific than FieldHandler.
          field={field as FieldHandler}
        />
      ))}
      <button type="submit" className="btn btn-primary btn-lg my-4 w-full">
        {submitButtonLabel}
      </button>
    </form>
  );
};
