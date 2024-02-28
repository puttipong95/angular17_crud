import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { Project } from '../project';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  project:Project
  isSaving:boolean = false
 
  constructor(public projectService: ProjectService, private route: ActivatedRoute) {
    this.project = {
      id:this.route.snapshot.params['id'],
      name: '',
      description: ''
    }
  }
 
  ngOnInit(): void {
    this.projectService.show(this.route.snapshot.params['id']).then((data: any) => {
      this.project = data?.data
    }).catch((error: any) => {return error})
     
  }
 
  handleSave(){
    this.isSaving = true
    this.projectService.update(this.project)
    .then((data: any) => {
      this.isSaving = false
      Swal.fire({
        icon: 'success',
        title: 'Project saved successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      return data
 
    }).catch((error: any) => {
      this.isSaving = false
      Swal.fire({
        icon: 'error',
        title: 'An Error Occured!',
        showConfirmButton: false,
        timer: 1500
      })
      return error
    })
  }
}