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
          <div className="prose mb-3 text-base-content">
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
        </>
      )}
    </>
  );
};
