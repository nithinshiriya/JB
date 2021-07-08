import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBooksComponent } from "./list-books/list-books.component";
import { AddBookComponent } from "./add-book/add-book.component";
import { EditBookComponent } from "./edit-book/edit-book.component";
import { ViewBookComponent } from "./view-book/view-book.component";

const routes: Routes = [
  { path: '', component: ListBooksComponent },
  { path: 'add', component: AddBookComponent },
  { path: 'edit/:id', component: EditBookComponent },
  { path: 'view/:id', component: ViewBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
