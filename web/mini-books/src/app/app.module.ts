import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { BookObjectEditComponent } from './book-object-edit/book-object-edit.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { BooksService } from "./services/data.service";
import { AppService } from "./services/app.service";

@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    EditBookComponent,
    ViewBookComponent,
    BookObjectEditComponent,
    ListBooksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [BooksService, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
