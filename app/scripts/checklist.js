function printChecklist() {
  var doc = new jsPDF('landscape');

  var specialElementHandlers = {
    '.material_icons': function(element, renderer){
		    return true;
	    }
  };

  doc.setFontSize(36);
  doc.text("Project Checklist", 100, 25);

  doc.fromHTML($('#checklist_form').get(0), 40, 50, {
	   'width': 170,
     'elementHandlers': specialElementHandlers
  });

  doc.save('Checklist.pdf');
}

function cleanChecklist() {
  for(var i = 1; i <= 20; i++){
    $('input[name='+i+']').val('');
    $('select[name='+i+']').val('0');
    $('select[name='+i+']').material_select();

  }

  Materialize.toast('Form cleaned!', 3000)
}
