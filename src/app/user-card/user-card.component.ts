import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input()
  user!: User;

  @Output() onUpdate = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter();

}
