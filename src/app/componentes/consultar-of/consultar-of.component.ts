import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OrdemFornecimentoService } from '../../services/ordem-fornecimento.service';
import { OrdemFornecimento } from '../../model/ordem-fornecimento';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consultar-of',
  styleUrl: 'consultar-of.component.css',
  templateUrl: 'consultar-of.component.html',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule],
})
export class ConsultarOFComponent{
  ofService = inject(OrdemFornecimentoService)
  displayedColumns: string[] = ['id', 'colaborador', 'descricao', 'status', 'criacao', 'atualizacao', 'acao'];
  dataSource: MatTableDataSource<OrdemFornecimento>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  
  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.ofService.ordemFornecimentos);
    this.ofService.listar();
    setInterval(() => {
      this.dataSource = new MatTableDataSource(this.ofService.ordemFornecimentos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 100);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

