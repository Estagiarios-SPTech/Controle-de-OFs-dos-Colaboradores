import {Component, Input, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() titulo: string = "";
  @Input() img: string = "";
  @Input() rota: string = "";
}
