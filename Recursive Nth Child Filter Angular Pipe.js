import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recursiveFilter',
})
export class RecursiveFilterPipe implements PipeTransform {

  transform(value: any, searchStr?: any, property?: any): any[] {
    if (!searchStr) return value;

    searchStr = searchStr.toLowerCase();
    return this.searchNodes(value, searchStr, property);
  }

  searchNodes(data, searchStr, property): any {
    if (!searchStr) return data;

    const object = JSON.parse(JSON.stringify(data)) || [];
    object.map(obj => obj.isSearched = 1);
    const arr = this.getSearchedChilds(object, property, searchStr);
    const finalArray = arr.filter(obj => obj.isSearched === 0);
    return finalArray;
  }

  getSearchedChilds(children: any, property, searchStr, isSearched = 1): any {
    children.map(obj => {
      obj.isSearched = isSearched;
      if (obj[property].toLowerCase().includes(searchStr)) {
        obj.isSearched = 0;
      }

      if (obj.children && obj.children.length) {
        const child = this.getSearchedChilds(obj.children, property, searchStr, obj.isSearched);
        if (child.some(object => object.isSearched === 0)) {
          obj.isSearched = 0;
          obj.expanded = true;
          obj.children = child.filter(object => object.isSearched === 0);
        } else {
          obj.children = [];
        }
      }
    });

    return children;
  }
}