import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Index', url: '/folder/Index', icon: 'mail' },
    { title: 'Peso, Masa', url: '/folder/Peso, Masa', icon: 'barbell' },
    { title: 'Longitud, distancia', url: '/folder/Longitud, distancia', icon: 'resize' },
    { title: 'Volumen, capacidad', url: '/folder/Volumen, capacidad', icon: 'cube' },
    { title: 'Superficie, área', url: '/folder/Superficie, área', icon: 'square' },
    { title: 'Velocidad', url: '/folder/Velocidad', icon: 'speedometer' },
    { title: 'Temperatura', url: '/folder/Temperatura', icon: 'thermometer' },
    { title: 'Fuerza', url: '/folder/Fuerza', icon: 'hammer' },
    { title: 'Presion', url: '/folder/Presion', icon: 'hand-right' },
  ];
  constructor() {}
}
