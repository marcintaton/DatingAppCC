import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    MatCardModule,
    MatGridListModule,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      },
    },
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    MatCardModule,
    MatGridListModule,
  ],
})
export class SharedModule {}
