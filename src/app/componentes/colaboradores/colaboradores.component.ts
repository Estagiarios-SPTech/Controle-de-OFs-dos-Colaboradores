import { Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../model/User';
import { AuthService } from '../../services/auth/auth.service';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
  selector: 'app-colaboradores',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule,
     MatSortModule, MatPaginatorModule],
  templateUrl: './colaboradores.component.html',
  styleUrl: './colaboradores.component.css'
})
export class ColaboradoresComponent {
  displayedColumns: string[] = ['id', 'nome', 'email', 'status'];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor(private auth: AuthService, private employeeService: EmployeeService) {
    this.carregarColaboradores()
  } 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  carregarColaboradores(){
    this.employeeService.acharColaboradoresPorRt(this.auth.getId() as number).subscribe(
      retorno => {
        this.dataSource = new MatTableDataSource(retorno)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate = (data: Employee, filter: string) => 
          JSON.stringify(data).toLowerCase().includes(filter.toLowerCase());
        
        this.dataSource.sortingDataAccessor = (data: any, column: string) => {
          if (column === 'id') return data.user.id;
          if (column === 'nome') return data.user.name;
          if (column === 'email') return data.user.email;
          if (column === 'status') return data.status;
          return data[column];
        };
      }
    )
  }
}
