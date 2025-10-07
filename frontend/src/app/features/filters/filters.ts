import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.html',
  styleUrls: ['./filters.css']
})
export class FiltersComponent {
  @Output() apply = new EventEmitter<{ min?: number; max?: number; condiciones?: string[] }>();

  min?: number;
  max?: number;
  condiciones: string[] = [];

  toggleCond(value: string, checked: boolean) {
    if (checked) this.condiciones.push(value);
    else this.condiciones = this.condiciones.filter(c => c !== value);
  }

  doApply() {
    this.apply.emit({ min: this.min, max: this.max, condiciones: this.condiciones });
  }
}
