require([
	'gridx/Grid',
	'gridx/core/model/cache/Async',
	'gridx/tests/support/data/MusicData',
	'gridx/tests/support/stores/ItemFileWriteStore',
	'gridx/tests/support/TestPane',
	'gridx/modules/Focus',
	'gridx/modules/VirtualVScroller',
	'gridx/modules/Dod',
	
	'dojox/charting/themes/Julie',
	'dojox/charting/Chart',
    'dojox/charting/axis2d/Default',
    'dojox/charting/plot2d/ClusteredBars',
    'dojox/charting/plot2d/ClusteredColumns',
    'dojox/charting/plot2d/Default',
    'dojox/charting/plot2d/StackedAreas',
    'dojox/charting/plot2d/Bubble',
    'dojox/charting/plot2d/Candlesticks',
    'dojox/charting/plot2d/OHLC',
    'dojox/charting/plot2d/Pie',
	'dojo/domReady!'
], function(Grid, Cache, dataSource, storeFactory, TestPane, focus, VirtualVScroller, Dod, JulieTheme){
	function random(start, end){
		//include start but not end. e.g. 1-10, 1 is possible but not 10.
		return Math.floor(Math.random()*(end-start)) + start;
	}
	function getDummyText(count, end){
		var arr = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede sit amet augue. In turpis. Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Nullam sagittis. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Ut varius tincidunt libero. Phasellus dolor. Maecenas vestibulum mollis diam. Pellentesque ut neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In ac felis quis tortor malesuada pretium. Pellentesque auctor neque nec urna. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Aenean viverra rhoncus pede. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut non enim eleifend felis pretium feugiat. Vivamus quis mi. Phasellus a est. Phasellus magna. In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felis in nunc fringilla tristique. Morbi mattis ullamcorper velit. Phasellus gravida semper nisi. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed hendrerit. Morbi ac felis. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Donec interdum, metus et hendrerit aliquet, dolor diam sagittis ligula, eget egestas libero turpis vel mi. Nunc nulla. Fusce risus nisl, viverra et, tempor et, pretium in, sapien. Donec venenatis vulputate lorem. Morbi nec metus. Phasellus blandit leo ut odio. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. In auctor lobortis lacus. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Vestibulum ullamcorper mauris at ligula. Fusce fermentum. Nullam cursus lacinia erat. Praesent blandit laoreet nibh. Fusce convallis metus id felis luctus adipiscing. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Quisque id mi. Ut tincidunt tincidunt erat. Etiam feugiat lorem non metus. Vestibulum dapibus nunc ac augue. Curabitur vestibulum aliquam leo. Praesent egestas neque eu enim. In hac habitasse platea dictumst. Fusce a quam. Etiam ut purus mattis mauris sodales aliquam. Curabitur nisi. Quisque malesuada placerat nisl. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Mauris sollicitudin fermentum libero. Praesent nonummy mi in odio. Nunc interdum lacus sit amet orci. Vestibulum rutrum, mi nec elementum vehicula, eros quam gravida nisl, id fringilla neque ante vel mi. Morbi mollis tellus ac sapien. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Fusce vel dui. Sed in libero ut nibh placerat accumsan. Proin faucibus arcu quis ante. In consectetuer turpis ut velit. Nulla sit amet est. Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus. Cras risus ipsum, faucibus ut, ullamcorper id, varius ac, leo. Suspendisse feugiat. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. Praesent nec nisl a purus blandit viverra. Praesent ac massa at ligula laoreet iaculis. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Mauris turpis nunc, blandit et, volutpat molestie, porta ut, ligula. Fusce pharetra convallis urna. Quisque ut nisi. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Suspendisse non nisl sit amet velit hendrerit rutrum. Ut leo. Ut a nisl id ante tempus hendrerit. Proin pretium, leo ac pellentesque mollis, felis nunc ultrices eros, sed gravida augue augue mollis justo. Suspendisse eu ligula. Nulla facilisi. Donec id justo. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. Curabitur suscipit suscipit tellus. Praesent vestibulum dapibus nibh. Etiam iaculis nunc ac metus. Ut id nisl quis enim dignissim sagittis. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros. Proin magna. Duis vel nibh at velit scelerisque suscipit. Curabitur turpis. Vestibulum suscipit nulla quis orci. Fusce ac felis sit amet ligula pharetra condimentum. Maecenas egestas arcu quis ligula mattis placerat. Duis lobortis massa imperdiet quam. Suspendisse potenti. Pellentesque commodo eros a enim. Vestibulum turpis sem, aliquet eget, lobortis pellentesque, rutrum eu, nisl. Sed libero. Aliquam erat volutpat. Etiam vitae tortor. Morbi vestibulum volutpat enim. Aliquam eu nunc. Nunc sed turpis. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Nulla porta dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Pellentesque dapibus hendrerit tortor. Praesent egestas tristique nibh. Sed a libero. Cras varius. Donec vitae orci sed dolor rutrum auctor. Fusce egestas elit eget lorem. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Nam at tortor in tellus interdum sagittis. Aliquam lobortis. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Curabitur blandit mollis lacus. Nam adipiscing. Vestibulum eu odio. Vivamus laoreet. Nullam tincidunt adipiscing enim. Phasellus tempus. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Fusce neque. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Vivamus aliquet elit ac nisl. Fusce fermentum odio nec arcu. Vivamus euismod mauris. In ut quam vitae odio lacinia tincidunt. Praesent ut ligula non mi varius sagittis. Cras sagittis. Praesent ac sem eget est egestas volutpat. Vivamus consectetuer hendrerit lacus. Cras non dolor. Vivamus in erat ut urna cursus vestibulum. Fusce commodo aliquam arcu. Nam commodo suscipit quam. Quisque id odio. Praesent venenatis metus at tortor pulvinar varius. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede sit amet augue. In turpis. Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Nullam sagittis. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Ut varius tincidunt libero. Phasellus dolor. Maecenas vestibulum mollis diam. Pellentesque ut neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In ac felis quis tortor malesuada pretium. Pellentesque auctor neque nec urna. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Aenean viverra rhoncus pede. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut non enim eleifend felis pretium feugiat. Vivamus quis mi. Phasellus a est. Phasellus magna. In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felis in nunc fringilla tristique. Morbi mattis ullamcorper velit. Phasellus gravida semper nisi. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed hendrerit. Morbi ac felis. '.split(' ');
		var result = [];
		if (end) {
			count = Math.round(Math.random()*(end-count) + count);
		}
		while(--count >= 0){
			var i = random(0,arr.length);
			result.push(arr[i]);
		}
		return result.join(' ');
	}
	window.defaultShow = true;
	window.showExpando = true;
	window.contentType = 'chart';
	window.detailProvider = window.asyncDetailProvider = function(grid, rowId, detailNode, renderred){
		setContent(detailNode);
		window.setTimeout(function(){
			renderred.callback();
		}, 2000);
		return renderred;
	}
	window.syncDetailProvider = function(grid, rowId, detailNode, renderred){
		setContent(detailNode);
		renderred.callback();
		return renderred;
	}
	function setContent(node){
		switch(contentType){
			case 'text':
				setTextContent(node);
				break;
			case 'form':
				setFormContent(node);
				break;
			case 'chart':
				setChartContent(node);
				break;
			default:
				alert('error: unkonw content type: ' + contentType);
				break;
		}
	}
	
	function setTextContent(node){
		node.innerHTML = '<div style="color: #777; padding:5px">' 
			+ getDummyText(20,140) + '</div>';
	}
	function setFormContent(node){
		node.innerHTML = ['<div style="margin: 10px; background:white;padding: 10px;"><table style="width:400px">',
				'<tr>',
				'	<td><label for="name">Name:</label></td>',
				'	<td><input data-dojo-type="dijit.form.ValidationTextBox"',
				'		data-dojo-props=\'required:true, name:"name" \'/></td>',
				'</tr>',
				'<tr id="newRow" style="display: none;">',
				'	<td><label for="lastName">Last Name:</label></td>',
				'	<td><input /></td>',
				'</tr>',
				'<tr>',
				'	<td><label for="birth">Birthdate (before 2006-12-31):</label><br><br><br><br></td>',
				'	<td><div><input data-dojo-type="dijit.form.DateTextBox" data-dojo-props=\'value:"2000-01-01",',
				'		required:true, name:"birth", constraints:{min:"1900-01-01", max:"2006-12-31"} \'/> <br>',
				'	</div></td>',
				'</tr>',
				'<tr>',
				'	<td><label for="notes">Notes (optional)</label></td>',
				'	<td><input data-dojo-type="dijit.form.TextBox"',
				'		data-dojo-props=\'name:"notes" \'/></td>',
				'</tr>',
				'<tr id="newRow2" style="display: none;">',
				'	<td><label for="color">Favorite Color</label></td>',
				'	<td><select id="color">',
				'		<option value="red">Red</option>',
				'		<option value="yellow">Yellow</option>',
				'		<option value="blue">Blue</option>',
				'	</select></td>',
				'</tr>',
			'</table></div>'].join('');
		dojo.parser.parse(node);
	}
	function setChartContent(node){
		var container = dojo.create('div', {}, node, 'last'), div = dojo.create('div', {}, container, 'last');
		container.style.margin = '10px';
		container.style.backgroundColor = 'white';
		var chart = new dojox.charting.Chart(div).
			addAxis("x", {fixLower: "major", fixUpper: "major"}).
			addAxis("y", {vertical: true, fixLower: "major", fixUpper: "major", min: 0}).
			addPlot("default", {type: "StackedAreas", tension: "X"}).
			addSeries("Series A", [-2, 1.1, 1.2, 1.3, 1.4, 1.5, -1.6]).
			addSeries("Series B", [1, 1.6, 1.3, 1.4, 1.1, 1.5, 1.1]).
			addSeries("Series C", [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6]).
			setTheme(JulieTheme).render()
			;
	}
	window.createGrid = function(){
		if(window.grid){window.grid.destroy();}
		grid = new Grid({
			id: 'grid',
			cacheClass: Cache,
			store: storeFactory({
				dataSource: dataSource, 
				size: 100
			}),
			modules: [
				VirtualVScroller,
				{
					moduleClass: Dod,
					defaultShow: defaultShow,
					showExpando: showExpando,
					detailProvider: detailProvider
				}
			],
			structure: dataSource.layouts[1]
		});
		grid.placeAt('gridContainer');
		grid.startup();
		
		window.dod = grid.dod;
	}
	
	createGrid();
	
	
	var tp = new TestPane({});
	tp.placeAt('ctrlPane');
	
	

	window.showRow1Detail = function(){
		dod.show(grid.row('1'));
	}
	window.hideRow1Detail = function(){
		dod.hide(grid.row('1'));
	}
	window.toggleRow2Detail = function(){
		dod.toggle(grid.row('2'));
	}
	window.isRow3DetailShown = function(){
		alert(dod.isShown(grid.row('1')));
	}
	
	window.showRow1DetailOnRow = function(){
		grid.row('1').showDetail();
	}
	window.hideRow1DetailOnRow = function(){
		grid.row('1').hideDetail();
	}
	window.toggleRow2DetailOnRow = function(){
		grid.row('2').toggleDetail();
	}
	window.isRow3DetailShownOnRow = function(){
		alert(grid.row('1').isDetailShown());
	}
	
	tp.addTestSet('DoD types', [
 		'<label><input type="checkbox" checked onchange="defaultShow=this.checked"/> defaultShow</label><br/>',
 		'<label><input type="checkbox" checked onchange="showExpando = this.checked"/> showExpando</label><br/>',
 		'<label>Content type: <select onchange="contentType=this.value"><option value="text">text</option><option value="form">form</option><option value="chart" selected>chart</option></select></label><br/>',
 		'<select onchange="detailProvider=window[this.value]"><option value="syncDetailProvider">sync detailProvider</option>' 
 			+ '<option value="asyncDetailProvider" selected>async detailProvider</option></select><br/>',
 		'<div data-dojo-type="dijit.form.Button" data-dojo-props="onClick: createGrid">Re Create Grid</div>'
 	].join(''));

	tp.addTestSet('Dod APIs', [
		'<div data-dojo-type="dijit.form.Button" data-dojo-props="onClick:' 
			+ 'showRow1Detail">dod.show(grid.row(\'1\')</div><br/>',
		'<div data-dojo-type="dijit.form.Button" data-dojo-props="onClick:'
			+ 'hideRow1Detail">dod.hide(grid.row(\'1\')</div><br/>',
		'<div data-dojo-type="dijit.form.Button" data-dojo-props="onClick:'
			+ 'toggleRow2Detail">dod.toggle(grid.row(\'2\')</div><br/>',
		'<div data-dojo-type="dijit.form.Button" data-dojo-props="onClick:'
			+ 'isRow3DetailShown">dod.isShown(grid.row(\'1\')</div><br/>'
	].join(''));
	
	tp.addTestSet('Row Extended APIs', [
		'<div data-dojo-type="dijit.form.Button" data-dojo-props="onClick:' 
			+ 'showRow1DetailOnRow">grid.row(\'1\').showDetail()</div><br/>',
		'<div data-dojo-type="dijit.form.Button" data-dojo-props="onClick:'
			+ 'hideRow1DetailOnRow">grid.row(\'1\').hideDetail()</div><br/>',
		'<div data-dojo-type="dijit.form.Button" data-dojo-props="onClick:'
			+ 'toggleRow2DetailOnRow">grid.row(\'2\').toggleDetail()</div><br/>',
		'<div data-dojo-type="dijit.form.Button" data-dojo-props="onClick:'
			+ 'isRow3DetailShownOnRow">grid.row(\'1\').isDetailShown()</div><br/>'
	].join(''));
	
	tp.startup();
});
