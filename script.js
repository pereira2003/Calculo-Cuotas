const form = document.getElementById('cuotaForm');
const mensaje = document.getElementById('mensaje');
const totalPrimaElement = document.getElementById('totalPrima');
const cuotaElement = document.getElementById('cuota');

function calcularTotal(cantidad, precio) {
  return cantidad * precio;
}

function nombreFrecuencia(valor) {
  switch (valor) {
    case 'mensual':
      return 'mensual';
    case 'quincenal':
      return 'quincenal';
    case 'semanal':
      return 'semanal';
    default:
      return '';
  }
}

function pagosPorFrecuencia(meses, frecuencia) {
  switch (frecuencia) {
    case 'mensual':
      return meses;
    case 'quincenal':
      return meses * 2;
    case 'semanal':
      return meses * 4;
    default:
      return meses;
  }
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const cantidad = Number(document.getElementById('cantidad').value);
  const precio = Number(document.getElementById('precio').value);
  const meses = Number(document.getElementById('meses').value);
  const frecuencia = document.getElementById('frecuencia').value || 'mensual';

  if (!cantidad || cantidad < 1) {
    mensaje.textContent = 'Ingrese una cantidad válida mayor o igual a 1.';
    totalPrimaElement.textContent = '$0.00';
    cuotaElement.textContent = '';
    return;
  }

  if (!precio || precio <= 0) {
    mensaje.textContent = 'Ingrese un precio válido mayor a 0.';
    totalPrimaElement.textContent = '$0.00';
    cuotaElement.textContent = '';
    return;
  }

  if (!meses || meses < 1) {
    mensaje.textContent = 'Seleccione un periodo de meses válido.';
    totalPrimaElement.textContent = '$0.00';
    cuotaElement.textContent = '';
    return;
  }

  const total = calcularTotal(cantidad, precio);
  const prima = total * 0.10;
  const totalAntesDescuento = total - prima;
  const descuento = meses === 2 || meses === 6 ? 0.15 : 0;
  const totalCancelar = totalAntesDescuento * (1 - descuento);
  const pagos = pagosPorFrecuencia(meses, frecuencia);
  const cuota = totalCancelar / pagos;
  const frecuenciaTexto = nombreFrecuencia(frecuencia);
  const tipoPago = frecuencia === 'mensual' ? 'meses' : frecuencia === 'quincenal' ? 'quincenas' : 'semanas';

  mensaje.textContent = descuento
    ? `Se aplicó un 15% de descuento. Prima: $${prima.toFixed(2)}`
    : `Prima: $${prima.toFixed(2)}`;
  totalPrimaElement.textContent = `$${totalCancelar.toFixed(2)}`;
  cuotaElement.textContent = `Cuota ${frecuenciaTexto}: $${cuota.toFixed(2)} cada ${tipoPago} (${pagos} pagos totales)` + (descuento ? ` - 15% de descuento aplicado.` : '.');
});
