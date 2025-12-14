import React from "react";
import Markdown from "react-markdown";
import { Alert } from "../alert/Alert";

interface ProfilePaymentsSectionProps {
  paymentAccepted: boolean;
  price: number;

  transferTitle: string;
  accountNumber: string;
  accountBank: string;
  accountOwner: string;
  accountAddress: string;

  discountRound: number;
  isStudent: boolean;
}

const paymentInformationMarkdown = (
  price: number,
  transferTitle: string,
  accountNumber: string,
  accountBank: string,
  accountOwner: string,
  accountAddress: string,
) => `
*Payment information for money transfer*  
Total price: **${price} PLN**  
Transfer title: **${transferTitle}**  
Account number: **${accountNumber}**  
(Check if bank name is correct: **${accountBank}**)  
Receiver name: **${accountOwner}**  
Receiver address: **${accountAddress}**  
`;

export const ProfilePaymentSection = ({
  paymentAccepted,
  price,
  transferTitle,
  accountNumber,
  accountBank,
  accountOwner,
  accountAddress,
  discountRound,
  isStudent,
}: ProfilePaymentsSectionProps) => {
  return (
    <>
      <h2 className="card-title text-lg lg:text-xl">Payment</h2>
      {paymentAccepted ? (
        <Alert type="success">Your payment has been accepted :)</Alert>
      ) : (
        <>
          <div className="prose mb-3">
            <Markdown>
              {paymentInformationMarkdown(
                price,
                transferTitle,
                accountNumber,
                accountBank,
                accountOwner,
                accountAddress,
              )}
            </Markdown>
          </div>
          <Alert type="warning">
            <span className="font-bold">IMPORTANT NOTE:</span> Please copy and
            use the provided transfer title! Otherwise, the organizers may not
            guarantee your time bonus for rooming.
          </Alert>
          {discountRound > 0 && isStudent && (
            <Alert type="warning">
              Your total price includes a discount. You should pay for the
              conference immediately so as not to lose your discount.
            </Alert>
          )}
          <Alert type="info">
            In accordance with Article 106i(2) and (6) of the Goods and Services
            Tax Act ("Ustawy o podatku od towarów i usług"), an invoice for a
            service is issued at the customer's request if they submit a request
            for it no later than the 15th day of the month following the month
            in which they made the payment (it is not possible to issue a document after
            this date&nbsp;— <span className="font-bold">it may not be feasible to receive an invoice after the end of the camp</span>).
            The service provider's contact details are: kontakt.fwsi@gmail.com
          </Alert>
        </>
      )}
    </>
  );
};
