import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/Employee';


@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    private urlSpringBoot: string = 'http://localhost:8080/employees';
    private urlQuarkus: string = 'http://localhost:8081/collaborator';

    constructor(private http: HttpClient) {

    }
    
    loadEmployees(): void {
        this.select().subscribe(data => {
            this.employees = data;
        });
    }

    employees: Employee[] = [];
    select(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.urlSpringBoot + "/findAll");
    }

    cadastrarEmployee(obj:Employee):Observable<Employee>{
        return this.http.post<Employee>(this.urlQuarkus + "/cadastrar", obj);
      }
}