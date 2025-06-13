import { CenteredContainer } from "@client/components/containers/CenteredContainer";
import { Layout } from "@client/components/Layout";
import { getLocalDate } from "@client/utils/time";
import { templates } from "@reactivated";
import React from "react";
import Markdown from "react-markdown";

const privacyPolicyMarkdown = (
  zosiaTitle: string,
  town: string,
  startDate: string,
  endDate: string,
) => `
1. Niniejszy regulamin reguluje zasady obowiązujące osoby
uczestniczące w Ogólnopolskiej Konferencji „${zosiaTitle}”,
zwanej dalej Konferencją, odbywającej się w miejscowości
${town}, w dniach ${startDate} - ${endDate}, a także
definiuje konsekwencje wynikające z nieprzestrzegania tych zasad.

2. Organizatorem Konferencji jest Koło Studentów Informatyki
działające przy Wydziale Matematyki i Informatyki Uniwersytetu
Wrocławskiego, z siedzibą w Instytucie Informatyki Uniwersytetu
Wrocławskiego przy ul. Joliot-Curie 15, 50-383 Wrocław.

3. Osobami uczestniczącymi w Konferencji, zwanymi dalej
Uczestnikami, mogą być jedynie osoby zarejestrowane w serwisie
internetowym Konferencji, które uiściły odpowiednią opłatę
wyliczoną indywidualnie dla każdego Uczestnika na podstawie
podanych przez niego danych.

4. Konferencja rozpoczyna się dnia ${startDate} i kończy dnia
${endDate}, jednakże czas pobytu każdego z Uczestników jest
zależny od jego preferencji zadeklarowanych w systemie
internetowym.

5. W trakcie trwania Konferencji, Uczestnik zobowiązany jest do
stosowania się do poleceń Organizatora i osób przez niego
wyznaczonych.

6. Nieodpowiednie zachowanie Uczestnika w trakcie Konferencji, w
szczególności niestosowanie się do poleceń osób wymienionych w
punkcie 5, nadużywanie alkoholu, stosowanie środków
odurzających, bądź inne zachowania nieobyczajne, a także
zachowania stwarzające zagrożenie zdrowia i bezpieczeństwa
Uczestnika bądź innych Uczestników stanowią podstawę do
zastosowania następujących środków dyscyplinujących:

    1. upomnienia;
    2. powiadomienia władz organizacji macierzystej (uczelni) o
       zachowaniu Uczestnika;
    3. wydalenia z Konferencji.    

    O zastosowaniu środka dyscyplinującego, w tym także o rodzaju
    zastosowanego środka, decyduje jednoosobowo osoba wskazana przez
    Organizatora jako Kierownik Konferencji. Kierownik Konferencji
    może zdecydować o nałożeniu środka najbardziej dotkliwego bez
    uprzedniego stosowania pozostałych środków. Kierownik
    Konferencji może zdecydować o zastosowaniu wszystkich środków
    dyscyplinujących łącznie. Władze uczelni macierzystych względem
    osób będących Uczestnikami mogą za to samo zachowanie zastosować
    kary dyscyplinarne wynikające z Regulaminu Studiów.

7. Na terenie całego ośrodka, w którym odbywać się będzie
Konferencja obowiązuje bezwzględny zakaz palenia papierosów oraz
innych wyrobów nikotynowych (w tym papierosów elektronicznych,
itp.). W przypadku nieprzestrzegania tego zakazu organizator
zastrzega sobie prawo do zastosowania środków dyscyplinujących
opisanych w punkcie 6.

8. Uczestnik ponosi odpowiedzialność za szkody wyrządzone osobom
trzecim w czasie przebywania na Konferencji. Organizator nie
przejmuje odpowiedzialności względem osób trzecich za zachowania
Uczestnika w trakcie Konferencji.

9. Organizator nie sprawuje pieczy nad osobą Uczestnika oraz jego
mieniem w trakcie Konferencji. W szczególności Organizator nie
ponosi odpowiedzialności za mienie Uczestnika pozostawione w
obiekcie, w którym organizowana jest Konferencja.

10. Uczestnik podający w serwisie internetowym nieprawdziwe dane,
zgadza się na konsekwencje prawne i finansowe z tego wynikające.
Organizator zastrzega sobie prawo do wydalenia takiego
Uczestnika z Konferencji. W przypadku, gdy informacje podane
przez Uczestnika narażają Organizatorów na straty finansowe,
Uczestnik zobowiązuje się do zwrotu poniesionych przez
Organizatora dodatkowych kosztów.

11. Uczestnikowi nie przysługuje zwrot jego świadczenia na rzecz
Organizatora bądź części tego świadczenia w przypadku niepełnego
udziału w Konferencji z przyczyn, za które Organizator nie
odpowiada. W szczególności zwrot świadczenia bądź części
świadczenia nie przysługuje Uczestnikowi, względem którego
zastosowano karę wydalenia z Konferencji.

12. Warunki rezygnacji:

    1. Rezygnacja z Konferencji następuje w momencie złożenia przez
    Uczestnika rezygnacji w formie pisemnej lub elektronicznej
    na adres pocztowy Organizatora.

    2. W przypadku rezygnacji potrąca się 100% wpłaconej kwoty.

    3. Istnieje możliwość zwrotu wpłaconej kwoty, gdy rezygnujący
    Uczestnik znajdzie na to miejsce innego Uczestnika.
`;

export const Template = (props: templates.TermsAndConditions) => {
  let startDate = "";
  let endDate = "";

  if (props.zosia) {
    startDate = getLocalDate(new Date(props.zosia.start_date));
    endDate = getLocalDate(new Date(props.zosia_end_date));
  }

  return (
    <Layout>
      <CenteredContainer>
        <article className="prose mx-auto my-10">
          <h1 className="text-center">
            Regulamin LEtniego Obozu Studentów Informatyki
          </h1>
          {props.zosia ? (
            <Markdown>
              {privacyPolicyMarkdown(
                props.zosia_title,
                props.place.town,
                startDate,
                endDate,
              )}
            </Markdown>
          ) : (
            <h2 className="text-center">W przygotowaniu...</h2>
          )}
        </article>
      </CenteredContainer>
    </Layout>
  );
};
