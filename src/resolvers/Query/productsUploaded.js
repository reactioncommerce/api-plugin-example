import ReactionError from "@reactioncommerce/reaction-error";
export default async function productsUploaded(parent, args, context) {
  const { shopId } = args;
  if (!context.user) {
    throw new ReactionError("access-denied", "Access Denied");
  }

  const { collections } = context;
  const { Products } = collections;
  const uploaded = await Products.aggregate([
    {
      $match: {
        "uploadedBy.userId": args.sellerId,
      },
    },
    {
      $group: {
        _id: {
          isVisible: "$isVisible",
          month: {
            $dateToString: { format: "%m", date: { $toDate: "$createdAt" } },
          },
          year: {
            $dateToString: { format: "%Y", date: { $toDate: "$createdAt" } },
          },
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        isVisible: "$_id.isVisible",
        month: { $toInt: "$_id.month" },
        year: { $toInt: "$_id.year" },
        count: 1,
        _id: 0,
      },
    },
  ]).toArray();

  const uploadedTrue = uploaded.filter((imp) => imp.isVisible === true);
  const uploadedFalse = uploaded.filter((imp) => imp.isVisible === false);
  console.log(uploadedTrue, uploadedTrue);

  const returnObj = {
    isVisibleTrue: uploadedTrue,
    isVisibleFalse: uploadedFalse,
  };


  return returnObj;
}
