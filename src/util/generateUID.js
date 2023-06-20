/**
 *
 * @method createOrUpdateProductReview
 * @summary Add or update product reviews by users
 * @param {Object} context - an object containing the per-request state
 * @param {String} unitOrVariantId - A Unit or top level Unit Variant ID.
 * @param {Boolean} topOnly - True to return only a units top level variants.
 * @param {Object} args - an object of all arguments that were sent by the client
 * @returns {Promise<Object[]>} Array of product reviews objects.
 */
 export default async function generateUID(

 
    ) {  var dt = new Date().getTime();
      var uuid = "xxxyxxxxxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    }
    