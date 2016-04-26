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


function calculate(){
	var select = document.getElementById('periodo-select');
	var principal = document.getElementById('pp-principal');
	var interest = document.getElementById('pp-interes');

	if(select.options[select.selectedIndex].value == 0){
		Materialize.toast('Select a number of periods and fill the table.', 3000);
		return;
	}
	if(principal.value == '0'){
		Materialize.toast('The principal has to be greater than 0.', 3000);
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
		result.value = cummulativeFlow.toFixed(2);

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

		$('#pp-print').removeClass('disabled');
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
		document.getElementById('outflow' + i).value = '';
		document.getElementById('inflow' + i).value = '';
		document.getElementById('cummulative' + i).value = '$0';
		document.getElementById('cummulative' + i).style.backgroundColor = 'white';
		document.getElementById('cummulative' + i).style.color = 'black';
	}

	$('#pp-print').addClass('disabled');
}

function printPaybackPeriod() {
	var table = $('#pp-table-content');
	var form = $('#pp-form');
	var cache_width = table.width();
	var a4 = [595.28, 841.89];

	var doc = new jsPDF({unit:'px', format:'a4'});

	doc.setFontSize(36);
	doc.text('Payback Period', 120, 75);

	html2canvas(table,{
     imageTimeout:2000,
     removeContainer:true,
		 onrendered: function(canvas){
			 var img = canvas.toDataURL('image/png');
			 doc.addImage(img, 'JPEG', 0, 150, canvas.width * .40 , canvas.height * .40);

			 html2canvas(form,{
					imageTimeout:2000,
					removeContainer:true,
					onrendered: function(canvas){
						var img = canvas.toDataURL('image/png');
						doc.addImage(img, 'JPEG', 75, 100, canvas.width * .40, canvas.height * .40);
						doc.save('Payback.pdf');
					}
				 });
		 }
    });
}

$(document).ready(function(){
  /*Hot fix:
 		Changed "document.getElementById(id).addEventListener" for "$(#id).on()" due to
		materialize compatibility problems.
		(JQuery form)
	*/
  $('#Periodo').on('change', 'select', drawPaybackTable);
	$('#pp-principal').on('focusout', null, 'pp-principal', validatePrincipal);
	$('#pp-interes').on('focusout', null, 'pp-interes', validateInterest);
	$('#Calcular').on('click', calculate);
	$('#LDatos').on('click', Clear);
});
