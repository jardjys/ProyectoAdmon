function save() {
}

function cleanChecklist() {
  for(var i = 1; i <= 20; i++){
    $('input[name='+i+']').val('');
    $('select[name='+i+']').val('0');
    $('select[name='+i+']').material_select();

  }

  Materialize.toast('Form cleaned!', 3000)
}
