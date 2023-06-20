import { decodeOrderOpaqueId, decodeShopOpaqueId } from "../../xforms/id.js";
import ReactionError from "@reactioncommerce/reaction-error";
export default async function dashBoardShoppingActivity(parent, args, context) {
    if (!context.user) {
      throw new ReactionError("access-denied", "Access Denied");
    }
  const { shopId } = args;
  console.log(decodeShopOpaqueId(shopId), "new");
  return {
    shopId: shopId,
    _id: "123",
    productsSold: 10,
    productsActive: 5,
    productInCart: 3,
    productInCheckout: 2,
    productPaymentDone: 1,
  };
}

