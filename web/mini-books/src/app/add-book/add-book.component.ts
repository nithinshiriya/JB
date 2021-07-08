import { Component, OnInit } from '@angular/core';
import {Book, BookEditModel} from "../models/book";
import { BooksService }  from "../services/data.service";
import { AppService }  from "../services/app.service";
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  book: Book;
  constructor(private bookService: BooksService, private router: Router,
    private appService: AppService) { 
    this.book = new Book();
  }

  ngOnInit(): void {
  }

  addBookEvent(book: BookEditModel){
    this.addBook(book)
    .subscribe(newBook =>{ 
      book.book.id = newBook.id;
        if(book.file){
          this.uploadConverPage(book);
          return;
        }
        this.sendSuccessMessage(newBook) ;
        this.router.navigate(['']);
    }, error => {
      this.sendFailureMessage(error.message);
      console.log(error);
    });
  }

  uploadConverPage(book: BookEditModel){
    this.bookService.addCoverPage(book.book, book.file)
    .subscribe(newBook =>{     
      this.sendSuccessMessage(newBook) ;
      this.router.navigate(['']);      
    }, error =>{
      this.sendFailureMessage(error.message);
      console.log(error);
    })
  }

  addBook(book: BookEditModel):  Observable<any>{
    return this.bookService.addBook(book.book)
    .pipe(map(result => {
      return result;
    }));
  }

  sendSuccessMessage(book: Book){
    this.appService.displayMessage(`New book added: ${book.title}`, "success");
  }

  sendFailureMessage(message: string){
    this.appService.displayMessage(message, "danger");
  }

}
