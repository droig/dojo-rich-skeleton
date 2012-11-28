// Ejecutar el siguiente codigo cuando se cargue el contenido en Dialog
require(["dojo/on"], function(on){
	on(jugadorDialog, "load", function(e){
		
		
		/*
		 * funcion para guardar el jugador
		 */
		nuevoJugador = function () {
			if (jugadorDialog.isValid()) {
				grid.store.newItem( jugadorDialog.get('value') );
				jugadorDialog.hide();
			}
		}
	});
});