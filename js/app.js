
/**
 * 
 * Handler de evento "click" en menu izquierdo (Tree) 
 * "b" es la referencia al widget del panel
 */
function panelChange(a,b,c) {
	
	
	// destruyo todo los widgets renderizados para no tener problemas
	// de duplicación de IDs de widgets existentes
	var childs = mainPanel.getChildren();
	for (i=0 ; i<childs.length ; i++) {
		childs[i].destroy();
	}
	// limpio el contenedor
	mainPanel.setContent("");

	if (b.label == "Jugadores") {
		
		var modulos = [
			"dijit/dijit", 
			"dojo/parser", 
			"dijit/form/SimpleTextarea", 
			"dijit/form/TextBox", 
			"dijit/form/ComboBox", 
			"dijit/Dialog",
			"dojo/ready", "dijit/Toolbar",
			"dojox/grid/EnhancedGrid", 
			"dojo/data/ObjectStore", 
			"dojo/store/JsonRest", 
			"dojo/store/Memory", 
			"dojo/store/Cache",
			"dijit/form/Button", 
			"modulos/jugadores/jugadoresApp.js"
		];
		
		loadModule(modulos, "modulos/jugadores/view.html");
	}
	
	
	if (b.label == "Test") {
		
		loadModule([], "servicios/test");
	}
}


/**
 * Carga los modulos recibiendo como parámetros los requerimientos
 * de Scripts y el HTML a cargar en el contenedor principal
 * @param reqs
 * @param view
 */
function loadModule(reqs, view) {
	
	dojo.query("#mainPanel")[0].innerHTML = '<div class="_pad8"><span class="dijitContentPaneLoading">' +
	'<span class="dijitInline dijitIconLoading"></span>Cargando Modulos...</span><div>';
	
	require(reqs, 
	function(on){
		
		mainPanel.href = view;
		mainPanel.refresh();
	});
}


/**
 * Funcion para guardar en una grilla.
 * Recibe la referencia a la grilla (Enhancedgrid)
 * @param _grilla
 */
function guardar(_grilla) {
	if (_grilla.store.isDirty()) {
		if (confirm("Desea guardar los cambios?")) {
			_grilla.store.save();
		}
	} else {
		alert("No hay cambios.");
	}
}







/*
 * Contenido del arbol menú
 */
var treeData = {
   "identifier":"id",
   "label":"label",
   "items":[
      {
         "id":139341367176,
         "label":"Sistema",
         "children":[
            {
               "id":637364692288,
               "label":"Jugadores"
            },
            {
               "id":941479388857,
               "label":"Torneos"
            }
         ]
      }, 
      {
    	  "id":1234,
          "label":"Test",
      }
   ]
};


require(["dojo/data/ItemFileReadStore",
         "dijit/Tree"], 
function(ForestStoreModel,ItemFileReadStore){
	
	var menuStore = new dojo.data.ItemFileReadStore( { data: treeData } );

	menuModel = new dijit.tree.ForestStoreModel({
	    store: menuStore,
	    rootLabel: "Root"
	});
	
});
