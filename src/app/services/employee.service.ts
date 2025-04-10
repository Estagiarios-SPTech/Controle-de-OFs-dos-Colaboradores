import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/Employee';


@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    private urlEmployee: string = 'http://localhost:8080/employees';

    constructor(private http: HttpClient) {

    }
    
    loadEmployees(): void {
        this.select().subscribe(data => {
            this.employees = data;
        });
    }

    employees: Employee[] = [];
    select(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.urlEmployee + "/findAll");
    }

    cadastrarEmployee(obj:Employee):Observable<Employee>{
        return this.http.post<Employee>(this.urlEmployee + "/new", obj);
      }
}