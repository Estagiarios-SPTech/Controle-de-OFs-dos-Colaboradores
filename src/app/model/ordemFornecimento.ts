import { Employee } from "./Employee";


export class OrdemFornecimento {
    codigo: number | undefined;
    employee: Employee = new Employee;
    description: string = "";
    status: string = "";
    created_at: string = "";
    updated_at: string = "";
}