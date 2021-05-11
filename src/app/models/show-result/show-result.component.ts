import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.scss']
})
export class ShowResultComponent implements OnInit {
  @Input() myform: any;
  title;
  objectKeys = Object.keys;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
