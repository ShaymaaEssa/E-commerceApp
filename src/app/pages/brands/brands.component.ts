import { Component, ElementRef, inject, signal, ViewChild, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Subscription } from 'rxjs';
import { IBrand } from '../../shared/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

   private readonly brandsService = inject(BrandsService);
    private brandsSubscription!: Subscription;
  
    brandsList: WritableSignal<IBrand[]> = signal ([]);
    selectedBrand:WritableSignal<IBrand> = signal({}as IBrand);
    @ViewChild('defaultModal') modal!: ElementRef;
    @ViewChild('modalOverlay') modalOverlay!: ElementRef;
  
  
    ngOnInit(): void {
      this.brandsSubscription = this.brandsService.getAllBrands().subscribe({
        next:(res)=>{
          console.log(res.data);
          this.brandsList.set(res.data);
        }
      })
    }
  
    setSelectedBrand(brand:IBrand){
      this.selectedBrand.set(brand);
      console.log(this.modal);
      if (this.modal) {
        this.modal.nativeElement.classList.remove('hidden');
        this.modal.nativeElement.classList.add('flex'); // Use flex to make it visible
        this.modalOverlay.nativeElement.classList.remove("hidden");
        console.log(this.modal);
      }
    }
  
    closeModal() {
      if (this.modal) {
        this.modal.nativeElement.classList.add('hidden');
        this.modal.nativeElement.classList.remove('flex');
        this.modalOverlay.nativeElement.classList.add("hidden");
      }
    }
  
    ngOnDestroy(): void {
      this.brandsSubscription.unsubscribe();
    }

}
