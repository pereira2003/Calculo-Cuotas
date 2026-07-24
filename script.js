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

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const cantidad = Number(document.getElementById('cantidad').value);
  const precio = Number(document.getElementById('precio').value);
  const meses = Number(document.getElementById('meses').value);
  const frecuencia = document.getElementById('frecuencia').value;

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

  if (!frecuencia) {
    mensaje.textContent = 'Seleccione la frecuencia de pago.';
    totalPrimaElement.textContent = '$0.00';
    cuotaElement.textContent = '';
    return;
  }

  const total = calcularTotal(cantidad, precio);
  const prima = total * 0.10;
  const totalCancelar = total - prima;
  const cuota = totalCancelar / meses;
  const frecuenciaTexto = nombreFrecuencia(frecuencia);

  mensaje.textContent = `$${prima.toFixed(2)}`;
  totalPrimaElement.textContent = `$${totalCancelar.toFixed(2)}`;
  cuotaElement.textContent = `Cuota ${frecuenciaTexto}: $${cuota.toFixed(2)} por ${meses} meses.`;
});
