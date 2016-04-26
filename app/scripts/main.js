/* Init Enviroment */

$( document ).ready(function(){
  $(".dropdown-button").dropdown();
  $('select').material_select();

  //Set the name & name project
  var project_name = localStorage.getItem('project_name');
  var evaluator = localStorage.getItem('evaluator');

  document.getElementById('project_name').innerHTML = project_name;
  document.getElementById('evaluator').innerHTML = evaluator;
});
/* END Init */
