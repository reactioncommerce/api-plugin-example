import { decodeOrderOpaqueId, decodeShopOpaqueId } from "../../xforms/id.js";
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
  currentDate.getMonth() + 2,
  0
).toUTCString();
console.log(startOfMonth, endOfMonth);

// Fetch payments from the database (e.g., MongoDB using Mongoose)
const payments = await Payments.find({
  updatedAt: {
    $gte: startOfMonth,
    $lte: endOfMonth,
  },
}).toArray();
  console.log(startOfMonth,"new",endOfMonth)

  try {
    // Fetch payments from the database (e.g., MongoDB using Mongoose)
    const payments = await Payments.find({
      updatedAt: {
        $gte: startOfMonth,
       
      },
    }).toArray();
      console.log(payments,"new");

    // Group and aggregate payments by week
    const groupedPayments = _.groupBy(payments, (payment) => {
      const paymentDate = new Date(payment.updatedAt);
      const weekNumber = getWeekNumber(paymentDate);
      return `Week ${weekNumber}`;
    });

    // Prepare the array of Payment objects
    const result = Object.entries(groupedPayments).map(([week, payments]) => {
      const totalAmount = payments.reduce(
        (sum, payment) => sum + payment.amount,
        0
      );
      return {
        id: week,
        amount: totalAmount,
        date: new Date(payments[0].updatedAt), // Assuming all payments in the same week have the same date
      };
    });
console.log(result)
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



  
