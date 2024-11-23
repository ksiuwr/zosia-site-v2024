import { AdminCenteredFormContainer } from "@client/components/admin/layout/AdminCenteredFormContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { BasicFormField } from "@client/components/forms/BasicFormField";
import { BasicFormWithCustomFields } from "@client/components/forms/BasicFormWithCustomFields";
import { PageTitle } from "@client/components/PageTitle";
import { templates, useForm } from "@reactivated";
import React from "react";

const exampleCsvFile = `Name,Description,Hidden,AvailableBedsSingle,AvailableBedsDouble,ActualBedsSingle,ActualBedsDouble
189,Ladny pokoj na koncu korytarza,False,3,0,3,0
213,Z balkonem,False,2,1,2,1
217,Z jacuzzi,True,1,0,0,1
304,Poddasze,False,4,1,5,1`;

export const Template = (props: templates.AdminRoomsImport) => {
  const form = useForm({ form: props.form });

  return (
    <AdminLayout>
      <PageTitle>Import rooms</PageTitle>
      <AdminCenteredFormContainer>
        <BasicFormWithCustomFields form={form} submitButtonLabel="Import">
          <BasicFormField field={form.fields.file} />
          <div className="prose max-w-none">
            <p>Please upload a CSV file which looks like the example below:</p>
            <pre>{exampleCsvFile}</pre>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Hidden</th>
                  <th>AvailableBedsSingle</th>
                  <th>AvailableBedsDouble</th>
                  <th>ActualBedsSingle</th>
                  <th>ActualBedsDouble</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>189</td>
                  <td>Ladny pokoj na koncu korytarz</td>
                  <td>False</td>
                  <td>3</td>
                  <td>0</td>
                  <td>3</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>213</td>
                  <td>Z balkonem</td>
                  <td>False</td>
                  <td>2</td>
                  <td>1</td>
                  <td>2</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>217</td>
                  <td>Z jacuzzi</td>
                  <td>True</td>
                  <td>1</td>
                  <td>0</td>
                  <td>0</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>304</td>
                  <td>Poddasze</td>
                  <td>False</td>
                  <td>4</td>
                  <td>1</td>
                  <td>5</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </BasicFormWithCustomFields>
      </AdminCenteredFormContainer>
    </AdminLayout>
  );
};
