import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bankProduct } from 'src/app/interfaces/bankProduct';
import { AlertService } from 'src/app/service/alertas/alert.service';
import { BankProductService } from 'src/app/service/bank-product.service';

@Component({
  selector: 'app-bank-product-edit',
  templateUrl: './bank-product-edit.component.html',
  styleUrls: ['./bank-product-edit.component.css']
})
export class BankProductEditComponent {
  registroForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private bankProductService: BankProductService,
    private router: Router,
    private route: ActivatedRoute,
    private alertaService: AlertService) {
    //Inicializamos el formulario
   
  }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      id: [{ value: '', disabled: true }], // Solo números
      name: ['', [Validators.required,Validators.pattern('^.{5,100}$')]],
      description: ['', [Validators.required,Validators.pattern('^.{10,200}$')]],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required, this.validDateRelease]],
      date_revision: [{ value:'', disabled: true }, Validators.required]  // Campo deshabilitado
    });
    this.route.paramMap.subscribe(params => {
      var productID = params.get('id'); // Obtén el parámetro 'id' de la URL
      if (productID !== null) {
        this.getProduct(productID).then((pr: bankProduct) => {
          this.registroForm.patchValue({
            id: pr.id,
            name: pr.name,
            description: pr.description,
            logo: pr.logo,
            date_release: pr.date_release,
            date_revision: pr.date_revision.toString()
          });
        }).catch(error => {
          this.alertaService.error(error.message);
        });
      }
    });
  }



  // Método para enviar el formulario
  onSubmit(): void {
    if (this.registroForm.valid) {
      let producto: bankProduct = {
        id: this.registroForm.get('id')?.value,
        name: this.registroForm.get('name')?.value,
        description: this.registroForm.get('description')?.value,
        logo: this.registroForm.get('logo')?.value,
        date_release: this.registroForm.get('date_release')?.value,
        date_revision: this.registroForm.get('date_revision')?.value
      };
      this.updateProduct(producto);


    } else {
      this.alertaService.warning("El formulario no comple las validaciones");
    }
  }


  // Métodos de conveniencia para obtener controles
  get id() { return this.registroForm.get('id'); }
  get name() { return this.registroForm.get('name'); }
  get description() { return this.registroForm.get('description'); }
  get logo() { return this.registroForm.get('logo'); }
  get date_release() { return this.registroForm.get('date_release'); }


  //Validación para la fecha de revisión
  validDateRelease(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setDate(currentDate.getDate() - 1);
    if (selectedDate < currentDate) {
      return { futureDate: true };
    }
    return null;
  }


  //fecha de restructuracion un año mayor a la fecha de revisión
  releaseDateSelect(dato: any) {
    const release = new Date(dato.target.value);
    release.setFullYear(release.getFullYear() + 1);
    this.registroForm.patchValue({
      date_revision: release,
    });
  }


  //Promesa para la consulta del producto a editar
  getProduct = (id: string): Promise<bankProduct> => {
    return new Promise((resolve, reject) => {
      // Operación asíncrona
      this.bankProductService.getBankProduct(id).subscribe((data) => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  };

  updateProduct(product: bankProduct) {
    this.bankProductService.updateBankProduct(product.id,product).subscribe((data) => {
      this.alertaService.success("Producto actualizado correctamente", "");
      this.router.navigate([""]);
    }, error => {
      this.alertaService.error(error.message, "");
    });
  }

}
