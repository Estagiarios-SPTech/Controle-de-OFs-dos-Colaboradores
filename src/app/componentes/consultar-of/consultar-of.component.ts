import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

interface ordemFornecimento {
  id: string;
  colaborador: string;
  descricao: string;
  status: string;
  criacao: string;
  atualizacao: string;
}
@Component({
  selector: 'app-consultar-of',
  styleUrl: 'consultar-of.component.css',
  templateUrl: 'consultar-of.component.html',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
})
export class ConsultarOFComponent implements AfterViewInit {
  ordemFornecimentos = [
    {
      id: '1',
      colaborador: 'Fabio',
      descricao: 'Instalação de Software',
      status: 'Iniciada',
      criacao: '20/02/2025',
      atualizacao: '25/02/2025'
    },
    {
      id: '2',
      colaborador: 'Shirley',
      descricao: 'Manutenção da impressora',
      status: 'Iniciada',
      criacao: '15/01/2025',
      atualizacao: '23/02/2025'
    },
    
  ]
  displayedColumns: string[] = ['id', 'colaborador', 'descricao', 'status', 'criacao', 'atualizacao', 'acao'];
  dataSource: MatTableDataSource<ordemFornecimento>;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.ordemFornecimentos);
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

