export class FetchAuthorsApi {
  static async getAuthors() {
    try {
      const response = await fetch("https://my-json-server.typicode.com/anatol-a/anatol-json-server/authors");
      return await response.json();
    } catch (e) {
      console.log(e.message)
    }
  }

  static async changeAuthorFavouriteState(authorId, favoriteState) {
    try {
      const response = await fetch(`https://my-json-server.typicode.com/anatol-a/anatol-json-server/authors/${authorId}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: authorId,
          favorite: favoriteState,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return await response.json();
    } catch (e) {
      console.log(e.message)
    }
  }
}