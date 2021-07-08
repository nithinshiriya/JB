import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { Book } from '../models/book';

/*
Book Service class.
Provides all book releated CRUD operation.
*/
@Injectable()
export class BooksService {
    baseUrl = "https://localhost:44314/api/"
    constructor(private http: HttpClient){        
    }

    /**
     * Get all books
     * @returns Books[]
     */
    public getBooks(): Observable<any> {
        const url = this.baseUrl + "books";
        return this.http.get(url); 
    }

    /**
     * Get book by id
     * @param id 
     * @returns Book
     */
    public getBook(id: number): Observable<any> {
        const url = this.baseUrl + "books/" + id;
        return this.http.get(url); 
    }

    /**
     * Add new book
     * @param book 
     * @returns Book
     */
    public addBook(book: Book): Observable<any> {
        const url = this.baseUrl + "books";
        return this.http.post(url, book); 
    }

    /**
     * Modify existing book
     * @param book 
     * @returns Book
     */
    public modifyBook(book: Book): Observable<any> {
        const url = this.baseUrl + "books/" + book.id;
        book.coverImage = "";
        return this.http.put(url, book); 
    }

    /**
     * Delete book by id
     * @param book 
     * @returns Status
     */
    public deleteBook(book: Book): Observable<any> {
        const url = this.baseUrl + "books/" + book.id;
        return this.http.delete(url); 
    }

    /**
     * Adds the cover page image to the book.
     * @param book 
     * @param file 
     * @returns Status
     */
    public addCoverPage(book: Book, file: any): Observable<any> {
        const url = this.baseUrl + "books/" + book.id + "/cover-page";
        var formData: any = new FormData();
        formData.append("file", file);
        return this.http.post(url, formData); 
    }

}