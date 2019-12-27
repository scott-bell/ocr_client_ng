import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'app-alert-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessAlertComponent {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

}
