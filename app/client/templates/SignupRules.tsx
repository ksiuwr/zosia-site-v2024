import { Layout } from "@client/components/Layout";
import React from "react";
import Markdown from "react-markdown";

const signupRulesMarkdown = `
## Instrukcja zapisów

1. Stwórz konto za pomocą przycisku "Sign up". Jako Email podaj
adres w domenie **cs.uni.wroc.pl** lub dowolnej innej*.  
Konta zakładane na naszej stronie w przeszłości zostały usunięte.

2. By zarejestrować się na najbliższą edycję ZOSI na stronie głównej
lub w swoim profilu w zakładce ZOSIA kliknij przycisk **REGISTER**.

3.  Uzupełnij kwestionariusz. W polu **Information** koniecznie wpisz
swoje preferencje przy wyborze pokoju. Potrzebujemy wiedzieć czy
wolisz pokój z łóżkiem podwójnym, a może pokój jednoosobowy, czy
wolisz pokój w cichym zakątku hotelu, czy masz już wybraną osobę
współlokatorską, wolisz wybrać ją później, czy może jest Ci to
obojętne. Prosimy o uzupełnienie tego pola.

4. Wyślij formularz i gotowe!

Jako osoba zaproszona posiadasz specjalny priorytet i możesz wybrać
pokój przed resztą uczestników. Do 31 grudnia mamy najwięcej
możliwości, by pomóc Ci w wyborze pokoju. Po podanej dacie dalej
jesteśmy do Twojej dyspozji i zawsze służymy pomocą. Natomiast im
bliżej do daty rozpoczęcia Konferencji, tym nasz zasób pokoi będzie
coraz bardziej ograniczony.

W razie jakichkolwiek pytań lub problemów, zachęcamy do kontaktu: 
[ksi@cs.uni.wroc.pl](mailto:ksi@cs.uni.wroc.pl)

*W przypadku rejestracji konta w innej domenie prosimy o informację
mailową. Dziękujemy.
`;

export const Template = () => {
  return (
    <Layout>
      <article className="prose mx-auto my-10">
        <h1 className="text-center">
          Zapisy dla Zaproszonych na Zimowy Obóz Studentów Informatyki A
        </h1>
        <Markdown>{signupRulesMarkdown}</Markdown>
      </article>
    </Layout>
  );
};
