import { Injectable } from '@angular/core';

export interface usuario{
  id: string;
  colaborador: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  usuarios: usuario[] = [
        {
          id: '1',
          colaborador: 'Usuario01',
          status: 'Disponível',
        },
        {
          id: '2',
          colaborador: 'Usuario02',
          status: 'Aguardando Respostas',
        },
        {
          id: '3',
          colaborador: 'Usuario03',
          status: 'Finalizando',
        },
        
      ]
}
