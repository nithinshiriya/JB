import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService }  from "../services/data.service";
import {Book} from "../models/book";
import * as moment from 'moment';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {

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

  constructor(private actRoute: ActivatedRoute, private bookService: BooksService) { }

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

  getFormatedDate(date: any): string {
    return moment(date).format('DD-MM-YYYY');
  }
}
