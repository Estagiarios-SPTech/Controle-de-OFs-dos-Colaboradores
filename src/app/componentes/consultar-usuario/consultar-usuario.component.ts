import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UsuarioService, usuario } from '../../services/usuario.service';

@Component({
  selector: 'app-consultar-usuario',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './consultar-usuario.component.html',
  styleUrl: './consultar-usuario.component.css'
})
export class ConsultarUsuarioComponent implements AfterViewInit{
  usuarioService = inject(UsuarioService)

  displayedColumns: string[] = ['id', 'colaborador', 'status'];
  dataSource: MatTableDataSource<usuario>;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.usuarioService.usuarios);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
