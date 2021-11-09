/* eslint-disable no-console */
import getPaginatedResponse from "@reactioncommerce/api-utils/graphql/getPaginatedResponse.js";

/**
 * @name Products/products
 * @method
 * @memberof Catalog/GraphQL
 * @summary Returns all products
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object[]>} Promise that resolves with array of Product objects
 */
export default async function products(context) {
  const internalContext = context.getInternalContext();
  const primaryShopId = await context.queries.primaryShopId(internalContext);
  const query = await context.queries.products(internalContext, { shopIds: [primaryShopId] });
  // console.log("Query value============", query);
  const connectionArgs = { sortOrder: "desc", sortBy: "createdAt" };
  return getPaginatedResponse(query, connectionArgs, {
    includeHasNextPage: false,
    includeHasPreviousPage: false,
    includeTotalCount: false
  });
}
