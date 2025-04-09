import {Component, inject, Injectable, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OrdemFornecimentoService } from '../../services/ordem-fornecimento.service';
import { OrdemFornecimento } from '../../model/ordemFornecimento';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalOfComponent } from '../modal-of/modal-of.component';


@Component({
  selector: 'app-consultar-of',
  styleUrl: 'consultar-of.component.css',
  templateUrl: 'consultar-of.component.html',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule],
})
export class ConsultarOFComponent{
  ofService = inject(OrdemFornecimentoService)
  displayedColumns: string[] = ['codigo', 'collaborator', 'description', 'status', 'created_at', 'updated_at', 'acao'];
  dataSource: MatTableDataSource<OrdemFornecimento> = new MatTableDataSource;
  
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor() {
    this.listar();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listar():void{
    this.ofService.vericarLista().subscribe(retorno => {
      this.ofService.ordemFornecimentos = retorno
      this.dataSource = new MatTableDataSource(this.ofService.ordemFornecimentos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sort.sort({id: "codigo", start: "desc", disableClear: true })
    })
  }

  
  listarPorId(codigo:number):void{
    this.ofService.verificarListaId(codigo)
    .subscribe(retorno => {
      this.ofService.ordemFornecimento = retorno
      this.openDialog()
    })
  }

  excluir(codigo:number):void{
    this.ofService.verificarExclusao(codigo).subscribe(() => this.listar());
  }

  readonly dialog = inject(MatDialog);
  
  openDialog() {
    this.dialog.open(ModalOfComponent,{
      width: '600px'
    });

    this.dialog.afterAllClosed.subscribe(() => this.listar())
  }
}

