function drawNPVTable(){
	var select = document.getElementById('npv-periodo-select');
	var content = document.getElementById('npv-content');
	var stringContent =
    '<div class="row white-text red lighten-2 center-align">' +
        '<div class="col l1 md1">' +
          '<h5> Period</h5>' +
        '</div>' +
        '<div class="col l2 md2">' +
          '<h5> Outflow </h5>' +
        '</div>' +
        '<div class="col l2 md2">' +
          '<h5> Inflow </h5>' +
        '</div>' +
        '<div class="col l3 md3">' +
          '<h5> Net Cash Flow</h5>' +
        '</div>' +
        '<div class="col l4 md4">' +
          '<h5> Cumulative Cash Flow</h5>' +
        '</div>' +
    '</div>;'

  //Clean the content
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  var periods = select.options[select.selectedIndex].value;

	for(var i = 1; i <= periods; i++){
		stringContent += '<div class=\'row\'><div class=\'col l1 md1\'><h5 class="center-align"> '+ i + '</h5></div>' +
                     '<div class=\'col l2 md2\'><input type=\'text\' id=\'npv-outflow'+ i +'\' placeholder=\'$0\'></div>' +
                     '<div class=\'col l2 md2\'><input type=\'text\' id=\'npv-inflow'+ i +'\' placeholder=\'$0\'></div>'+
                     '<div class=\'col l3 md3\'><input  type=\'text\' id=\'npv-ncf'+ i +'\' value=\'$0\' readonly></div>' +
                     '<div class=\'col l4 md4\'><input  type=\'text\' id=\'npv-cummulative'+ i +'\' value=\'$0\' readonly></div></div>';
	}

	content.innerHTML = stringContent;

	for(var i = 1; i <= periods; i++){
    $('#npv-outflow' + i).on('focusout',  null, 'npv-outflow' + i, validateFlow);
    $('#npv-inflow' + i).on('focusout', null,	'npv-inflow' + i, validateFlow);
	}
}

function calculaNPV(){
  var periodos = $('#npv-periodo-select').val();
  var principal = $('#npv-principal').val();
  var interes = $('#npv-Interes').val();
  var tax = $('#npv-Tax').val();
  var currency = $('#npv-Currency').val();

  if(select.options[select.selectedIndex].value == 0){
    alert('Select a number of periods and fill the information');
    return;
  }
  if(principal.value == '0'){
    alert('The principal has to be greater than 0');
    return;
  }

  var inflows = new Array(periodos);
  var outflows = new Array(periodos);

  for(var i = 0; i < periodos; i++)

  inflows[0] = $('#inflows0').val();
  inflows[1] = $('#inflows1').val();
  inflows[2] = $('#inflows2').val();
  inflows[3] = $('#inflows3').val();
  inflows[4] = $('#inflows4').val();
  inflows[5] = $('#inflows5').val();
  inflows[6] = $('#inflows6').val();
  inflows[7] = $('#inflows7').val();
  inflows[8] = $('#inflows8').val();
  inflows[9] = $('#inflows9').val();
  inflows[10] = $('#inflows10').val();

  outflows[0] = $('#outflows0').val();
  outflows[1] = $('#outflows1').val();
  outflows[2] = $('#outflows2').val();
  outflows[3] = $('#outflows3').val();
  outflows[4] = $('#outflows4').val();
  outflows[5] = $('#outflows5').val();
  outflows[6] = $('#outflows6').val();
  outflows[7] = $('#outflows7').val();
  outflows[8] = $('#outflows8').val();
  outflows[9] = $('#outflows9').val();
  outflows[10] = $('#outflows10').val();

  var netflow = new Array(periodos);
  var cummulative = new Array(periodos);
  var npv = 0;

  tax = tax/100;
  interes = interes/100;
  for(var i = 0; i < periodos; i++){
    netflow[i] = inflows[i] - outflows[i];
    cummulative[i] = (netflow[i]*(1-tax))/Math.pow((1+interes), i);
    npv = npv + cummulative[i];
    console.log('Periodo: ' + i);
    console.log('Netflow: ' + netflow[i]);
    console.log('Cummulative: ' + cummulative[i]);
  };
  console.log('NPV is: ' + npv);
  $('#npv').html('<p>The NPV of the project is: $' + npv + ' ' + currency + '.</p><br>');
}


$(document).ready(function(){
  /*Attention:
 		Change "document.getElementById(id).addEventListener" for "$(#id).on()" due to
		materialize compatibility problems.
    (JQuery form)
	*/
  $('#npv-periodo').on('change', 'select', drawNPVTable);
	$('#npv-Principal').on('focusout', null,	'npv-Principal', validatePrincipal);
  $('#npv-Currency').on('focusout', null,	'npv-Currency', validatePrincipal);
	$('#npv-Interes').on('focusout', null, 'npv-Interes', validateInterest);
  $('#npv-Tax').on('focusout', null, 'npv-Tax', validateInterest);
	$('#npv-Calcular').on('click',	calculate);
	$('#npv-LDatos').on('click', Clear);
});
