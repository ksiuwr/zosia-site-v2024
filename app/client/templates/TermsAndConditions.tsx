import { CenteredContainer } from "@client/components/containers/CenteredContainer";
import { Layout } from "@client/components/Layout";
import { getLocalDate } from "@client/utils/time";
import { templates } from "@reactivated";
import React from "react";
import Markdown from "react-markdown";

const termsAndConditionsMarkdown = () => `
Ostatnia aktualizacja: 16/06/2025

## I. Informacje ogólne

### 1. Dane organizatora
Usługodawcą jest:

Fundacja Wrocławskich Studentów Informatyki (NIP: 8971954829)

Z siedzibą przy ul. Św. Mikołaja 8/11/208, Wrocław.

Kontakt e-mail: kontakt.fwsi@gmail.com

Regulamin określa zasady zapisów oraz uczestnictwa w obozie.

---

## II. Zakres i warunki świadczenia usług

### 2. Zakres usługi
Cena obozu obejmuje wybrane przez uczestnika usługi:
* nocleg ze śniadaniem i obiadokolacją (w wyznaczonych godzinach),
* transport,
* transport bagażu (jeśli dotyczy).

Miejsce obozu i forma transportu są ogłaszane na stronie z odpowiednim wyprzedzeniem.

### 3. Zmiany w terminie lub formie usługi
* W przypadku zmiany terminu lub miejsca obozu, uczestnik ma prawo do rezygnacji i pełnego zwrotu opłaty.
* W przypadku istotnej zmiany terminu lub formy transportu, uczestnik ma prawo do rezygnacji z tej usługi i zwrotu jej kosztów.

### 4. Zmiany programu
Organizator zastrzega sobie prawo do dowolnych zmian w terminarzu zajęć i wykładów, dla zapewnienia optymalnego przebiegu obozu.

### 5. Godzina rozpoczęcia
Za początek obozu uznaje się pierwsze zajęcia lub wykład. Meldowanie w ośrodku może zostać wstrzymane do tego czasu. Szczegóły zameldowania i wymeldowania zostaną ogłoszone na stronie obozu.

### 6. Gry planszowe
Organizator decyduje o dostępności i doborze gier planszowych. Preferencje uczestników będą brane pod uwagę, ale nie są wiążące.

---

## III. Rejestracja i płatności

### 7. Zgłoszenie i opłata
Rejestracja odbywa się poprzez formularz na stronie. Po wyborze wariantu uczestnik otrzymuje dane do przelewu. Rezerwacja miejsca następuje po zaksięgowaniu wpłaty.

### 8. Odstąpienie od umowy (14 dni)
Uczestnik może zrezygnować w ciągu **14 dni** od zakupu, bez podania przyczyny. Zwrot następuje w ciągu 14 dni od zgłoszenia rezygnacji.

Prawo do odstąpienia od umowy nie przysługuje, jeśli usługa została w pełni wykonana przed upływem 14 dni, a uczestnik wyraźnie się na to zgodził i został poinformowany o utracie tego prawa.

---

## IV. Zakwaterowanie i materiały

### 9. Przydział pokoi
Organizator zastrzega sobie prawo do samodzielnego przydzielania uczestników do pokoi, niezależnie od wcześniejszych deklaracji. Przy dokonywaniu podziału podejmowane będą starania, aby uwzględnić zgłoszone preferencje.

### 10. Pakiet startowy
Organizator może zapewnić uczestnikom pakiet konferencyjny (np. identyfikator, koszulkę). Jego skład może różnić się od zgłoszonych oczekiwań, jednak organizator dołoży starań, aby je uwzględnić.

---

## V. Prawa i obowiązki

### 11. Zasady bezpieczeństwa i odpowiedzialność
Uczestnicy zobowiązani są do przestrzegania zaleceń organizatorów, zasad bezpieczeństwa oraz regulacji obowiązujących w ośrodku. Organizator nie odpowiada za szkody wynikające z niestosowania się do zasad.

### 12. Mienie osobiste uczestników
Organizator nie ponosi odpowiedzialności za rzeczy zagubione, skradzione lub zniszczone. Zaleca się ostrożność przy przechowywaniu przedmiotów wartościowych.

### 13. Ubezpieczenie
Organizator nie zapewnia ubezpieczenia. Uczestnikom zaleca się posiadanie indywidualnego ubezpieczenia NNW.

---

## VI. Odmowa świadczenia usług i wykluczenie

### 14. Wykluczenie uczestnika
Organizator może usunąć uczestnika z obozu, bez zwrotu kosztów, jeśli jego zachowanie:
* narusza zasady współżycia społecznego lub bezpieczeństwa,
* zagraża zdrowiu lub życiu,
* zakłóca przebieg obozu,
* powoduje zniszczenie mienia,
* łamie regulamin lub przepisy prawa.

Organizator może także odmówić świadczenia usług tej osobie w przyszłości.

### 15. Odmowa świadczenia konkretnej usługi
Organizator zastrzega sobie prawo do odmowy realizacji konkretnej usługi na **7 dni** przed rozpoczęciem obozu z istotnych przyczyn organizacyjnych lub technicznych. Uczestnik zostanie o tym niezwłocznie poinformowany, a wniesiona opłata za tę usługę zostanie zwrócona w terminie 7 dni.

---

## VII. Sytuacje nadzwyczajne i reklamacje

### 16. Siła wyższa
Organizator nie ponosi odpowiedzialności za niewykonanie lub nienależyte wykonanie usługi z przyczyn niezależnych, będących skutkiem działania siły wyższej (np. klęski żywiołowe, epidemie, wojny, strajki, decyzje administracyjne). W takim przypadku uczestnikowi może przysługiwać częściowy lub pełny zwrot opłaty za niewykonaną usługę, zgodnie z obowiązującymi przepisami prawa.

### 17. Reklamacje
Reklamacje należy składać mailowo. Organizator odpowiada w terminie **14 dni**.

---

## VIII. Zmiany regulaminu i postanowienia końcowe

### 18. Zmiana regulaminu
Organizator zastrzega sobie prawo do zmiany regulaminu do **7 dni** przed obozem. Uczestnik ma wówczas prawo do rezygnacji i pełnego zwrotu, o ile zgłosi to w ciągu **7 dni** od otrzymania informacji.

### 19. Postanowienia końcowe
Regulamin obowiązuje od dnia publikacji. W sprawach nieuregulowanych mają zastosowanie przepisy prawa polskiego.

### 20. Charakter zamknięty obozu
Obóz ma charakter zamknięty i jest przeznaczony wyłącznie dla zapisanych uczestników. Udział osób nieuprawnionych może skutkować konsekwencjami prawnymi, w tym zgłoszeniem naruszenia odpowiednim służbom lub dochodzeniem roszczeń cywilnoprawnych.
`;

export const Template = (props: templates.TermsAndConditions) => {

  return (
    <Layout>
      <CenteredContainer>
        <article className="prose mx-auto my-10">
          <h1 className="text-center">
            Regulamin LEtniego Obozu Studentów Informatyki A oraz warunki sprzedaży
          </h1>
            <Markdown>
              {termsAndConditionsMarkdown()}
            </Markdown>
        </article>
      </CenteredContainer>
    </Layout>
  );
};