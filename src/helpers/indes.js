import Stack from "../sdk/entry";

export const getBookRes = async (entryUrl) => {
  const response = (await Stack.getEntryByUrl({
    contentTypeUid: "book",
    entryUrl,
    referenceFieldPath: ["author.author", "related_books.books", "related_books.books.author.author"],
    jsonRtePath: ["description.value"],
  }));
  return response[0];
};
