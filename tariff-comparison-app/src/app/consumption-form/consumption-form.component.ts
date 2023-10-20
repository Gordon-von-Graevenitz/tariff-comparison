import { Component, EventEmitter, OnDestroy, Output, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TariffApiServiceService } from '../services/tariff-api-service.service';


@Component({
  selector: 'app-consumption-form',
  templateUrl: './consumption-form.component.html',
  styleUrls: ['./consumption-form.component.scss']
})
export class ConsumptionFormComponent implements OnDestroy {
  @Output() tariffItems = new EventEmitter<any>();
  destroy$: Subject<boolean> = new Subject<boolean>();
  showTable = false;
  
  constructor(private tariffApiService: TariffApiServiceService){}

  private fb = inject(FormBuilder);
  consumptionForm = this.fb.group({
    consumption: [null, Validators.required],
  });

  onSubmit(): void {
    this.tariffItems.emit(null);
    this.tariffApiService.getAnnualCosts(this.consumptionForm.controls.consumption.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);
      if (data){
        this.tariffItems.emit(data);
      }
      else
        this.showTable = false;
    });
  }

  
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
