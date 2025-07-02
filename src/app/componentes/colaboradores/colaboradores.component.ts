import { Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../model/user';

@Component({
  selector: 'app-colaboradores',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule,
     MatSortModule, MatPaginatorModule],
  templateUrl: './colaboradores.component.html',
  styleUrl: './colaboradores.component.css'
})
export class ColaboradoresComponent {
  displayedColumns: string[] = ['id', 'nome', 'email', 'status'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  } 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
