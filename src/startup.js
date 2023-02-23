export default function myStartup(context) {
  context.simpleSchemas.ProductVariant.extend({
    volume: {
      type: Number,
      min: 0,
      optional: true,
    },
  });

  context.simpleSchemas.CatalogProductVariant.extend({
    volume: {
      type: Number,
      min: 0,
      optional: true,
    },
  });
}
