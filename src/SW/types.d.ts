interface authenticateResponse {
  data: {
    token: string,
    expires_in: number
  }
}

// ****************  Invoice 
export interface Emisor {
  Rfc: string
  Nombre: string
  RegimenFiscal: string
}

export interface Receptor {
  Rfc: string
  Nombre: string
  DomicilioFiscalReceptor: string
  RegimenFiscalReceptor: string
  UsoCFDI: string
}

export interface Invoice {
  Version: string
  FormaPago: string
  Serie: string
  Folio: string
  Fecha: string
  MetodoPago: string
  Sello: string
  NoCertificado: string
  Certificado: string
  CondicionesDePago: string
  SubTotal: string
  Descuento: string
  Moneda: string
  Total: string
  TipoDeComprobante: string
  Exportacion: string
  LugarExpedicion: string
  Emisor: Emisor
  Receptor: Receptor
  Conceptos: Concepto[]
}

export interface Concepto {
  ClaveProdServ: string
  NoIdentificacion: string
  Cantidad: string
  ClaveUnidad: string
  Unidad: string
  Descripcion: string
  ValorUnitario: string
  Importe: string
  Descuento: string
  ObjetoImp: string
}
// **************** END Invoice