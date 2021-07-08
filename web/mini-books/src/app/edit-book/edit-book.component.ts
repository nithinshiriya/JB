import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Book, BookEditModel} from "../models/book";
import { BooksService }  from "../services/data.service";
import { AppService }  from "../services/app.service";
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  private _bookId: number;
  @Input() public get bookId(): number {
    return this._bookId;
  }
  public set bookId(id: number) {
    this._bookId = id;
    this.loadBook(id);
  }

  book: Book;
  loading = true;
  hasError = false;
  errorString: string;
  constructor(private actRoute: ActivatedRoute, private bookService: BooksService,
    private router: Router, private appService: AppService) { 
  }


  ngOnInit(): void {
    const id = this.actRoute.snapshot.params.id;
    if(id){
      this.bookId = id;
      return;
    }

    console.log("Book id not provided");
    
  }

  private loadBook(id: number){
    this.loading = true;
    this.bookService.getBook(id)
    .subscribe(data =>{
      this.book = data;
      this.loading = false
    }, error =>{
      console.log(error);
      this.errorString = error;
      this.hasError = true;
      this.loading = false
    })
  }

  editBook(book: BookEditModel){
    this.modifyBook(book)
    .subscribe(data =>{
        if(book.file){
          this.uploadConverPage(book);
          return;
        }
        this.sendSuccessMessage(data);
        this.router.navigate(['']);
    }, error => {
      this.sendFailureMessage(error.message);
      console.log(error);
    });
  }

  uploadConverPage(book: BookEditModel){
    this.bookService.addCoverPage(book.book, book.file)
    .subscribe(newBook =>{            
      this.sendSuccessMessage(newBook);
      this.router.navigate(['']);
    }, error =>{
      this.sendFailureMessage(error.message);
    })
  }

  modifyBook(book: BookEditModel):  Observable<any>{
    return this.bookService.modifyBook(book.book)
    .pipe(map(result => {
      return result;
    }));
  }

  sendSuccessMessage(book: Book){
    this.appService.displayMessage(`Edit book successful: ${book.title}`, "success");
  }

  sendFailureMessage(message: string){
    this.appService.displayMessage(message, "danger");
  }
}
