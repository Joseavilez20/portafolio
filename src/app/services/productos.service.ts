import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleProducto } from '../interfaces/detalle-producto.interface';
import { ProductoInterface } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;

  productos: ProductoInterface[] = [];
  productosFiltrados: ProductoInterface[] = [];

  constructor( private http: HttpClient ) { 
    
    this.cargarProductos();

  }

  private cargarProductos() {

    return new Promise( ( resolve, reject) => {

      this.http.get<ProductoInterface[]>('https://portafolio-b7676-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( resp => {
       
        this.productos = resp;
        this.cargando = false;
        resolve(true);
      });

    });
   
  }

  getProducto( id: string ) {
    return this.http.get<DetalleProducto>(`https://portafolio-b7676-default-rtdb.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string ){

   // this.productosFiltrados = this.productos
   if ( this.productos.length === 0 ) {

     this.cargarProductos().then( (value)=> {

       if( value ) {
        
        this.filtrarProductos( termino );

       }
       
          
     });

   }else {

    this.filtrarProductos( termino );
   }
  }

  private filtrarProductos( termino: string ){

    termino = termino.toLocaleLowerCase();

    this.productosFiltrados = this.productos.filter(prod => 

      prod.categoria.toLocaleLowerCase().includes( termino )  || prod.titulo.toLocaleLowerCase().includes( termino )
    
    );
    

  }

}
