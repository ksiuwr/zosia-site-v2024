import { Layout } from "@client/components/Layout";
import React from "react";

export const Template = () => {
  return (
    <Layout>
      <article className="lg:prose-lg prose mx-auto my-10">
        <h1 className="text-center">
          Zapisy dla Zaproszonych na Zimowy Obóz Studentów Informatyki A
        </h1>
        <h2>Instrukcja zapisów</h2>
        <ol>
          <li>
            Stwórz konto za pomocą przycisku {'"Sign up"'}. Jako Email podaj
            adres w domenie <b>cs.uni.wroc.pl</b> lub dowolnej innej*.
            <br />
            Konta zakładane na naszej stronie w przeszłości zostały usunięte.
          </li>
          <li>
            By zarejestrować się na najbliższą edycję ZOSI na stronie głównej
            lub w swoim profilu w zakładce ZOSIA kliknij przycisk{" "}
            <b>REGISTER</b>.
          </li>
          <li>
            Uzupełnij kwestionariusz. W polu <b>Information</b> koniecznie wpisz
            swoje preferencje przy wyborze pokoju. Potrzebujemy wiedzieć czy
            wolisz pokój z łóżkiem podwójnym, a może pokój jednoosobowy, czy
            wolisz pokój w cichym zakątku hotelu, czy masz już wybraną osobę
            współlokatorską, wolisz wybrać ją później, czy może jest Ci to
            obojętne. Prosimy o uzupełnienie tego pola.
          </li>
          <li>Wyślij formularz i gotowe!</li>
        </ol>
        <p>
          Jako osoba zaproszona posiadasz specjalny priorytet i możesz wybrać
          pokój przed resztą uczestników. Do 31 grudnia mamy najwięcej
          możliwości, by pomóc Ci w wyborze pokoju. Po podanej dacie dalej
          jesteśmy do Twojej dyspozji i zawsze służymy pomocą. Natomiast im
          bliżej do daty rozpoczęcia Konferencji, tym nasz zasób pokoi będzie
          coraz bardziej ograniczony.
        </p>
        <p>
          W razie jakichkolwiek pytań lub problemów, zachęcamy do kontaktu:{" "}
          <a href="mailto:ksi@cs.uni.wroc.pl">ksi@cs.uni.wroc.pl</a>.
        </p>
        <p>
          * W przypadku rejestracji konta w innej domenie prosimy o informację
          mailową. Dziękujemy.
        </p>
      </article>
    </Layout>
  );
};
