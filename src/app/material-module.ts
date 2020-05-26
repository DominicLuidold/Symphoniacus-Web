import { NgModule } from '@angular/core';

// Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ]
})
export class MaterialModule {}
