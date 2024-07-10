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
          // @ts-expect-error Typescript complains about this conversion, but it can't be avoided without changing types exposed by Reactivated.
          // The conversion is safe, because `field`'s type is more specific than FieldHandler.
          field={field as FieldHandler}
        />
      ))}
    </BasicFormWithCustomFields>
  );
};
