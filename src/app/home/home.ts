import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { required } from '@angular/forms/signals';

function validacaoArray(control: AbstractControl): ValidationErrors | null {
  const array = control as FormArray;
  return array.length > 0 ? null : { validacaoTamanhoArray: true };
}

function senhaIgual(control: AbstractControl): ValidationErrors | null {
  const form = control.parent;
  if (form) {
    const senha = form.get('senha');
    if (senha && control.value !== senha.value) {
      return { senhaIgual: true };
    }
  }
  return null;
}

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private fb = inject(FormBuilder);
  mensagemSucesso: boolean = false;
  mostrarModalEnvio: boolean = false;

  formulario = this.fb.group({
    nome: ['',[Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/\.com$/)]],
    novoTelefone: [''],
    telefones: this.fb.array([], validacaoArray),
    idade: [null, [Validators.required, Validators.min(18)]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    confirmaSenha: ['', [Validators.required, senhaIgual]],
    genero: ['', Validators.required],
    cidade: ['', Validators.required],
    termos: [false, Validators.required], 
  }, { });

  
  get nome(): FormControl {
    return this.formulario.controls['nome'] as FormControl;
  }

  get email(): FormControl {
    return this.formulario.controls['email'] as FormControl;
  }

  get novoTelefone(): FormControl {
    return this.formulario.controls['novoTelefone'] as FormControl;
  }

  get telefones(): FormArray {
    return this.formulario.controls['telefones'] as FormArray;
  }

  get idade(): FormControl {
    return this.formulario.controls['idade'] as FormControl;
  }

  get senha(): FormControl {
    return this.formulario.controls['senha'] as FormControl;
  }

  get confirmaSenha(): FormControl {
    return this.formulario.controls['confirmaSenha'] as FormControl;
  }

  get genero(): FormControl {
    return this.formulario.controls['genero'] as FormControl;
  }

  get cidade(): FormControl {
    return this.formulario.controls['cidade'] as FormControl;
  }

  get termos(): FormControl {
    return this.formulario.controls['termos'] as FormControl;
  }

  adicionarNoArray(): void {
    if(this.novoTelefone.value) {
      const valor = this.formulario.controls.novoTelefone.value;
      this.telefones.push(this.fb.control(valor));
      this.formulario.controls.novoTelefone.reset();
      
      // Exibir mensagem de sucesso
      this.mensagemSucesso = true;
      setTimeout(() => {
        this.mensagemSucesso = false;
      }, 2000);
    }
  }

  removerTelefone(indice: number): void {
    this.telefones.removeAt(indice);
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      this.mostrarModalEnvio = true;
    }
  }

  fecharModalEnvio(): void {
    this.mostrarModalEnvio = false;
    this.formulario.reset();
  }
}