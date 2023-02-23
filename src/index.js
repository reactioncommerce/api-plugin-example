import { createRequire } from "module";
import importAsString from "@reactioncommerce/api-utils/importAsString.js";
const mySchema = importAsString("./schema/schema.graphql");
// const pkg = createRequire("../package.json");
const require = createRequire(import.meta.url);
// sadasdasd
function myStartup(context) {
  context.simpleSchemas.ProductVariant.extend({
    Chassis: {
      type: String,
      min: 0,
      optional: true,
    },
    Colour: {
      type: String,
      min: 0,
      optional: true,
    },
    Sunroof: {
      type: String,
      min: 0,
      optional: true,
    },
  });

  context.simpleSchemas.CatalogProductVariant.extend({
    Sunroof: {
      type: String,
      min: 0,
      optional: true,
    },
    Colour: {
      type: String,
      min: 0,
      optional: true,
    },
    Chassis: {
      type: String,
      min: 0,
      optional: true,
    },
  });
}

function myPublishProductToCatalog(
  catalogProduct,
  { context, product, shop, variants }
) {
  catalogProduct.variants &&
    catalogProduct.variants.map((catalogVariant) => {
      const productVariant = variants.find(
        (variant) => variant._id === catalogVariant.variantId
      );
      catalogVariant.Sunroof = productVariant.Sunroof || null;
      catalogVariant.Colour = productVariant.Colour || null;
      catalogVariant.Chassis = productVariant.Chassis || null;
    });
}
async function register(app) {
  await app.registerPlugin({
    label: "1",
    name: "ProductNewFieldUpdation",
    version: "0.1",
    functionsByType: {
      startup: [myStartup],
      publishProductToCatalog: [myPublishProductToCatalog],
    },
    graphQL: {
      schemas: [mySchema],
    },
  });
}
export default register;
