import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookObjectEditComponent } from './book-object-edit.component';

describe('BookObjectEditComponent', () => {
  let component: BookObjectEditComponent;
  let fixture: ComponentFixture<BookObjectEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookObjectEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookObjectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
