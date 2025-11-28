import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FlowbiteService } from '../../../../core/services/Flowbite.Service';
import { initFlowbite } from 'flowbite';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {
  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
