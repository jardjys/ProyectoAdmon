function changePeriods(){

	var select = document.getElementById("periodo-select");
  if(select.options[0].value == 0 && select.selectedIndex != 0){
		select.remove(0);
	}
	var content = document.getElementById("content");
	var stringContent = "";
  var periods = select.options[select.selectedIndex].value;

  content.innerHTML = "";
	for(var i = 1; i <= periods; i++){
		stringContent += "<div class=\"row\"><div class=\"col l3 md3\"><h5 class='center-align'> "+ i + "</h5></div><div class=\"col l3 md3\"><input type=\"text\" id=\"outflow"+ i +"\" value=\"0\"></div><div class=\"col l3 md3\"><input type=\"text\" id=\"inflow"+ i +"\" value=\"0\"></div><div class=\"col l3 md3\"><input  type=\"text\" id=\"cummulative"+ i +"\" value=\"0\" readonly></div></div>";
	}
	content.innerHTML = stringContent;
	for(var i = 1; i <= periods; i++){
		document.getElementById("outflow" + i).addEventListener("focusout", function(){
			validateFlow();
		});
		document.getElementById("inflow" + i).addEventListener("focusout", function(){
			validateFlow();
		});
	}
}

function validatePrincipal(){
	var principal = document.getElementById("Principal");
	if(principal.value == ""){
		principal.value = "0";
	}


	if(isNaN(parseFloat(principal.value))){
		alert("Please, put a valid number as the Principal");
		principal.value = "0";
	}else{
		if(parseFloat(principal.value) < 0){
			alert("Please, put a positive number");
			principal.value = "0";
		}
	}
	principal.value = parseFloat(principal.value);
}
function validateInterest(){
	var interest = document.getElementById("Interes");
	if(interest.value == ""){
		interest.value = "0";
	}
	if(isNaN(parseInt(interest.value))){
		alert("Please, put a valid integer as the interest");
		interest.value = "0";
	}else{
		if(parseInt(interest.value) < 0 || parseInt(interest.value, 10) > 100){
			alert("You have to choose an interest percentage between 0 - 100");
			interest.value = "0";
		}
	}
	interest.value = parseInt(interest.value);
}

function calculate(){
	var select = document.getElementById("periodo-select");
	var principal = document.getElementById("Principal");
	var interest = document.getElementById("Interes");
	if(select.options[select.selectedIndex].value == 0){
		alert("Select a number of periods and fill the information");
		return;
	}
	if(principal.value == "0"){
		alert("The principal has to be greater than 0");
		return;
	}
	var periods = select.options[select.selectedIndex].value;
	var interest = document.getElementById("Interes").value;
	var cummulativeFlow = principal.value * -1;
	var prevC = cummulativeFlow;
	for(var i = 1; i <= periods; i++){
		var outflow = document.getElementById("outflow" + i).value;
		var inflow = document.getElementById("inflow" + i).value;
		var cashflow = inflow - outflow;
		var cost = cummulativeFlow * interest /100;
		cummulativeFlow += cashflow + cost;
		var result = document.getElementById("cummulative" + i);
		result.value = cummulativeFlow;
		if(cummulativeFlow < 0){
			result.style.color = "red";
		}else{
			result.style.color = "black";
		}
		if(cummulativeFlow >= 0 && prevC < 0){
			result.style.backgroundColor = "green";
		}
		prevC = cummulativeFlow;
	}
}

function Clear(){
	var select = document.getElementById("Periodo");
	var principal = document.getElementById("Principal");
	var interest = document.getElementById("Interes");
	principal.value = "0";
	interest.value = "0";
	var periods = select.options[select.selectedIndex].value;
	for(i = 1; i <= periods; i++){
		document.getElementById("outflow" + i).value = "0";
		document.getElementById("inflow" + i).value = "0";
		document.getElementById("cummulative" + i).value = "0";
		document.getElementById("cummulative" + i).style.backgroundColor = "white";
		document.getElementById("cummulative" + i).style.color = "black";
	}
}
function validateFlow(){
	var select = document.getElementById("Periodo");
	var periods = select.options[select.selectedIndex].value;
	for(i = 1; i <= periods; i++){
		if(document.getElementById("outflow" + i).value == ""){
			document.getElementById("outflow" + i).value = "0";
		}else{
			if(isNaN(parseFloat(document.getElementById("outflow" + i).value))){
			alert("You have an invalid value in your cashflow");
			document.getElementById("outflow" + i).value = "0";
			}else{
				document.getElementById("outflow" + i).value = parseFloat(document.getElementById("outflow" + i).value);
			}
		}
		if(document.getElementById("inflow" + i).value == ""){
			document.getElementById("inflow" + i).value = "0";
		}else{
			if(isNaN(parseFloat(document.getElementById("inflow" + i).value))){
				alert("You have an invalid value in your cashflow");
				document.getElementById("inflow" + i).value = "0";
			}else{
				document.getElementById("inflow" + i).value = parseFloat(document.getElementById("inflow" + i).value);
			}
		}

	}

}
$(document).ready(function(){

  /*Hot fix */
  $('#Periodo').on('change', 'select', function(){ changePeriods(); });

	/*document.getElementById("Periodo").addEventListener("change", function(){
		changePeriods();
	});*/
	document.getElementById("Principal").addEventListener("focusout", function(){
		validatePrincipal();
	});
	document.getElementById("Interes").addEventListener("focusout", function(){
		validateInterest();
	});
	document.getElementById("Calcular").addEventListener("click", function(){
		calculate();
	});
	document.getElementById("LDatos").addEventListener("click", function(){
		Clear();
	});
});
