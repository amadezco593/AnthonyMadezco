import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { bankProduct } from 'src/app/interfaces/bankProduct';
import { AlertService } from 'src/app/service/alertas/alert.service';
import { BankProductService } from 'src/app/service/bank-product.service';


@Component({
  selector: 'app-bank-product-list',
  templateUrl: './bank-product-list.component.html',
  styleUrls: ['./bank-product-list.component.css']
})
export class BankProductListComponent implements OnInit {


  constructor(private bankProductService: BankProductService, private router: Router, private alertaService: AlertService) { }

  //Columnas de mi tabla
  displayedColumns: string[] = ['logo', 'name', 'description', 'date_release', 'date_revision', 'actions'];
  dataSource = new MatTableDataSource<bankProduct>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: bankProduct, filter: string) => {
      return data.name.toLocaleLowerCase().includes(filter);
    };

    //Obtenemos los productos creados
    this.getBankPRoducts();
  }
  currentPage = 1;

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    // Lógica para cambiar de página
    this.currentPage++;
  }

  applyFilter(dato: any): void {
    const filterValue = dato.target.value.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  //conusltamos productos bancarios
  getBankPRoducts() {
    this.bankProductService.getBankProducts().subscribe(
      (data) => {

        this.dataSource.data = data.data;

        this.dataSource.paginator = this.paginator;
        if (data.data.length == 0) {
          this.alertaService.info("No hay datos para mostrar");
        }

      }, error => {
        console.log(error);
        this.alertaService.error(error.message);
      }
    );
  }

  //Métodos que nos ayudan a navegar hacia las otras pantallas
  createProductPage() {
    this.router.navigate(["create"]);
  }

  editProductPage(id: string) {
    this.router.navigate([`edit/${id}`]);
  }

  //Eliminar productos
  deleteConfirm(dato: any) {
    console.log(dato);
    this.alertaService.confirm(`¿Estás seguro de eliminar le producto ${dato.name}?`)
      .then((result) => {
        if (result) {
          this.bankProductService.deleteBankProduct(dato.id).subscribe((data) => {
            this.alertaService.success("Producto eliminado correctamente");
            this.getBankPRoducts();
          }, error => {
            this.alertaService.error(error.message);
          });
        }
      });
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/imagenes/productoBancario.png';
  }
}



