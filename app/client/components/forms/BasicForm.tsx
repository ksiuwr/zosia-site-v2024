import React from "react";

import { FieldHandler, FormHandler } from "@reactivated";
import { FieldMap } from "reactivated/dist/forms";
import { BasicFormField } from "./BasicFormField";
import { BasicFormWithCustomFields } from "./BasicFormWithCustomFields";

interface BasicFormProps<T extends FieldMap> {
  form: FormHandler<T>;
  submitButtonLabel: string;
}

export const BasicForm = <T extends FieldMap>({
  form,
  submitButtonLabel,
}: BasicFormProps<T>) => {
  return (
    <BasicFormWithCustomFields
      form={form}
      submitButtonLabel={submitButtonLabel}
    >
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
    </BasicFormWithCustomFields>
  );
};
