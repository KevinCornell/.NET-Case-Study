import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { CardEditorComponent } from './card-editor.component';

describe('CardEditorComponent', () => {
  let component: CardEditorComponent;
  let fixture: ComponentFixture<CardEditorComponent>;
  const dialogRefMock = {
    afterClosed() {
      return of(true);
    },
    updateSize(widths?:string, height?:string){},
    close(){return true}
  };
  const dialogMock = {
    open:() => dialogRefMock
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatDialogModule],
      providers: [
        { provide: MatDialog, useValue: dialogMock},
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {}}
      ],
      declarations: [ CardEditorComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return nothing if closed', () => {
    expect(component.Close()).toEqual(undefined);
  });

  it('should return a flashcard if saved', () => {
    expect(component.Save()).toEqual(undefined);
  })
});
