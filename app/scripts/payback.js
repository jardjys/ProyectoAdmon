function drawPaybackTable(){
	var select = document.getElementById('periodo-select');

	var content = document.getElementById('pp-table-content');

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

	content.innerHTML = stringContent;
	for(var i = 1; i <= periods; i++){
		stringContent +=
		'<div class=\'row\'><div class=\'col l2 md2\'><h5 class=\'center-align\'> '+ i + '</h5></div>' +
		'<div class=\'col l3 md3\'><input type=\'text\' id=\'outflow'+ i +'\' placeholder=\'$0\'></div>'+
		'<div class=\'col l3 md3\'><input type=\'text\' id=\'inflow'+ i +'\' placeholder=\'$0\'></div>'+
		'<div class=\'col l4 md4\'><input  type=\'text\' id=\'cummulative'+ i +'\' placeholder=\'$0\' readonly></div></div>';
	}
	content.innerHTML = stringContent;
	for(var i = 1; i <= periods; i++){
		$('#outflow' + i).on('focusout',	validateFlow);
		$('#inflow' + i).on('focusout', 	validateFlow);
	}
}

function validatePrincipal(){
	console.log("check");
	var principal = document.getElementById('pp-principal');
	if(principal.value == ''){
		principal.value = 0;
	}

	if(isNaN(parseFloat(principal.value))){
		alert('Please, put a valid number as the Principal');
		principal.value = '0';
	}else{
		if(parseFloat(principal.value) < 0){
			alert('Please, put a positive number');
			principal.value = '0';
		}
	}
	principal.value = parseFloat(principal.value);
}

function validateInterest(){
	var interest = document.getElementById('pp-interes');
	if(interest.value == ''){
		interest.value = '0';
	}
	if(isNaN(parseInt(interest.value))){
		alert('Please, put a valid integer as the interest');
		interest.value = '0';
	}else{
		if(parseInt(interest.value) < 0 || parseInt(interest.value, 10) > 100){
			alert('You have to choose an interest percentage between 0 - 100');
			interest.value = '0';
		}
	}
	interest.value = parseInt(interest.value);
}

function calculate(){
	var select = document.getElementById('periodo-select');
	var principal = document.getElementById('pp-principal');
	var interest = document.getElementById('pp-interes');

	if(select.options[select.selectedIndex].value == 0){
		alert('Select a number of periods and fill the information');
		return;
	}
	if(principal.value == '0'){
		alert('The principal has to be greater than 0');
		return;
	}
	var periods = select.options[select.selectedIndex].value;
	var interest = document.getElementById('pp-interes').value;
	var cummulativeFlow = principal.value * -1;
	var prevC = cummulativeFlow;

	for(var i = 1; i <= periods; i++){
		var outflow = document.getElementById('outflow' + i).value;
		var inflow = document.getElementById('inflow' + i).value;
		var cashflow = inflow - outflow;
		var cost = cummulativeFlow * interest /100;
		cummulativeFlow += cashflow + cost;
		var result = document.getElementById('cummulative' + i);
		result.value = cummulativeFlow;

		if(cummulativeFlow < 0){
			result.style.color = 'red';
		}else{
			result.style.color = 'black';
		}
		if(cummulativeFlow >= 0 && prevC < 0){
			result.style.backgroundColor = 'green';
		}else{
			result.style.backgroundColor = 'white';
		}

		prevC = cummulativeFlow;
	}
}

function Clear(){
	var select = document.getElementById('periodo-select');
	var principal = document.getElementById('pp-principal');
	var interest = document.getElementById('pp-interes');
	principal.value = '0';
	interest.value = '0';
	var periods = select.options[select.selectedIndex].value;
	var periods = select.options[select.selectedIndex].value;
	for(var i = 1; i <= periods; i++){
		document.getElementById('outflow' + i).value = '0';
		document.getElementById('inflow' + i).value = '0';
		document.getElementById('cummulative' + i).value = '0';
		document.getElementById('cummulative' + i).style.backgroundColor = 'white';
		document.getElementById('cummulative' + i).style.color = 'black';
	}
}

function validateFlow(){
	var select = document.getElementById('periodo-select');
	var periods = select.options[select.selectedIndex].value;
	for(var i = 1; i <= periods; i++){
		if(document.getElementById('outflow' + i).value == ''){
			document.getElementById('outflow' + i).value = '0';
		}else{
			if(isNaN(parseFloat(document.getElementById('outflow' + i).value))){
			alert('You have an invalid value in your cashflow');
			document.getElementById('outflow' + i).value = '0';
			}else{
				document.getElementById('outflow' + i).value = parseFloat(document.getElementById('outflow' + i).value);
			}
		}
		if(document.getElementById('inflow' + i).value == ''){
			document.getElementById('inflow' + i).value = '0';
		}else{
			if(isNaN(parseFloat(document.getElementById('inflow' + i).value))){
				alert('You have an invalid value in your cashflow');
				document.getElementById('inflow' + i).value = '0';
			}else{
				document.getElementById('inflow' + i).value = parseFloat(document.getElementById('inflow' + i).value);
			}
		}
	}

}
$(document).ready(function(){

  /*Hot fix:
 		Changed "document.getElementById(id).addEventListener" for "$(#id).on()" due to
		materialize compatibility problems.

	*/
  $('#Periodo').on('change', 'select', drawPaybackTable);
	$('#pp-principal').on('focusout', validatePrincipal);
	$('#pp-interes').on('focusout', validateInterest);
	$('#Calcular').on('click', calculate);
	$('#LDatos').on('click', Clear);
});
