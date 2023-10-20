import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  private fb = inject(FormBuilder);
  productForm = this.fb.group({
    name: [null, Validators.required],
    baseCost: [null, Validators.required],
    additionalCost: [null, Validators.required],
    type: [null, Validators.required],
  });

  hasUnitNumber = false;

  types = [1, 2 ];

  onSubmit(): void {
    alert('Thanks!');
  }
}
