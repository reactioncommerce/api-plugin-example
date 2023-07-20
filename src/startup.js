import sendOrderEmail from "./util/sendOrderEmail.js";
import createNotification from "./util/createNotification.js";
import getProductbyId from "./util/getProductbyId.js";

/**
 * @summary Called on startup
 * @param {Object} context Startup context
 * @param {Object} context.collections Map of MongoDB collections
 * @returns {undefined}
 */
export default  function ordersStartup(context) {
  const { appEvents } = context;

  appEvents.on("afterOrderCreate", ({ order }) => sendOrderEmail(context, order));
  appEvents.on("afterOrderCreate", async ({ order ,createdBy}) =>{
    
  let productPurchased= await getProductbyId(context,{productId:order?.shipping[0]?.items[0]?.variantId})
  
  createNotification(context,{
    details: null,
    from: createdBy,
    hasDetails: false,
    message: `You have a new order of ${productPurchased.title}`,
    status: "unread",
    to: productPurchased?.uploadedBy?.userId,
    type: "newOrder",
    url: `/en/profile/address?activeProfile=seller`})
  
  });
}
