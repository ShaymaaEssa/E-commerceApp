import { Subscription } from 'rxjs';
import { ICategory } from '../../shared/interfaces/icategory';
import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy{

  private readonly categoriesService = inject(CategoriesService);
  private categoriesSubscription!: Subscription;

  categoriesList: WritableSignal<ICategory[]> = signal ([]);
  selectedCategory:WritableSignal<ICategory> = signal({}as ICategory);
  @ViewChild('defaultModal') modal!: ElementRef;
  @ViewChild('modalOverlay') modalOverlay!: ElementRef;


  ngOnInit(): void {
    this.categoriesSubscription = this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categoriesList.set(res.data);
      }
    })
  }

  setSelectedCategory(category:ICategory){
    this.selectedCategory.set(category);
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
    this.categoriesSubscription.unsubscribe();
  }
}
