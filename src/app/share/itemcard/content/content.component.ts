import { Component, Input, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { map, shareReplay, take, tap } from 'rxjs/operators';
import { ManagerState } from 'src/app/store';
import { getGlobalParams } from 'src/app/store/auxiliars/auxiliars.selectors';
import { CAROUSEL_TYPE } from '../static-data';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Input() moduleTypeId: string = '83010';
  @Input() product
  imageUrl:any
  windowSize = window.outerWidth
  type
  constructor(private store: Store<ManagerState>) { }

  ngOnInit(): void {
    this.imageUrl = this.store.select(getGlobalParams)
    .pipe(
        take(1),
        map(e =>
            (!!this.product.imageName && this.product.imageName.length > 0 ?
                e.IMAGE_URL + (this.type !== CAROUSEL_TYPE.AD ?'_t_': '')+this.product.imageName: '')
                ),
            shareReplay()
    );
    
  }

  descWindowSize(){
    if (this.product.title.length > 50) {
        return 0
    }
    if (this.windowSize > 1440) {
        return 65
    } else if (this.windowSize < 1441 && this.windowSize > 1300 ) {
        return 30
    } else if (this.windowSize < 1301 && this.windowSize > 1024 ) {
        return 30
    } else if (this.windowSize < 1025 && this.windowSize > 960 ) {
        return this.product.title.length > 20 ? 20 : 57
    } else if (this.windowSize < 600 && this.windowSize > 425) {
        return  30
    } else if (this.windowSize < 426 && this.windowSize > 375) {
        return 85
    }  else if (this.windowSize < 376 && this.windowSize > 320) {
        return 85
    } else {
        return 50
    }
}

}
