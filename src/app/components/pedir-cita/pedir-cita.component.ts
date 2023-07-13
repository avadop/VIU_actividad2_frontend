import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedir-cita',
  templateUrl: './pedir-cita.component.html',
  styleUrls: ['./pedir-cita.component.css']
})
export class PedirCitaComponent {
  public hora: Date | null;
  public day: Date | null;

  constructor(private route: ActivatedRoute) {
    this.hora = null;
    this.day = null
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log("params", params);
      this.hora = params['hora'];
      this.day = params['dia'];
    })
  }
}
