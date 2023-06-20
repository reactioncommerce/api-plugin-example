import ReactionError from "@reactioncommerce/reaction-error";
export default async function productsUploaded(parent, args, context) {
  const { shopId } = args;
  if (!context.user) {
    throw new ReactionError("access-denied", "Access Denied");
  }
  const currentMonth = new Date().getMonth() + 1;
  const previousMonth = currentMonth - 1;

  // Dummy data for the current month and previous month
  const productUploadData = [
    { date: "2023-06-01", count: 10 },
    { date: "2023-06-05", count: 15 },
    { date: "2023-06-10", count: 8 },
    { date: "2023-05-01", count: 12 },
    { date: "2023-05-05", count: 5 },
    { date: "2023-12-10", count: 18 },
  ];

  const currentMonthData = productUploadData.filter(
    (data) => new Date(data.date).getMonth() + 1 === currentMonth
  );

  const previousMonthData = productUploadData.filter(
    (data) => new Date(data.date).getMonth() + 1 === previousMonth
  );

  return { currentMonthData, previousMonthData };
}
