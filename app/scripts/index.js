function saveToProperties(){
  var project_name = document.getElementById("project_name").value;
  var evaluator = document.getElementById("evaluator").value;
  localStorage.setItem('project_name', project_name);
  localStorage.setItem('evaluator', evaluator);
}
