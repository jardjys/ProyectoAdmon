function validateFlow(id){
	var input = $('#' + id.data);

	if(!input.val()){
		input.val(0);
	}else{
		if(isNaN(parseFloat(input.val()))){
			alert('You have an invalid value in your cashflow');
			input.val(0);
		}else{
			input.val(parseFloat(input.val()));
		}
	}
}

function validateInterest(event){
	var interest = document.getElementById(event.data);
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


function validatePrincipal(event){
	var principal = document.getElementById(event.data);
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
