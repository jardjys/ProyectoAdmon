/* Init Enviroment */

//Set the name & name project
(function() {
  var project_name = localStorage.getItem('project_name');
  var evaluator = localStorage.getItem('evaluator');

  document.getElementById('project_name').innerHTML = project_name;
  document.getElementById('evaluator').innerHTML = evaluator;
})();


$( document ).ready(function(){
  $(".dropdown-button").dropdown();
});

/* END Init */
