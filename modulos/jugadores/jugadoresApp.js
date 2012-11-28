// Ejecutar el siguiente codigo cuando se cargue el contenido en Dialog
require(["dojo/on"], function(on){
	on(mainPanel, "load", function(e){
		
		if (dojo.query("#toolbar").length == 0)  return ;
		
		/**
		 * cacheStore ()
		 * 
		 */
		require([
		    "dojo/store/JsonRest", 
		    "dojo/store/Memory",
		    "dojo/store/Cache",
		    "dojo/data/ObjectStore" 
		], function(JsonRest, Memory, Cache){ 
		    var cacheStore = Cache( 
		        JsonRest({target:"servicios/jugadores/", idProperty: "rut_jugador"}),  
		        Memory({idProperty: "rut_jugador"}) 
		    );
		    jugadoresDS = dojo.data.ObjectStore({objectStore: cacheStore})
		});


		function getItemByProp(gridRef, prop, value) {
			var count = gridRef._getRowCountAttr();
			var i;
			for ( i=0 ; i < count ;  i++) {
				if ( gridRef.getItem(i)[prop] == value ) {
					return grid.getItem(i);
				}
			}
			return null;
		}


		require(["dijit/form/Button"], function() {
			
			jugadorAction = function(rut) {
				return new dijit.form.Button({
						label:"Borrar", 
						onClick: function() { 
							
							var item = getItemByProp(grid, "rut_jugador", rut);
							grid.store.deleteItem(item);
							
						}
				});
			}
		});


		require([ 
		    "dojox/grid/EnhancedGrid",
		    "dojo/domReady!" 
		], function(EnhancedGrid){
			
			grid = new dojox.grid.EnhancedGrid({
				height: '300px',
				autoHeight: true,
				autoWidth: true,
				store:  jugadoresDS,
				structure: [
		            {name: "Rut", field:"rut_jugador", width: "150px", editable: true}, 
		            {name: "Nombre", field:"nombre", editable: true},
		            {name: "Apellido", field:"apellido", editable: true},
		            {name: "e-mail", field:"email", width: "200px", editable: true},
		            {name: "Teléfono", field:"telefono", editable: true},
		            {name: "Edad", field:"edad", editable: true},
		            {name: "Accion", field: "rut_jugador", formatter: jugadorAction, width: "55px"}
				], 
			rowSelector: '14px'}, 
			document.createElement('div'));
			dojo.byId("gridCont").appendChild(grid.domNode); 
			grid.startup(); 
		});



		require(["dojo/ready", "dijit/Toolbar", "dijit/form/Button"], function(ready, Toolbar, Button){
		    ready(function(){
		    	
		        var toolbar = new Toolbar({}, "toolbar");
		        
		        var button = new Button({
		            label: "Nuevo",
		            showLabel: true,
		            onClick: function() { jugadorDialog.show(); },
		            iconClass: "dijitIconNewTask"
		        });
		        toolbar.addChild(button);
		        
		        
		        toolbar.addChild( new Button({
		            label: "Guardar",
		            showLabel: true,
		            onClick: function() { guardar(grid) },
		            iconClass: "dijitIconSave"
		        }));
		        
		        toolbar.addChild( new Button({
		            label: "Editar",
		            showLabel: true,
		            iconClass: "dijitIconEdit"
		        }));
		        
		        toolbar.addChild( new Button({
		            label: "Recargar",
		            showLabel: true,
		            iconClass: "dijitIconUndo",
		            onClick: function() { 
		            	grid.store._dirtyObjects = [];
		            	grid.store.revert()
		            }
		        }));
		        
		    });
		});



		require(["dijit/Dialog","dojo/domReady!"], function(Dialog) {
	        
	        jugadorDialog = new Dialog({
	        	
	            title: "Nuevo Jugador",
	            style: { width: '362px', height: '284px', background: '#fff' },
	            preventCache: true,
	            refreshOnShow:true,
	            loaded: false,
	            preload: false,
	            content: '<span class="dijitContentPaneLoading">' +
	        			 '<span class="dijitInline dijitIconLoading"></span>' +
	        			 'Cargando modulos...</span>',
	        	onShow: function() {
	        		
	        		if (!jugadorDialog.loaded) {
		        		var req  = require([
		        		         "dijit/dijit", 
		        		         "dojo/parser", 
		        		         "dijit/form/SimpleTextarea", 
		        		         "dijit/form/Select", 
		        		         "dijit/form/Button", 
		        		         "modulos/nuevo_jugador.js"],
		        			function() {
		        				jugadorDialog.href = "modulos/nuevo_usuario.html";
		        				jugadorDialog.refresh();
		        		});
	        		}
	        		jugadorDialog.loaded = true;
	        	},
	        });
		});
	});
});
