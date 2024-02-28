import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../project';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent implements OnInit {
  project:Project
 
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
}