import { Component, Input, OnInit } from '@angular/core';
import { lista } from 'src/app/pages/presentation-page/emulation-data';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'app-section-space',
  templateUrl: './section-space.component.html',
  styleUrls: ['./section-space.component.scss']
})
export class SectionSpaceComponent implements OnInit {
  @Input() title = 'title'
  @Input() height = 'fit-content'
  @Input() additionalClass = ''
  constructor() { }

  ngOnInit(): void {
  }

}
