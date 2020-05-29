import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MusicalPiece, WishType } from '@app/_models';

@Component({
  selector: 'app-duty-wish-dialog',
  templateUrl: './duty-wish-dialog.component.html',
  styleUrls: ['./duty-wish-dialog.component.css']
})
export class DutyWishDialogComponent implements OnInit {
  wishTypes: WishType[] = [
    { value: 'POSITIVE', viewValue: 'Positive Duty Request' },
    { value: 'NEGATIVE', viewValue: 'Negative Duty Request' }
  ];
  selectedWishType: WishType;

  wishTypeFormControl = new FormControl('', Validators.required);
  reasonFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(45)
  ]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: MusicalPiece[]) {
    // Intentionally empty
  }

  ngOnInit(): void {
    // Intentionally empty
  }
}
