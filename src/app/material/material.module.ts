import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatButtonModule, MatSortModule, MatPaginatorModule, MatIconModule, MatFormFieldModule, MatInput, MatInputModule, MatCard, MatCardModule, MatSnackBarModule, MatSidenavModule, MatMenuModule, MatDividerModule, MatToolbarModule, MatDialogModule, MatAutocompleteModule, MatExpansionModule, MatNativeDateModule, MatDatepickerModule, MatSelectModule, MAT_DATE_LOCALE, MatProgressBarModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatProgressBarModule

  ], 
  exports:[
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatProgressBarModule
  ],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue:'es-ES'}
  ]
})
export class MaterialModule { }
