import { reverse } from "@reactivated";
import React from "react";

interface CostSummaryProps {
  priceAccommodation: number;
  priceAccomodationWithBreakfast: number;
  priceAccomodationWithDinner: number;
  priceAccomodationWithDinnerAndBreakfast: number;

  priceBase: number;
  priceTransport: number;
  priceTransportWithDiscount: number;
  priceTransferBaggage: number;

  discountPerDay: number;

  calculatedAccomodationCost: number;
  calculatedDiscount: number;
  isStudent: boolean;
  isTransportSelected: boolean;
  isTransferBaggageSelected: boolean;
}

export const CostSummary = ({
  priceAccommodation,
  priceAccomodationWithBreakfast,
  priceAccomodationWithDinner,
  priceAccomodationWithDinnerAndBreakfast,
  priceBase,
  priceTransport,
  priceTransportWithDiscount,
  priceTransferBaggage,
  discountPerDay,
  calculatedAccomodationCost,
  calculatedDiscount,
  isStudent,
  isTransportSelected,
  isTransferBaggageSelected,
}: CostSummaryProps) => {
  const transportPrice = isStudent
    ? priceTransportWithDiscount
    : priceTransport;

  const calculateTotalCost = () => {
    let totalCost = priceBase;

    if (isTransportSelected) {
      totalCost += transportPrice;
    }

    if (isTransferBaggageSelected) {
      totalCost += priceTransferBaggage;
    }

    totalCost += calculatedAccomodationCost;

    return totalCost;
  };

  const totalCost = calculateTotalCost();

  return (
    <div className="card card-bordered bg-base-300">
      <div className="card-body p-4 lg:p-8">
        <h2 className="text-center text-2xl font-bold">Cost summary</h2>

        <h3 className="card-title text-lg">Price per night</h3>
        <div className="mb-2 flex w-full">
          <div className="divider divider-primary divider-horizontal ml-0 mr-2" />
          <div>
            <ul>
              <li>
                Accommodation: <b>{priceAccommodation} PLN</b>
              </li>
              <li>
                Accommodation with breakfast:{" "}
                <b>{priceAccomodationWithBreakfast} PLN</b>
              </li>
              <li>
                Accommodation with dinner:{" "}
                <b>{priceAccomodationWithDinner} PLN</b>
              </li>
              <li>
                Accommodation + both meals:{" "}
                <b>{priceAccomodationWithDinnerAndBreakfast} PLN</b>
              </li>
              {isStudent && (
                <li>
                  Discount per day: <b>{discountPerDay} PLN</b> <br />
                  <span className="text-sm italic">
                    This is your possible discount. The actual discount will be
                    calculated after you save your registration.
                  </span>
                  <br />
                </li>
              )}
            </ul>
          </div>
        </div>
        <h3 className="card-title text-lg">Additional prices</h3>
        <div className="mb-2 flex w-full">
          <div className="divider divider-secondary divider-horizontal ml-0 mr-2" />
          <div>
            <ul>
              <li>
                Administration fee: <b>{priceBase} PLN</b>
              </li>
              <li>
                Transport fee {isStudent && "(price for students)"}:{" "}
                <b>{transportPrice} PLN</b>
              </li>
              <li>
                Baggage transfer fee: <b>{priceTransferBaggage} PLN</b>
              </li>
            </ul>
            <span className="text-sm italic">
              We offer you to transfer your baggage from the transport stop to
              the hotel and back. Check out the{" "}
              <a href={reverse("questions_index")} className="link">
                Q&A
              </a>{" "}
              for more information.
            </span>
          </div>
        </div>
        <h3 className="card-title text-lg">
          Total cost (updated automatically)
        </h3>
        <div className="flex w-full">
          <div className="divider divider-success divider-horizontal ml-0 mr-2" />
          <div>
            <ul>
              <li>
                Cost before discount: <b>{totalCost} PLN</b>
              </li>
              <li>
                Discount:{" "}
                <b className="text-success">{calculatedDiscount} PLN</b>
              </li>
              <li>
                Total: <b>{totalCost - calculatedDiscount} PLN</b>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
