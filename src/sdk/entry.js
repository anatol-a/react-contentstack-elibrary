/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undef */
import * as contentstack from "contentstack";
import * as Utils from "@contentstack/utils";

const Stack = contentstack.Stack({
  api_key: process.env.REACT_APP_APIKEY,
  delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
  environment: process.env.REACT_APP_ENVIRONMENT,
});

const renderOption = {
  // to render Supercharged RTE NodeType content like paragraph, link, table, order list, un-order list and more.
  p: (node, next) => {
    return `<p>${next(node.children)}</p>`
  },
  h2: (node, next) => {
    return `<h2>${next(node.children)}</h2>`
  },
  // to render Supercharged RTE MarkType content like bold, italic, underline, strikethrough, inlineCode, subscript, and superscript
  bold: (text) => {
    return `<strong>${text}</strong>`
  },
  // to render block-type embedded items
  block: {
    product: (entry, metadata) => {
      return `<div>
        <h2 >${entry.title}</h2>
        <img src=${entry.product_image.url} alt=${entry.product_image.title}/>
        <p>${entry.price}</p>
      </div>`
    },
    // to render the default
    $default: (entry, metadata) => {
      return `<div>
                 <h2>${entry.title}</h2>
                 <p>${entry.description}</p>  
             </div>`
    }
  },
  // to display inline embedded items
  inline: {
    $default: (entry) => {
      return `<span><b>${entry.title}</b> - ${entry.description}</span>`
    }
  },
  // to display embedded items inserted via link
  link: (entry, metadata) => {
    return `<a href="${metadata.attributes.href}">${metadata.text}</a>`
  },
  // to display assets
  display: (asset, metadata) => {
    return `<img src=${metadata.attributes.src} alt=${metadata.alt} />`
  }
}


export default {
  /**
   *
   * fetches all the entries from specific content-type
   * @param {* content-type uid} contentTypeUid
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   *
   */
  getEntry({ contentTypeUid, referenceFieldPath, jsonRtePath }) {
    return new Promise((resolve, reject) => {
      const query = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) query.includeReference(referenceFieldPath);
      query
        .includeOwner()
        .toJSON()
        .find()
        .then(
          (result) => {
            console.log('result - ', result)
            jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption,
            });
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
  },

  /**
   *fetches specific entry from a content-type
   *
   * @param {* content-type uid} contentTypeUid
   * @param {* url for entry to be fetched} entryUrl
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   * @param {* locale} locale
   * @returns
   */
  // getEntryByUrl({ contentTypeUid, entryUrl, referenceFieldPath, jsonRtePath, locale }) {
  getEntryByUrl({ contentTypeUid, entryUrl, referenceFieldPath, jsonRtePath, locale }) {
    return new Promise((resolve, reject) => {
      const bookQuery = Stack.ContentType(contentTypeUid).Query();
      locale && bookQuery.language(locale);
      referenceFieldPath && bookQuery.includeReference(referenceFieldPath);
      bookQuery.includeOwner().toJSON();
      const data = bookQuery.where("url", `${entryUrl}`).find();
      data.then(
        (result) => {
          jsonRtePath &&
          Utils.jsonToHTML({
            entry: result,
            paths: jsonRtePath,
            renderOption,
          });
          resolve(result[0]);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
};
