// import { PositiveNumber } from "../../Shared/valueObjects/primitives";
// import Contract from "./valueObjects/Contract";
// import Person from "./valueObjects/Person";

// class Renta {
//   private monthPrice: PositiveNumber;
//   private tenant: Person | null;
//   private contract: Contract | null;

//   private _deposito: number;

//   // constructor(precioMensual: number, deposito: number) {
//   //   if (precioMensual <= 0) {
//   //     throw new Error("El precio de renta debe ser mayor que cero.");
//   //   }

//   //   if (deposito < 0) {
//   //     throw new Error("El depósito no puede ser negativo.");
//   //   }

//   //   this._precioMensual = precioMensual;
//   //   this._deposito = deposito;
//   //   this._inquilino = null;
//   //   this._fechaInicio = null;
//   //   this._fechaFin = null;
//   // }

//   // public alquilarCasa(inquilino: string, fechaInicio: Date, fechaFin: Date): void {
//   //   if (this._inquilino !== null) {
//   //     throw new Error("La casa ya está alquilada.");
//   //   }

//   //   if (!inquilino || fechaInicio >= fechaFin) {
//   //     throw new Error("Datos de alquiler inválidos.");
//   //   }

//   //   this._inquilino = inquilino;
//   //   this._fechaInicio = fechaInicio;
//   //   this._fechaFin = fechaFin;
//   // }

//   // public liberarCasa(): void {
//   //   this._inquilino = null;
//   //   this._fechaInicio = null;
//   //   this._fechaFin = null;
//   // }

//   // public get precioMensual(): number {
//   //   return this._precioMensual;
//   // }

//   // public get inquilino(): string | null {
//   //   return this._inquilino;
//   // }

//   // public get fechaInicio(): Date | null {
//   //   return this._fechaInicio;
//   // }

//   // public get fechaFin(): Date | null {
//   //   return this._fechaFin;
//   // }

//   // public get deposito(): number {
//   //   return this._deposito;
//   // }
// }
