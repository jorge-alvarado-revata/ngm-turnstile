import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-index',
  imports: [RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit{


  constructor(
  ){
  }

  ngOnInit(): void {

  
  }



}
