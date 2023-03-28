import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'menufilter'
})
export class MenufilterPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    return items.filter(item => item.menuid == filter.id);
}

}
