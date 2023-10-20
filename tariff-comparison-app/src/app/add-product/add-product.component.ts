import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { TariffApiServiceService } from '../services/tariff-api-service.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  private fb = inject(FormBuilder);
  destroy$: Subject<boolean> = new Subject<boolean>();

  productForm = this.fb.group({
    name: [null, Validators.required],
    baseCost: [null, Validators.required],
    additionalKwhCost: [null, Validators.required],
    includedKwh: [null],
    type: [null, Validators.required],
  });

  hasUnitNumber = false;

  types = [1, 2 ];

  constructor(private tariffApiService: TariffApiServiceService){}

  onSubmit(): void {
    this.tariffApiService.addTariffProduct(this.productForm.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);
      if (data)
      alert('Added new Product!');
    });
  }

  
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
