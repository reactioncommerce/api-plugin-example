import ReactionError from "@reactioncommerce/reaction-error";
import _ from "lodash";

export default async function paymentsgraph(parent, args, context) {
  if (!context.user) {
    throw new ReactionError("access-denied", "Access Denied");
  }

  const { collections } = context;
  const { Payments } = collections;
  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).toUTCString();
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
  ).toUTCString();
console.log(startOfMonth,endOfMonth)
  try {
    // Fetch payments from the database (e.g., MongoDB using Mongoose)
    const payment = await Payments.find({
      updatedAt: {
        $gte: startOfMonth,
      },
    }).toArray();
    console.log(payment, "new");

    // Group and aggregate payments by week
    const groupedPayments = _.groupBy(payment, (payment) => {
      const paymentDate = new Date(payment.updatedAt);
      const weekNumber = getWeekNumber(paymentDate);
      return `Week ${weekNumber}`;
    });

    // Generate an array of all week numbers within the current month
    const numberOfWeeks =
      getWeekNumber(new Date(endOfMonth)) -
      getWeekNumber(new Date(startOfMonth)) +
      1;
    const allWeekNumbers = Array.from(
      { length: numberOfWeeks },
      (_, index) => getWeekNumber(new Date(startOfMonth)) + index
    );

    // Prepare the array of Payment objects
    const result = allWeekNumbers.map((weekNumber) => {
      const weekLabel = `Week ${weekNumber}`;
      const paymentsInWeek = groupedPayments[weekLabel] || [];
      const totalAmount = paymentsInWeek.reduce(
        (sum, payment) => sum + payment.amount,
        0
      );
      return {
        id: weekLabel,
        money: totalAmount,
        date:
          paymentsInWeek.length > 0
            ? new Date(paymentsInWeek[0].updatedAt)
            : null,
      };
    });

    console.log(result);
    return result;
  } catch (error) {
    // Handle the error
    console.error(error);
    throw new Error("Failed to fetch payments.");
  }
}

// Helper function to format the date as "Thu, 13 Jul 2023 08:23:33 GMT"
function formatDate(date) {
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "GMT",
    hour12: false, // Exclude AM/PM indicator
  };
  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate + " GMT";
}

function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const daysPassed = Math.floor(
    (date - firstDayOfYear) / (24 * 60 * 60 * 1000)
  );
  const weekNumber = Math.ceil((daysPassed + firstDayOfYear.getDay() + 1) / 7);
  return weekNumber;
}
