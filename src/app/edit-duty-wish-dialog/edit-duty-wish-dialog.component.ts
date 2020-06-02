import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DutyWish, MusicalPiece } from "@app/_models";
import { WishService } from "@app/_services";

@Component({
  selector: 'app-edit-duty-wish-dialog',
  templateUrl: './edit-duty-wish-dialog.component.html',
  styleUrls: ['./edit-duty-wish-dialog.component.scss']
})
export class EditDutyWishDialogComponent implements OnInit {
  @Output() wishUpdate: EventEmitter<any> = new EventEmitter();

  reasonFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(45)
  ]);
  wishType = this.data.dutyWish.wishType + ' ' + this.data.dutyWish.target;
  selectedMusicalPieces: MusicalPiece[] = [];
  forEntireSop = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { dutyWish: DutyWish },
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
      this.selectedMusicalPieces = this.data.dutyWish.details.musicalPieces;
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

  updateDutyWish(): void {
    const dutyWish: DutyWish = {
      wishType: this.data.dutyWish.wishType,
      target: this.data.dutyWish.target,
      reason: this.reasonFormControl.value,
      details: {
        dutyId: this.data.dutyWish.details.dutyId,
        musicalPieces: this.selectedMusicalPieces,
        forEntireSop: this.forEntireSop
      }
    };
    this.wishService.addDutyWish(dutyWish).subscribe({
      // Emit nothing if Duty Wish was updated successfully
      next: () => this.wishUpdate.emit(),
      // Emit error message if Duty Wish could not be updated
      error: err => this.wishUpdate.emit(err)
    });
  }
}
