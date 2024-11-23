import React, { PropsWithChildren } from "react";

import { CSRFToken, FormHandler } from "@reactivated";
import { FieldMap } from "reactivated/dist/forms";
import { Alert } from "../alert/Alert";

interface BasicFormWithCustomFieldsProps<T extends FieldMap> {
  form: FormHandler<T>;
  submitButtonLabel: string;
  onFormSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const BasicFormWithCustomFields = <T extends FieldMap>({
  form,
  submitButtonLabel,
  onFormSubmit,
  children,
}: PropsWithChildren<BasicFormWithCustomFieldsProps<T>>) => {
  return (
    <form method="POST" onSubmit={onFormSubmit} encType="multipart/form-data">
      <CSRFToken />
      {form.nonFieldErrors?.map((error) => (
        <Alert key={error} type="error">
          {error}
        </Alert>
      ))}
      {children}
      <button type="submit" className="btn btn-primary btn-lg my-4 w-full">
        {submitButtonLabel}
      </button>
    </form>
  );
};
