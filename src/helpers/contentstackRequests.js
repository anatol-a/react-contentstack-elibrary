import Stack from "../sdk/entry";

export const getBookRes = async (entryUrl, locale) => {
  const response = (await Stack.getEntryByUrl({
    contentTypeUid: "book",
    entryUrl,
    referenceFieldPath: ["author.author", "related_books.books", "related_books.books.author.author"],
    jsonRtePath: ["description.value"],
    locale
  }));
  return response[0];
};

export const getPageRes = async (entryUrl) => {
  const response = (await Stack.getEntryByUrl({
    contentTypeUid: "page",
    entryUrl,
    referenceFieldPath: [],
    jsonRtePath: [
      "body.img_text.text",
    ],
  }));
  console.log('page - ', response);
  return response[0];
};
