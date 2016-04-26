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
  var select = document.getElementById('npv-periodo-select');
  var periodos =select.options[select.selectedIndex].value;
  var principal = $('#npv-Principal').val();
  var interes = $('#npv-Interes').val();
  var tax = $('#npv-Tax').val();

  if(periodos == 0){
    Materialize.toast('Select a number of periods and fill the table.', 3000);
    return;
  }

  if(principal == 0 || principal == null){
    Materialize.toast('The principal has to be greater than 0.', 3000);
    return;
  }

  var inflows = [];
  var outflows = [];

  for(var i = 0; i < periodos; i++){
    inflows[i] = $('#npv-inflow' + (i + 1)).val();
    outflows[i] = $('#npv-outflow' + (i + 1)).val();
  }

  var netflow = [];
  var cummulative = [];
  var npv = 0;

  tax = tax/100;
  interes = interes/100;

  for(var i = 0; i < periodos; i++){
    netflow[i] = inflows[i] - outflows[i];
    cummulative[i] = (netflow[i]*(1-tax))/Math.pow((1+interes), i);
    npv = npv + cummulative[i];

    var netflowField =  $('#npv-ncf'+ ( i+ 1));
    var cummulativeField = $('#npv-cummulative' + (i + 1));

    if(netflow[i] < 0){
      netflowField.css('color','red');
    }else{
      netflowField.css('color','black');
    }

    if(cummulative[i] < 0){
      cummulativeField.css('color','red');
    }else{
      cummulativeField.css('color','black');
    }

    netflowField.val(netflow[i].toFixed(2));
    cummulativeField.val(cummulative[i].toFixed(2));

  };

  var result = (npv - principal).toFixed(2);

  if(result < 0){
      $('#npv-result').css('color', 'red').html('-$ ' + Math.abs(result));
  }else{
      $('#npv-result').css('color', 'black').html('$ ' + result);
  }
}

function clean_npv(){
  $('#npv-Principal').val('');
  $('#npv-Interes').val('');
  $('#npv-Tax').val('');

  var select = document.getElementById('npv-periodo-select');
  var periodos =select.options[select.selectedIndex].value;

  for(var i = 0; i < periodos; i++){
    $('#npv-inflow' + (i + 1)).val('');
    $('#npv-outflow' + (i + 1)).val('');
    $('#npv-ncf'+ ( i+ 1)).val('$0').css('color', 'black');
    $('#npv-cummulative' + (i + 1)).val('$0').css('color', 'black');
  }

  $('#npv-result').css('color', 'black').html('$0');
}


$(document).ready(function(){
  /*Attention:
 		Change "document.getElementById(id).addEventListener" for "$(#id).on()" due to
		materialize compatibility problems.
    (JQuery form)
	*/
  $('#npv-periodo').on('change', 'select', drawNPVTable);
	$('#npv-Principal').on('focusout', null,	'npv-Principal', validatePrincipal);
  $('#npv-Tax').on('focusout', null, 'npv-Tax', validateInterest);
	$('#npv-Interes').on('focusout', null, 'npv-Interes', validateInterest);
	$('#npv-Calcular').on('click',	calculaNPV);
	$('#npv-LDatos').on('click', clean_npv);
});
