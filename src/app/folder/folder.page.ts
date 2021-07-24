import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string = "Elije una magnitud";
  public medidas: any[];
  public convertido : number;
  public convertido_redondeado : string; 
  public isVisible : boolean = false;
  public isVisible_result : boolean = false
  public precision : number;


  public magnitudes = [
    { title: 'Peso, Masa', url: '/folder/Peso, Masa', icon: 'barbell' },
    { title: 'Longitud, distancia', url: '/folder/Longitud, distancia', icon: 'resize' },
    { title: 'Volumen, capacidad', url: '/folder/Volumen, capacidad', icon: 'cube' },
    { title: 'Superficie, área', url: '/folder/Superficie, área', icon: 'square' },
    { title: 'Velocidad', url: '/folder/Velocidad', icon: 'speedometer' },
    { title: 'Temperatura', url: '/folder/Temperatura', icon: 'thermometer' },
    { title: 'Fuerza', url: '/folder/Fuerza', icon: 'hammer' },
    { title: 'Presion', url: '/folder/Presion', icon: 'hand-right' },
  ];

  cant: number;
  x: number;
  y: number;

  constructor(
  	private activatedRoute: ActivatedRoute,
  	private http : HttpClient,
    private clipboard: Clipboard,
    private toastController : ToastController,
    private loadingController: LoadingController
  	) { }

  portChange(event:  {
    component: IonicSelectableComponent,
    value: any,

  }) {
    
    this.calcular();
  }

  cargando(){
    this.presentLoading();
  }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando medidas',
      duration: 500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Copiado',
      duration: 2000
    });
    toast.present();
  }

  public cargar(){
    console.log(this.folder);

    this.x = undefined;
    this.y = undefined;

    this.isVisible = true;


    this.http.get('./assets/medidas.json')
      .subscribe(data =>{

        this.medidas = data[this.folder];
        
        this.medidas.forEach(item => {      
          item.Medida = this.capitalizeFirstLetter(item.Medida)+' ['+item.Sistema+']';
      });
    });
  }

  public capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  public convertir(cantidad, x, y, magnitud){
    //console.log( cantidad);
    if (magnitud == "Temperatura"){

      if (y.Constante)
         y.Constante = parseFloat(y.Constante);
       else
         y.Constante = 0;

      if (x.Constante)
         x.Constante = parseFloat(x.Constante);
       else
         x.Constante = 0;

      if (x.Medida == "Grado Celsius (°C) [Sistema Internacional]")
        this.convertido = (cantidad  * y.Conversion) + y.Constante;

      else if (y.Medida == "Grado Celsius (°C) [Sistema Internacional]")
        this.convertido = (cantidad - x.Constante)/x.Conversion;

      else{
        this.convertido = (cantidad - x.Constante)/x.Conversion;
        this.convertido = (this.convertido  * y.Conversion) + y.Constante;
      }
    }
    else{
      x = x.Conversion;
      y = y.Conversion;
      this.convertido = (cantidad  * y)/x;
    }
  }

  public calcular(){
    if (this.cant && this.x && this.y)
      console.log(this.convertir(this.cant, this.x, this.y, this.folder));
      this.convertir(this.cant, this.x, this.y, this.folder);
      this.redondear();

  }

  public redondear(){
    if (!this.precision)
      this.precision = 9;
    this.convertido_redondeado = parseFloat(this.convertido.toString()).toFixed(this.precision);
  }


  public click_btn_copiar(){
    this.clipboard.copy(this.convertido_redondeado);
    console.log("copiado");

    this.presentToast();
  
  }


}
