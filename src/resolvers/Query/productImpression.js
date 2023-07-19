import { decodeOrderOpaqueId, decodeShopOpaqueId } from "../../xforms/id.js";
import ReactionError from "@reactioncommerce/reaction-error";
export default async function productImpression(parent, args, context) {
  if (!context.user) {
    throw new ReactionError("access-denied", "Access Denied");
  }
  const { shopId } = args;
  const { collections } = context;
  const { ProductImpression } = collections;

  // const impressions = await ProductImpression.aggregate([
  //   {
  //     $group: {
  //       Date: "$Date",
  //       count: { $sum: 1 },
  //     },
  //   },
  //   {
  //     $sort: {
  //       _id: 1,
  //     },
  //   },
  // ]).toArray();
  const impressions = await ProductImpression.aggregate([
    // {
    //   $match: {
    //     slugOrId: "sana-safinaz-embroidered-shirt",
    //   },
    // },
    {
      $group: {
        _id: {
          month: {
            $dateToString: { format: "%m", date: { $toDate: "$Date" } },
          },
          year: { $dateToString: { format: "%Y", date: { $toDate: "$Date" } } },
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        month: { $toInt: "$_id.month" },
        year: { $toInt: "$_id.year" },
        count: 1,
        _id: 0,
      },
    },
  ]).toArray();

  console.log(impressions);
  return impressions;
}
// const order = ProductImpression.find([
//   {
//     $unwind: "$items", // Unwind the "items" array
//   },
//   {
//     $group: {
//       _id: "$items.productId", // Group by the product ID
//       count: { $sum: "$items.quantity" }, // Calculate the count for each product
//     },
//   },
// ]);
//   return {
//     shopId: shopId,
//     _id: "123",
//     productsSold: order,
//     productsActive: 5,
//     productInCart: 3,
//     productInCheckout: 2,
//     productPaymentDone: 1,
//   };
// }
