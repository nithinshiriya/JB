import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BooksService }  from "../services/data.service";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
})
export class ListBooksComponent implements OnInit {
  filter = {
    page: 1
  };
  selectedBook: Book;
  bookList: Book[];
  

  constructor(private bookService: BooksService, private modalService: NgbModal) {
    this.bookList = [];
   }

  ngOnInit(): void {
     this.loadBooks();
  }

  loadBooks(){
    this.bookService.getBooks()
     .subscribe( books =>{
       this.bookList = books;
     }, error =>{
       console.log(error);
     })
     
  }

  delete(book: Book): void {
    var modalRef = this.modalService.open(DeleteConfirm);
    modalRef.componentInstance.book= book;
    modalRef.closed
    .subscribe(data =>{
      if(data == "OK"){
        this.deleteBook(book);
      }
    })
  }

  deleteBook(book: Book){
    this.bookService.deleteBook(book)
    .subscribe(dt =>{
        this.loadBooks();
    }, error =>{
      console.log(error);
    })
  }

}



@Component({
  selector: 'delete-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Delete Book</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">"{{book?.title}}"</span> book?</strong></p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('OK')">Ok</button>
  </div>
  `
})
export class DeleteConfirm {
  book: Book;
  constructor(public modal: NgbActiveModal) {}
}