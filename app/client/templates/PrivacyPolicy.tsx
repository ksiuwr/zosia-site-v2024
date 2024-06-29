import { Layout } from "@client/components/Layout";
import React from "react";

export const Template = () => {
  return (
    <Layout>
      <article className="lg:prose-lg prose mx-auto my-10">
        <h1 className="text-center">
          Polityka Prywatności Zimowego Obozu Studentów Informatyki A
        </h1>
        <h2>Polityka prywatności</h2>
        <p>
          Korzystając ze strony zosia.org powierzasz nam swoje informacje. Aby
          przedstawić Ci po krótce co będzie się działo z Twoimi danymi
          przygotowaliśmy poniższą Politykę prywatności.
        </p>
        <p>
          Mamy nadzieję, że ten dokument odpowie na wszystie Twoje pytania
          dotyczące tego jakie dane zbieramy i w jakim celu. W przypadku
          dodatkowych pytań, nie wachaj się skontaktować z nami wysyłając
          wiadomość na nasz adres e-mail:{" "}
          <a href="mailto:ksi@cs.uni.wroc.pl">ksi@cs.uni.wroc.pl</a>
        </p>
        <h2>Informacja o plikach cookies</h2>
        <p>
          O tym czym są pliki cookies możesz przeczytać np. pod tym adresem:{" "}
          <a href="https://pl.wikipedia.org/wiki/HTTP_cookie">
            https://pl.wikipedia.org/wiki/HTTP_cookie
          </a>
          .
        </p>
        <p>
          zosia.org wykorzystuje pliki cookie wyłącznie w celu zapisywania
          informacji o sesji zalogowanego użytkownika oraz w celu zabezpieczenia
          przed atakim typu CSRF. Dodatkowe pliki cookies, również związane
          jedynie z funkcjonalnością strony oraz zapewnieniem bezpieczeństwa
          danych, wykorzystywane są przez naszego dostawcę usług DNS,
          Cloudflare. Te pliki są niezbędne do poprawnego działania strony i nie
          można z nich zrezygnować.
        </p>
        <h2>Jakie dane przetwarzamy?</h2>
        <p>
          Jedyne dane jakie przechowujemy i przetwarzamy to dane, które podajesz
          nam podczas rejestracji, określania swoich preferencji dot. ZOSI
          (dalej jako {'"ZOSIA"'}, {'"Obóz"'} bądź {'"Wydarzenie"'}) oraz Twój
          adres IP.
        </p>
        <p>
          Może się również zdarzyć, że zdjęcie z Twoim wizerunkiem wykonane
          podczas ZOSI pojawi się na profilu ZOSI w portalu Facebook i będziemy
          chcieli przechować je w celu promocji Obozu w przyszłych latach.
        </p>
        <h2>Do jakich celów wykorzystujemy dane?</h2>
        <p>
          Wszystkie dane jakie podajesz podczas rejestracji oraz przy ustawianiu
          preferencji zostaną wykorzystane wyłącznie w celach organizacji Obozu,
          w tym również do wysyłania wiadomości e-mail związanych z organizacją
          Obozu. Nie mamy zamiaru sprzedawać naszej bazy danych spamerom ;)
        </p>
        <p>
          Adresy IP są wykorzystywane wyłącznie do celów diagnostycznych i
          przechowywane w tzw. logach strony. Nie są one też w żaden sposób
          powiązane z Twoimi pozostałymi danymi.
        </p>
        <p>
          Dodatkowo, jeśli występujesz na zdjęciu wykonanym podczas Wydarzenia i
          otrzymaliśmy na to zgodę autora zdjęcia, może ono posłużyć do promocji
          Obozu w kolejnych latach (dokładniej - może ono zostać wykorzystane na
          stronach internetowych kolejnych Wydarzeń). Zdjęcia nie będą
          wykorzystywane w żadnym innym celu.
        </p>
        <h2>Czy istnieje wymóg podania danych?</h2>
        <p>
          Zbierane przez nas dane są niezbędne dla organizacji Obozu oraz
          zapewnienia bezpieczeństwa jego uczestnikom. W związku z tym podanie
          prawdziwych danych oraz wyrażenie zgody na ich przetwarzanie jest
          wymagane do rejestracji konta na stronie zosia.org oraz uczestnictwa w
          Wydarzeniu.
        </p>
        <p>
          <em>
            UWAGA: Podanie nieprawdziwych danych (w szczególności imienia i
            nazwiska) może skutkować niedopuszczeniem do udziału w Wydarzeniu
            bez prawa do zwrotu kosztów poniesionych przez uczestnika podającego
            nieprawdziwe dane.
          </em>
        </p>
        <p>
          Pamiętaj, że przysługują Ci następujące prawa:
          <ul>
            <li>
              prawo dostępu do Twoich danych, w tym uzyskania kopii danych,
            </li>
            <li>
              prawo żądania sprostowania danych lub zaprzestania ich
              przetwarzania,
            </li>
            <li>prawo do usunięcia danych (w określonych sytuacjach),</li>
            <li>
              prawo wniesienia skargi do organu nadzorczego zajmującego się
              ochroną danych osobowych
            </li>
          </ul>
        </p>
        <h2>Jak długo dane będą przechowywane?</h2>
        <p>
          Adresy IP są przechowywane przez 3 dni od czasu ostatnich odwiedzin na
          stronie dokonanych z tego adresu.
        </p>
        <p>
          Zdjęcia na których występujesz mogą być przechowywane bez ograniczeń
          czasowych.
        </p>
        <p>
          Pozostałe dane będą przechowywane do miesiąca po zakończeniu
          tegorocznego Obozu.
        </p>
        <h2>Kto jest administratorem danych?</h2>
        <p>
          Administratorem danych jest Koło Studentów Informatyki UWr, z siedzibą
          w Instytucie Informatyki Uwr, ul. Fryderyka Joliot-Curie 15, p. 24.
        </p>
        <h2>Kto ma dostęp do danych?</h2>
        <p>
          Jedynymi osobami uprawnionymi do dostępu do Twoich informacji są
          Członkowie oraz Członkowie Honorowi KSI będący jednocześnie członkami
          Komitetu Organizacyjnego ZOSI.
        </p>
        <h2>Gdzie wysyłamy dane?</h2>
        <p>
          Organizacji Wydarzenia jakim jest ZOSIA wymaga od nas współpracy z
          firmami zewnętrznymi. Do realizacji niektórych usług niezbędne jest
          udostępnienie części Twoich danych:
          <ul>
            <li>
              Strona ZOSI korzysta z infrastruktury Google Cloud. Wszystkie
              dane, które podajesz zapisywane są w naszej bazie danych, która
              wykorzystuje usługę Google Cloud SQL.
            </li>
            <li>
              Błędy, które mogą wystąpić na stronie w czasie jej użytkowania są
              raportowane do usługi sentry.io, gdzie są przetrzymywane przez 30
              dni.
            </li>
            <li>
              Naszym dostawcą usług mailingowych jest Mailgun.com. Twój adres
              e-mail zostanie udostępniony tej usłudze poprzez API wyłącznie w
              celu wysłania do Ciebie wiadomości dot. organizacji Obozu.
            </li>
            <li>
              Podany przez Ciebie rozmiar koszulki (bez imienia i nazwiska)
              zostanie udostępniony drukarni Neoimprenta, al. Jana
              Kochanowskiego 24c 51-601 Wrocław, w celu przygotowania dla Ciebie
              zosiowej koszulki, zaś Twoje imię, nazwisko oraz organizacja
              zostaną udostępnione drukarni GreenPress, ul. Ślężna 116a, 53-111
              Wrocław, w celu przygotowania Twojego identyfikatora.
            </li>
            <li>
              Twoje imię i nazwisko, wraz z zarezerwowanym przez Ciebie pokojem,
              zostanie przekazane obsłudze ośrodka, w którym odbędzie się
              konferencja. Jest to niezbędne, by obsługa mogła udostępnić Ci
              pokój. Dane te mogą zostać wykorzystane również do określenia osób
              odpowiedzialnych za straty materialne powstałe w ośrodku podczas
              trwania obozu.
            </li>
          </ul>
        </p>
        <p>
          Polityki prywatności powyższych firm znaleźć możesz w internecie bądź
          kontaktując się bezpośrednio z obsługą klienta.
        </p>
        <h2>Jak mogę wycofać zgodę na przetwarzanie moich danych?</h2>
        <p>
          To proste, wystarczy wysłać do nas maila w tej sprawie na adres{" "}
          <a href="mailto:ksi@cs.uni.wroc.pl">ksi@cs.uni.wroc.pl</a> :)
          Postaramy się na niego odpowiedzieć najszybciej jak to możliwe, nie
          później jednak niż w ciągu 7 dni.
        </p>
      </article>
    </Layout>
  );
};
