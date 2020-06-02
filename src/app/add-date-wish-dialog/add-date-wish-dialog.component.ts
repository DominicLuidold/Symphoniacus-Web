import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateWish } from '@app/_models';
import { WishService } from '@app/_services';

@Component({
  selector: 'app-date-wish-dialog',
  templateUrl: './add-date-wish-dialog.component.html',
  styleUrls: ['./add-date-wish-dialog.component.scss']
})
export class AddDateWishDialogComponent implements OnInit {
  @Output() wishUpdate: EventEmitter<any> = new EventEmitter();

  startDateFormControl = new FormControl('', Validators.required);
  endDateFormControl = new FormControl('', Validators.required);
  reasonFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(45)
  ]);

  defaultWishType = 'negative';
  minDate = new Date();

  constructor(private wishService: WishService) {
    // Set min date to tomorrow
    this.minDate.setDate(new Date().getDate() + 1);
  }

  ngOnInit(): void {
    // Intentionally empty
  }

  createDateWish(): void {
    const dateWish: DateWish = {
      wishType: 'NEGATIVE',
      target: 'DATE',
      reason: this.reasonFormControl.value,
      details: {
        start: this.startDateFormControl.value,
        end: this.endDateFormControl.value
      }
    };
    this.wishService.addDateWish(dateWish).subscribe({
      // Emit nothing if Date Wish was added successfully
      next: () => this.wishUpdate.emit(),
      // Emit error message if Date Wish could not be added
      error: err => this.wishUpdate.emit(err)
    });
  }
}
