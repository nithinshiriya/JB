export class Book {
    id: number;
    title: string;
    author: string;
    coverImage: string;
    publicationDate: Date
  }

export class BookEditModel {
    book: Book;
    file: any;
}