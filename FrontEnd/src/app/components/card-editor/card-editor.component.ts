import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Flashcard, FlashcardDTO } from 'src/app/models/flashcard/flashcard';

@Component({
  selector: 'app-card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.css']
})
export class CardEditorComponent implements OnInit {
  form!: FormGroup;
  card!: Flashcard;

  constructor (
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CardEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Flashcard
  ) {
    this.card = data;
  }

  ngOnInit() {
    this.dialogRef.updateSize('300px', '475px');
    this.form = this.fb.group({
      id: [this.card.id, []],
      question: [this.card.question, []],
      answer: [this.card.answer, []]
    })
  }

  Save() {
    this.dialogRef.close(this.form.value);
  }

  Close() {
    this.dialogRef.close();
  }

}
