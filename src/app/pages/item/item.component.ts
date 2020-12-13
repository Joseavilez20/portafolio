import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleProducto } from 'src/app/interfaces/detalle-producto.interface';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: DetalleProducto | undefined;
  id: string | undefined;

  constructor( private route: ActivatedRoute, 
               public productoService: ProductosService ) { }

  ngOnInit(): void {

    this.route.params
      .subscribe( parametros => {

        this.productoService.getProducto(parametros['id'])
          .subscribe( producto  => {
             this.id = parametros['id'];
             this.producto = producto;
          });
      });
  }

}
