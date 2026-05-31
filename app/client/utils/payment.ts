export interface StayPriceCombination {
  nights: number;
  meals: string;
  attendee: string;
  total: number;
}

interface StayPriceConfig {
  priceBase: number;
  priceAccommodation: number;
  priceAccommodationBreakfast: number;
  priceAccommodationDinner: number;
  priceWholeDay: number;
  discounts: number[];
}

export interface AccomodationDayCostConfig {
  breakfast: boolean;
  dinner: boolean;
  accomodation: boolean;
  priceAccommodation: number;
  priceAccommodationBreakfast: number;
  priceAccommodationDinner: number;
  priceWholeDay: number;
}

const MEAL_OPTIONS = [
  { label: "No meals", dinner: false, breakfast: false },
  { label: "Dinner only", dinner: true, breakfast: false },
  { label: "Breakfast only", dinner: false, breakfast: true },
  { label: "Breakfast and dinner", dinner: true, breakfast: true },
];

export const calculateAccomodationDayCost = ({
  breakfast,
  dinner,
  accomodation,
  priceAccommodation,
  priceAccommodationBreakfast,
  priceAccommodationDinner,
  priceWholeDay,
}: AccomodationDayCostConfig) => {
  if (!accomodation && !dinner && !breakfast) {
    return 0;
  }

  if (dinner && breakfast) {
    return priceWholeDay;
  }

  if (dinner) {
    return priceAccommodationDinner;
  }

  if (breakfast) {
    return priceAccommodationBreakfast;
  }

  return priceAccommodation;
};

export const getConferenceStayPriceCombinations = ({
  priceBase,
  priceAccommodation,
  priceAccommodationBreakfast,
  priceAccommodationDinner,
  priceWholeDay,
  discounts,
}: StayPriceConfig): StayPriceCombination[] => {
  const combinations: StayPriceCombination[] = [];

  for (let days = 2; days <= 4; days += 1) {
    const nights = days - 1;

    MEAL_OPTIONS.forEach(({ label, dinner, breakfast }) => {
      const regularTotal =
        priceBase +
        nights *
          calculateAccomodationDayCost({
            breakfast,
            dinner,
            accomodation: true,
            priceAccommodation,
            priceAccommodationBreakfast,
            priceAccommodationDinner,
            priceWholeDay,
          });

      combinations.push({
        nights,
        meals: label,
        attendee: "Regular",
        total: regularTotal,
      });

      discounts.forEach((discount, index) => {
        if (discount === 0) {
          return;
        }

        const discountRound = index + 1;

        combinations.push({
          nights,
          meals: label,
          attendee: `Student, discount round ${discountRound}`,
          total: regularTotal - nights * discount,
        });
      });
    });
  }

  return combinations;
};
