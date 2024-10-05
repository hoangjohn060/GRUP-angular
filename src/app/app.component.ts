  import { Component } from '@angular/core';
  import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { RouterOutlet } from '@angular/router';
  import { EmployeeModel } from '../model/Employee';

  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ReactiveFormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
  })
  export class AppComponent {

    employeeForm: FormGroup = new FormGroup({})
    employeeObj: EmployeeModel = new EmployeeModel()
    employeeList: EmployeeModel[] = [];
    constructor() {
      this.createForm();

      const oldData = localStorage.getItem("EmpData");
      if (oldData != null) {
        const parseData = JSON.parse(oldData);

        this.employeeList = parseData;
      }
    }
    rest() {
      this.employeeObj = new EmployeeModel();
      this.createForm();
    }
    createForm() {
      this.employeeForm = new FormGroup({
        empid: new FormControl(this.employeeObj.empId),
        name: new FormControl(this.employeeObj.name, [Validators.required]),
        city: new FormControl(this.employeeObj.city),
        address: new FormControl(this.employeeObj.address),
        contactNo: new FormControl(this.employeeObj.contactNo),
        emailId: new FormControl(this.employeeObj.emailId),
        pincode: new FormControl(this.employeeObj.pincode, [Validators.required, Validators.minLength(6)]),
        state: new FormControl(this.employeeObj.state),
      })
    }
    onSave() {
      debugger;
      const oldData = localStorage.getItem("EmpData");
      if (oldData != null) {
        const parseData = JSON.parse(oldData);
        this.employeeForm.controls['empid'].setValue(parseData.length + 1);
        this.employeeList.unshift(this.employeeForm.value);
      } else {
        this.employeeList.unshift(this.employeeForm.value);
      }
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList))

    }
    onEdit(item: EmployeeModel) {
      this.employeeObj = item;
      this.createForm();
    }
    onUpdate() {
      const record = this.employeeList.find(m => m.emailId == this.employeeForm.controls['empid'].value)
      if (record != undefined) {
        record.address = this.employeeForm.controls['address'].value
        record.name = this.employeeForm.controls['name'].value
        record.contactNo = this.employeeForm.controls['contactNo'].value
      }
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList))
      this.rest()
    }
    onDelete(id: number) {
      const isDelete = confirm("Are you sure you want to Delete?");
      if (isDelete) {
        const index = this.employeeList.findIndex(m => m.empId === id);

        if (index !== -1) {  // Kiểm tra nếu index hợp lệ
          this.employeeList.splice(index, 1);  // Xóa phần tử tại vị trí index
          localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
        }
      }
    }

  }
