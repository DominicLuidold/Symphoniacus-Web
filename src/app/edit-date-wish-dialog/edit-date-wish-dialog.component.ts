import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateWish } from '@app/_models';
import { WishService } from '@app/_services';

@Component({
  selector: 'app-edit-date-wish-dialog',
  templateUrl: './edit-date-wish-dialog.component.html',
  styleUrls: ['./edit-date-wish-dialog.component.scss']
})
export class EditDateWishDialogComponent implements OnInit {
  @Output() wishUpdate: EventEmitter<any> = new EventEmitter();

  selectedWishType = this.data.dateWish.wishType;
  startDateFormControl = new FormControl('', Validators.required);
  endDateFormControl = new FormControl('', Validators.required);
  reasonFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(45)
  ]);
  minDate = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { dateWish: DateWish },
    private wishService: WishService
  ) {
    // Intentionally empty
  }

  ngOnInit(): void {
    // Set min date to tomorrow
    this.minDate.setDate(new Date().getDate() + 1);

    // Set previously entered values
    this.startDateFormControl.setValue(this.data.dateWish.details.start);
    this.endDateFormControl.setValue(this.data.dateWish.details.end);
    this.reasonFormControl.setValue(this.data.dateWish.reason);
  }

  updateDateWish(): void {
    const dateWish: DateWish = {
      wishId: this.data.dateWish.wishId,
      wishType: 'NEGATIVE',
      target: 'DATE',
      reason: this.reasonFormControl.value,
      details: {
        start: this.startDateFormControl.value,
        end: this.endDateFormControl.value
      }
    };
    this.wishService.updateDateWish(dateWish).subscribe({
      // Emit nothing if Date Wish was added successfully
      next: () => this.wishUpdate.emit(),
      // Emit error message if Date Wish could not be added
      error: err => this.wishUpdate.emit(err)
    });
  }
}
