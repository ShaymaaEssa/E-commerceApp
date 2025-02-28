import { ICategory } from '../../shared/interfaces/icategory';
import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  private readonly categoriesService = inject(CategoriesService);
  categoriesList: WritableSignal<ICategory[]> = signal ([]);
  selectedCategory:WritableSignal<ICategory> = signal({}as ICategory);

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categoriesList.set(res.data);
      }
    })
  }

  setSelectedCategory(category:ICategory){
    this.selectedCategory.set(category);
  }

}
