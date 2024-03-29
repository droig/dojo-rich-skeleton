require([
	'gridx/Grid',
	'gridx/core/model/cache/Async',
	'gridx/modules/ColumnResizer',
	'gridx/modules/VirtualVScroller',
	'gridx/modules/select/Row',
	'gridx/tests/support/XQueryReadStore',	
	'dojo/domReady!'
], function(Grid, Cache, ColumnResizer, VirtualVScroller, selectRow, XStore){
	var layout = [
		{id: 'id', field: 'id', name: 'Identity'},
		{id: 'Year', field: 'Year', name: 'Year'},
		{id: 'Length', field: 'Length', name: 'Length'},
		{id: 'Track', field: 'Track', name: 'Track'},
		{id: 'Download Date', field: 'Download Date', name: 'Download Date'},
		{id: 'Last Played', field: 'Last Played', name: 'Last Played'},
		{id: 'Heard', field: 'Heard', name: 'Heard'}
	];
	var grid = new Grid({
		id: 'grid',
		cacheClass: Cache,
		cacheSize: 1000,
		pageSize: 200,
		vScrollerLazy: true,
		vScrollerBuffSize: 60,
		store: new XStore({
			idAttribute: 'id',
			url: 'http://dojotoolkit.cn/data/?totalSize=1000000'
		}),		
		structure: layout,
		modules: [
		    selectRow,
		    ColumnResizer,
			VirtualVScroller
		]
	});
	var b = grid.body;
	b.connect(b, 'renderRows', function(start, count){
		if(count <= 0){
			grid.emptyNode.innerHTML = '<b>Failed to load data from data service, please try it later.</b>';		
		}
	});
	grid.placeAt('gridContainer');
	grid.startup();
});
