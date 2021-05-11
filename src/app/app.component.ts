import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DataService } from "./service/data-service.service";
import { debounceTime } from "rxjs/operators";
import { forkJoin } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShowResultComponent } from "./models/show-result/show-result.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'informatica-assignment';
  fields;
  myform: FormGroup;

  constructor(private service: DataService, private modalService: NgbModal) {
    forkJoin(this.service.getEntityMetaData(), this.service.getEntityData())
    .subscribe(data => {
        console.log(data)
        const controls = {};
        let fieldData = data[0];
        let defaultData = data[1];
        this.fields = fieldData['field'];
        this.fields.forEach(res => {
          if(!res.system){
            res.defaultValue = defaultData[res.name]
            controls[res.name] = new FormControl(res.defaultValue);
          }
        });
        this.myform = new FormGroup(controls);
        this.myform['$$originalValue'] = this.myform.value;
        console.log(this.myform)
      });
  }

  ngOnInit() {

  }

  onSubmit() {
    console.log(this.myform);
    const modalRef = this.modalService.open(ShowResultComponent, { size: 'xl' });
    modalRef.componentInstance.myform = this.myform;
  }

  onchange(ev, formName): void {
    this.myform.get(formName).valueChanges.pipe(
        debounceTime(1000)
    )
    .subscribe(
      (text: string) => {
        console.log(text);
      },
      err => {
        console.log(err);
      }
    );
  }
}
