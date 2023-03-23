import { gql } from "@apollo/client";

export const GET_HEADER = gql`
    query GetHeader {
        all_header {
            items {
                logoConnection {
                    edges {
                        node {
                            url
                            title
                        }
                    }
                }
                menu {
                    url {
                        href
                    }
                    title
                }
            }
        }
        
    }
`;

export const GET_FOOTER = gql`
    query GetFooter {
        all_footer {
            items {
                copyright
                logoConnection {
                    edges {
                        node {
                            url
                        }
                    }
                }
                socials {
                    iconConnection {
                        edges {
                            node {
                                url
                            }
                        }
                    }
                    title
                    url {
                        title
                        href
                    }
                }
            }
        }
    }
`;

export const GET_ALL_BOOKS = gql`
    query GetAllBooks($limit: Int, $skip: Int) {
        all_book(limit: $limit, skip: $skip) {
            items {
                title
                coverConnection {
                    edges {
                        node {
                            url
                        }
                    }
                }
                author {
                    authorConnection {
                        edges {
                            node {
                                ... on Author {
                                    title
                                }
                            }
                        }
                    }
                }
                url
            }
            total
        }
    }
`;


export const GET_BOOK_BY_URL = gql`
  query GetBookByUrl($url: String) {
    all_book(where: { url: $url }) {
      items {
        title
        url
        isbn
        number_of_pages
        link_to_book {
          href
        }
        related_booksConnection(limit: 5) {
          edges {
            node {
              ... on Book {
                title
                url
                authorConnection {
                  edges {
                    node {
                      ... on Author {
                        title
                      }
                    }
                  }
                }
              }
            }
          }
        }
        authorConnection {
          edges {
            node {
              ... on Author {
                title
              }
            }
          }
        }
        coverConnection {
          edges {
            node {
              url
            }
          }
        }
        description {
          json
        }
      }
    }
  }
`;
