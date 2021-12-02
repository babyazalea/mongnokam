import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  state,
  style,
  trigger,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-alert-bar',
  templateUrl: './alert-bar.component.html',
  styleUrls: ['./alert-bar.component.css'],
  animations: [
    trigger('showHide', [
      state(
        '*',
        style({
          transform: 'translateY(-100%)',
        })
      ),
      state(
        'show',
        style({
          transform: 'translateY(0)',
        })
      ),
      state(
        'hide',
        style({
          transform: 'translateY(-100%)',
        })
      ),
      transition('* => show', [animate('0.2s')]),
      transition('* => hide', [animate('0s')]),
    ]),
  ],
})
export class AlertBarComponent {
  @Input() alertMessage!: string;
  @Output() clearAlertEvent: EventEmitter<void> = new EventEmitter();

  clearAlertHandler() {
    this.clearAlertEvent.emit();
  }
}
