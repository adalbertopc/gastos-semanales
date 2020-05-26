const presupuestoUsuario = prompt('Cual es el presupuesto semanal');
const formulario = document.querySelector('#agregar-gasto');

//aqui se instancia la clase presupuesto
let cantidadPresupuesto;

class Presupuesto {
	constructor(presupuesto) {
		// Se convierten a Number de una vez
		this.presupuesto = Number(presupuesto);
		this.restante = Number(presupuesto);
	}

	presupuestoRestante(cantidad = 0) {
		return (this.restante -= Number(cantidad));
	}
}

//Esta clase maneja todo el HTML
class Interfaz {
	insertarPresupuesto(cantidad) {
		const presupuestoSpan = document.querySelector('span#total');
		const restanteSpan = document.querySelector('span#restante');

		presupuestoSpan.innerHTML = `${cantidad}`;
		restanteSpan.innerHTML = `${cantidad}`;
	}

	imprimirMensaje(mensaje, tipo) {
		const divMensaje = document.createElement('div');
		divMensaje.classList.add('text-center', 'alert');

		//le añade colores al div
		if (tipo === 'error') {
			//rojo
			divMensaje.classList.add('alert-danger');
		} else {
			//verde
			divMensaje.classList.add('alert-success');
		}

		divMensaje.appendChild(document.createTextNode(mensaje));

		// ------REPASAR ESTO --------
		document.querySelector('.primario').insertBefore(divMensaje, formulario);

		//quitar la alerta depsues de tres segundos
		setTimeout(() => {
			document.querySelector('.primario .alert').remove();
			formulario.reset();
		}, 3000);
	}

	agregarListado(nombre, cantidad) {
		const gastosListado = document.querySelector('#gastos ul');
		const li = document.createElement('li');

		//darle estilos al li con bootstrap
		li.className = 'list-group-item d-flex justify-content-between align-items-center';
		//esto llevara dentro el li
		li.innerHTML = `
            ${nombre}
            <span class = "badge badge-primary badge-pill">$ ${cantidad} </span>
        `;

		gastosListado.appendChild(li);
	}

	presupuestoRestante(cantidad) {
		const restante = document.querySelector('span#restante');
		const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);

		restante.innerHTML = `${presupuestoRestanteUsuario}`;
		this.comprobarPresupuesto();
	}

	comprobarPresupuesto() {
		const presupuestoTotal = cantidadPresupuesto.presupuesto;
		const presupuestoRestante = cantidadPresupuesto.restante;
		const restante = document.querySelector('.restante');

		if (presupuestoTotal / 4 > presupuestoRestante) {
			restante.classList.remove('alert-success', 'alert-warning');
			restante.classList.add('alert-danger');
		} else if (presupuestoTotal / 2 > presupuestoRestante) {
			restante.classList.remove('alert-success');
			restante.classList.add('alert-warning');
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	if (presupuestoUsuario === null || presupuestoUsuario === '') {
		//este metodo sirve pa recargar la pagina
		window.location.reload();
	} else {
		cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
		const ui = new Interfaz();
		ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
	}
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();
	const nombreGasto = document.querySelector('#gasto').value;
	const cantidadGasto = document.querySelector('#cantidad').value;

	const ui = new Interfaz();

	if (nombreGasto === '' || cantidadGasto === '') {
		ui.imprimirMensaje('Hubo un error', 'error');
	} else {
		ui.imprimirMensaje('Agregado', 'correcto');
		ui.agregarListado(nombreGasto, cantidadGasto);
		ui.presupuestoRestante(cantidadGasto);
	}
});
