import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {Book, BookEditModel} from "../models/book";

@Component({
  selector: 'app-book-object-edit',
  templateUrl: './book-object-edit.component.html',
  styleUrls: ['./book-object-edit.component.scss']
})
export class BookObjectEditComponent implements OnInit {

  @Input() public book: Book;
  @Output() saveBookEvent = new EventEmitter<BookEditModel>();
  bookForm: FormGroup;
  file: any;

  constructor() { }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl(this.book ? this.book.title: "", Validators.required),
      author: new FormControl(this.book ? this.book.author: "", Validators.required)
    },
      { updateOn: "change" }
    );
  }

  onFormSubmit(){
    if(!this.bookForm.valid){
      console.error("Please input required data");
      return;
    }
    this.book.title = this.bookForm.value["title"];
    this.book.author = this.bookForm.value["author"];   

    var modifiedBook = new BookEditModel();
    modifiedBook.book = this.book;
    modifiedBook.file = this.file   
    this.saveBookEvent.emit(modifiedBook);    
  }

  selectFile(event: any){
    const selectedFiles = event.target.files;
    this.file = selectedFiles[0];
  }

}
