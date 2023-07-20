import { decodeOrderOpaqueId, decodeShopOpaqueId } from "../../xforms/id.js";
import ReactionError from "@reactioncommerce/reaction-error";
export default async function earningDataGraph(parent, args, context) {
      if (!context.user) {
        throw new ReactionError("access-denied", "Access Denied");
      }
  const { shopId } = args;
  return [
    {
      date: "2023-01-01",
      earning: 10,
    },
    {
      date: "2023-01-02",
      earning: 15,
    },
    { date: "2023-01-01", earning: 8 },
    {
      date: "2023-01-02",
      earning: 12,
    },
  ];
}
