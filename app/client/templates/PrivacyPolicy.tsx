import { CenteredContainer } from "@client/components/containers/CenteredContainer";
import { Layout } from "@client/components/Layout";
import React from "react";
import Markdown from "react-markdown";

const privacyPolicyMarkdown = `
Ostatnia aktualizacja: 19:30 13/11/2025

## Informacja o plikach cookies

zosia.org używa plików cookie wyłącznie do zarządzania sesją użytkownika i ochrony przed atakami CSRF. Dodatkowe pliki cookie, związane z bezpieczeństwem i funkcjonowaniem strony, stosuje także nasz dostawca DNS, Cloudflare. Pliki te są niezbędne do prawidłowego działania serwisu i nie można z nich zrezygnować.

## Polityka prywatności

Akceptując politykę prywatności, wyrażasz zgodę na przetwarzanie podanych przez siebie danych osobowych (imię, nazwisko, e-mail) zgodnie z art. 6 ust. 1 lit. a RODO.

Przetwarzamy również dane kontaktowe i numer indeksu studenta podany w formularzu zapisu oraz inne nieokreślone dobrowolnie przekazane dane osobowe w formularzach, na tej samej podstawie prawnej.

Dane służą wyłącznie organizacji i obsłudze wydarzenia. Podanie danych jest dobrowolne, ale niezbędne do udziału w konferencji. Odmowa ich podania lub żądanie ich usunięcia może uniemożliwić udział w wydarzeniu.

Twoje imię i nazwisko będą widoczne dla innych uczestników, którzy opłacili udział: podczas wyboru pokoi i w przypadku proponowania gier planszowych.

Imiona i nazwiska prelegentów oraz osób prowadzących inne punkty programu będą publicznie dostępne na stronie konferencji.

Podczas zgłaszania wykładu możesz wyrazić zgodę na nagrywanie i streamowanie. Zgoda oznacza zezwolenie na publikację nagrania na kanale Koła Studentów Informatyki Uniwersytetu Wrocławskiego. Przed publikacją otrzymasz materiał do wglądu; jeśli nie wniesiesz zastrzeżeń w ciągu tygodnia, nagranie zostanie opublikowane.

Wyrażasz również zgodę na wykorzystanie swojego wizerunku na zdjęciach wykonanych podczas konferencji w celach promocyjnych organizatora i Koła Studentów Informatyki Uniwersytetu Wrocławskiego. Podstawą prawną jest art. 6 ust. 1 lit. a RODO oraz art. 81 ustawy o prawie autorskim i prawach pokrewnych. Zgodę tę możesz wycofać w dowolnym momencie, kontaktując się z administratorem danych.

Dostęp do danych mają wyłącznie organizatorzy oraz podwykonawcy (np. hotel, drukarnia), którzy przetwarzają dane na podstawie umów powierzenia zgodnie z art. 28 RODO, wyłącznie w celu realizacji i prawidłowego przebiegu Konferencji.

Dane mogą być przetwarzane z użyciem usług chmurowych, również poza Europejskim Obszarem Gospodarczym (EOG), z odpowiednimi zabezpieczeniami (np. standardowe klauzule umowne).

Dane będą przechowywane do miesiąca po zakończeniu konferencji, a maksymalnie do roku, jeśli termin wydarzenia ulegnie zmianie.

Wyjątek stanowią powiązane faktury i dane płatności, które są przechowywane przez 5 lat od końca roku kalendarzowego, w którym upłynął termin płatności podatku. Jest to konieczne do wywiązania się z obowiązków prawnych (art. 6 ust. 1 lit. c RODO) oraz dla wykonania umowy (art. 6 ust. 1 lit. b RODO).

Administratorem danych jest:

Fundacja Wrocławskich Studentów Informatyki (KRS: 0001175280)

Z siedzibą przy ul. Św. Mikołaja 8/11 lok. 208, 50-125 Wrocław.

Kontakt e-mail: kontakt.fwsi@gmail.com

Masz prawo do dostępu do danych, ich poprawiania, usunięcia, ograniczenia przetwarzania, przenoszenia, wycofania zgody oraz wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.
`
;

export const Template = () => {
  return (
    <Layout>
      <CenteredContainer>
        <article className="prose mx-auto my-10">
          <h1 className="text-center">
            Polityka Prywatności Zimowego Obozu Studentów Informatyki A
          </h1>
          <Markdown>{privacyPolicyMarkdown}</Markdown>
        </article>
      </CenteredContainer>
    </Layout>
  );
};
