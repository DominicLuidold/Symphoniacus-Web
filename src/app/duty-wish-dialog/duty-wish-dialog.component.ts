import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MusicalPiece, WishType } from '@app/_models';
import { DutyWish } from '@app/_models/wish';
import { WishService } from '@app/_services';

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
  wishTypeFormControl = new FormControl('', Validators.required);
  reasonFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(45)
  ]);

  selectedMusicalPieces: MusicalPiece[] = [];
  forEntireSop = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { dutyId: number, musicalPieces: MusicalPiece[] },
    private wishService: WishService
  ) {
    // Intentionally empty
  }

  ngOnInit(): void {
    // Intentionally empty
  }

  onToggle(): void {
    this.forEntireSop = !this.forEntireSop;
    if (this.forEntireSop) {
      this.selectedMusicalPieces = this.data.musicalPieces;
    } else {
      this.selectedMusicalPieces = [];
    }
  }

  selectMusicalPiece(musicalPiece: MusicalPiece): void {
    if (this.selectedMusicalPieces.includes(musicalPiece)) {
      this.selectedMusicalPieces.splice(this.selectedMusicalPieces.indexOf(musicalPiece), 1);
    } else {
      this.selectedMusicalPieces.push(musicalPiece);
    }
  }

  createDutyWish(): void {
    const dutyWish: DutyWish = {
      wishType: this.wishTypeFormControl.value,
      target: 'DUTY',
      reason: this.reasonFormControl.value,
      details: {
        dutyId: this.data.dutyId,
        musicalPieces: this.selectedMusicalPieces,
        forEntireSop: this.forEntireSop
      }
    };
    this.wishService.addDutyWish(dutyWish).subscribe({
      next: response => {
        console.log('Duty Wish created', response.payload);
      }
    });
  }
}
