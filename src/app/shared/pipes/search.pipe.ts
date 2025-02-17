import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(itemsArr:any[], searchText:string ): any[] {
    return itemsArr.filter((item)=> item.title.toLowerCase().includes(searchText.toLowerCase()));
  }

}
