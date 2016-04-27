

function loadAllData(){

  //var select = document.getElementById('periodo-select');
	var content = document.getElementById('pp-table-content');
  var npvres = document.getElementById('npv-result');
	var stringContent =

	'<div class="row  white-text red lighten-2 center-align"> ' +
				'<div class="col l2 md2">' +
					'<h5> Period</h5>' +
				'</div>' +
				'<div class="col l3 md3">' +
					'<h5> Outflow </h5>'+
				'</div>' +
				'<div class="col l3 md3">' +
					'<h5> Inflow </h5>' +
				'</div>' +
				'<div class="col l4 md4">' +
					'<h5> Cumulative Cash Flow</h5>' +
				'</div>' +
		'</div>';

	//Clean the content
	while (content.firstChild) {
    content.removeChild(content.firstChild);
	}

  var periods = select.options[select.selectedIndex].value;

	for(var i = 1; i <= periods; i++){
		stringContent +=
		'<div class=\'row\'><div class=\'col l2 md2\'><h5 class=\'center-align\'> '+ i + '</h5></div>' +
		'<div class=\'col l3 md3\'><input type=\'text\' id=\'outflow'+ i +'\' placeholder=\'$0\'></div>'+
		'<div class=\'col l3 md3\'><input type=\'text\' id=\'inflow'+ i +'\' placeholder=\'$0\'></div>'+
		'<div class=\'col l4 md4\'><input  type=\'text\' id=\'cummulative'+ i +'\' value=\'$0\' readonly></div></div>';
	}
	content.innerHTML = stringContent;
	for(var i = 1; i <= periods; i++){
		$('#outflow' + i).on('focusout',  null, 'outflow' + i, validateFlow);
		$('#inflow' + i).on('focusout', null,	'inflow' + i, validateFlow);
	}

}


function saveXlsx(){

}
