import { CenteredContainer } from "@client/components/containers/CenteredContainer";
import { Layout } from "@client/components/Layout";
import React from "react";
import Markdown from "react-markdown";

const signupRulesMarkdown = `
## Instrukcja zapisów

Stwórz konto za pomocą przycisku "Sign up". Jako Email podaj
adres w domenie **cs.uni.wroc.pl** lub dowolnej innej*.  
Konta zakładane na naszej stronie w przeszłości zostały usunięte.

Jako osoba zaproszona posiadasz specjalny priorytet i możesz wybrać
pokój przed resztą uczestników. Wcześniejsze zapisy startują
na początku grudnia. O ich początku poinformujemy mailowo.

W razie jakichkolwiek pytań lub problemów, zachęcamy do kontaktu: 
[ksi@cs.uni.wroc.pl](mailto:ksi@cs.uni.wroc.pl)

*W przypadku rejestracji konta w innej domenie prosimy o informację
mailową. Dziękujemy.
`;

export const Template = () => {
  return (
    <Layout>
      <CenteredContainer>
        <article className="prose mx-auto my-10">
          <h1 className="text-center">
            Zapisy dla Zaproszonych na Zimowy Obóz Studentów Informatyki A
          </h1>
          <Markdown>{signupRulesMarkdown}</Markdown>
        </article>
      </CenteredContainer>
    </Layout>
  );
};
