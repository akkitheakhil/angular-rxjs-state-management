import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  handleCloseModal() {
    this.closeModal.emit(true);
  }
}
