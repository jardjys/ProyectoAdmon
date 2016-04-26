function printChecklist() {
  var doc = new jsPDF('landscape');
  var element = $('#checklist_form').get(0);
  var cachedElement = $('#checklist_form').clone();

  for(var i = 1; i <= 20; i++){
    $('[name='+i+']').parent().html($('[name='+i+']').val());
  }

  var handlers = {
    '#ignore': function(el, renderer){
      console.log("ignore");
      return true;
    }
  };

  doc.setFontSize(36);
  doc.text("Project Checklist", 100, 25);

  doc.fromHTML(element, 40, 50, {
	   'width': 170,
     'elementHandlers': handlers
  });

  $('#checklist_form').html(cachedElement)
  doc.output("dataurlnewwindow");
  //doc.save('Checklist.pdf');
}


function cleanChecklist() {
  for(var i = 1; i <= 20; i++){
    $('input[name='+i+']').val('');
    $('select[name='+i+']').val('0');
    $('select[name='+i+']').material_select();

  }

  Materialize.toast('Form cleaned!', 3000)
}
