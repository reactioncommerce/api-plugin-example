import generateUID from "./generateUID.js";
/**
 *
 * @method createNotification
 * @summary Get all of a Unit's Variants or only a Unit's top level Variants.
 * @param {Object} context - an object containing the per-request state
 * @param {String} unitOrVariantId - A Unit or top level Unit Variant ID.
 * @param {Boolean} topOnly - True to return only a units top level variants.
 * @param {Object} args - an object of all arguments that were sent by the client
 * @param {Boolean} args.shouldIncludeHidden - Include hidden units in results
 * @param {Boolean} args.shouldIncludeArchived - Include archived units in results
 * @returns {Promise<Object[]>} Array of Unit Variant objects.
 */
export default async function createNotification(context, args) {
  const { collections, pubSub } = context;
  const { Notifications } = collections;
  const { details, hasDetails, message, status, to, type,url } = args;
  let accountId = context.userId;
  let new_id = await generateUID();


  let insert_obj = {
    details,
    hasDetails,
    message,
    status:"unread",
    to,
    type,
    from :accountId,
    timeSent:new Date(),
    _id: new_id,
    url: url?url:"/this/is/url",
  };
  let NotificationsAdded = await Notifications.insertOne(insert_obj);
  console.log("NotificationsAdded.insertedId",NotificationsAdded.insertedId);
  
  if (NotificationsAdded.insertedId) {

    let nptif_res= await Notifications.findOne({ _id: NotificationsAdded.insertedId });
    pubSub.publish(`notifications-${to}`, { notifications: nptif_res});

    console.log(nptif_res)
    return await nptif_res
  } else {
    throw new Error("Something went wrong");
  }
 
}
