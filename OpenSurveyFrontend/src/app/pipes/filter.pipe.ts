import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    value: any[],
    filterString: string,
    userName: string,
    filterGroup: any[]
  ): any[] {
    const resultArray = [];

    if (value || filterGroup) {
      console.log(value)
      console.log(filterGroup)
      if (filterGroup == null){
        return value
      }
      if (
        (value.length === 0 || filterString === '' || userName === '') && filterGroup.length === 0) {
        console.log('null 1');
        return value;
      }
      for (const item of value) {

        if (item.user.userName.includes(filterString) && filterString != '') {
          console.log("name match")
          resultArray.push(item);
        }

        for (const group of filterGroup) {
          console.log("group ID")
          console.log(group.id)

          console.log("userGroups")
          console.log(item.userGroups)
          if (item.userGroups.includes(group.id)) {
            console.log("pushed")
            resultArray.push(item);
          }
        }
      }
      return resultArray;
    }
    console.log('null 2');
    return [];
  }
}
