import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-modal-box',
  standalone: true,
  imports: [],
  templateUrl: './modal-box.component.html',
  styleUrl: './modal-box.component.scss'
})
export class ModalBoxComponent {
  @Input() message: string = '';
  @Input() back: boolean = false;
}
