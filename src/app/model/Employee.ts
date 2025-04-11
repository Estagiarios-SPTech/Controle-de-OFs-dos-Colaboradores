import { User } from "./User";

export class Employee {
    id: number | undefined;
    employee: User = new User;    
    rt: User = new User;  
    manager: User = new User;
    status: string = "Disponivel";


}