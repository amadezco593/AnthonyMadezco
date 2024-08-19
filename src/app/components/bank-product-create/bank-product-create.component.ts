import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bankProduct } from 'src/app/interfaces/bankProduct';
import { AlertService } from 'src/app/service/alertas/alert.service';
import { BankProductService } from 'src/app/service/bank-product.service';

@Component({
  selector: 'app-bank-product-create',
  templateUrl: './bank-product-create.component.html',
  styleUrls: ['./bank-product-create.component.css']
})
export class BankProductCreateComponent {
  registroForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private bankProductService: BankProductService,
    private router: Router,
    private alertaService: AlertService) {
    
    

  }

  ngOnInit(): void { 
    //Inicializamos el formulario con las validaciones requeridas y detalladas en la prueba
    this.registroForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9!@#\\$%\\^&*\\)\\(+=._-]{3,10}$')]], // Solo números
      name: ['', [Validators.required,Validators.pattern('^.{5,100}$')]],
      description: ['', [Validators.required,Validators.pattern('^.{10,200}$')]],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required, this.validDateRelease]],
      date_revision: [{ value: '', disabled: true }, Validators.required]  // Campo deshabilitado
    });
  }



  // Método para enviar el formulario
  onSubmit(): void {
    //Verificar si el formulario se lleno correctamente
    if (this.registroForm.valid) {
      //Cuando se cumplen todas las validaciones se verifica si el id del producto no esta repetido
      this.bankProductService.verificationProduct(this.registroForm.get('id')?.value).subscribe((data) => {
        if (!data) {
          let producto: bankProduct = {
            id: this.registroForm.get('id')?.value,
            name: this.registroForm.get('name')?.value,
            description: this.registroForm.get('description')?.value,
            logo: this.registroForm.get('logo')?.value,
            date_release: this.registroForm.get('date_release')?.value,
            date_revision: this.registroForm.get('date_revision')?.value
          };
          this.createProduct(producto);
        } else {
          this.alertaService.warning("Ya existe un producto con ese ID", "");
        }
      }, error => {
        this.alertaService.error("Error en la verificación de producto", "");
      });
    } else {
      this.alertaService.warning("Formulario no cumple las validaciones respectivas", "");
    }
  }

  // Método para resetear el formulario
  onReset(): void {
    this.registroForm.reset();
  }

  // Métodos de conveniencia para obtener controles
  get id() { return this.registroForm.get('id'); }
  get name() { return this.registroForm.get('name'); }
  get description() { return this.registroForm.get('description'); }
  get logo() { return this.registroForm.get('logo'); }
  get date_release() { return this.registroForm.get('date_release'); }

  //Creamos un método de validación para la fecha de revisión. Esta no puede ser menor a la fecha actual
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

  //Este método nos proporciona un valor de fecha de restructuración, la cual debe ser exactamente un año después de la fecha de revisión
  releaseDateSelect(dato: any) {
    const release = new Date(dato.target.value);
    release.setFullYear(release.getFullYear() + 1);
    this.registroForm.patchValue({
      date_revision: release.toISOString().split('T')[0],
    });
  }

  //Método utilizado para la creación de producto
  createProduct(product: bankProduct) {
    console.log(JSON.stringify(product));
    this.bankProductService.createBankProduct(product).subscribe((data) => {
      this.alertaService.success("Producto creado correctamente", "");
      this.router.navigate([""]);
    }, error => {
      this.alertaService.error(error.message, "");
    });
  }

 
}
