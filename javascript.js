$(document).ready(function(){
  updateUserList();
  loadEvents();
});

var url = "http://477-33.csse.rose-hulman.edu:8080/UserID/"; 
var addUrl = "http://477-32.csse.rose-hulman.edu:8080/Calculator/"; 

var loadEvents = function() {
  $("#submitButton").click(function(){

  var name = $("#nameInput").val();
  var email = $("#emailInput").val();

  var data = {
    "name": name,
    "email": email
  };

  var post = $.post(url, JSON.stringify(data))
    .done(function(response) {
      updateUserList();
      alert("User created!");
    })
    .fail(function(err){
      alert("Creating a new user failed: " + err.status + ": " + err.statusText);
    });
  });
  
  $("#userSelect").change(function(){
    var id = $("userSelect").val();
    var get = $.get(url+id, function(response) {
      response = JSON.parse(response);
      $('editNameInput').val(response.name);
      $('editEmailInput').val(response.email);
    });
  });
  
  $("#editUserButton").click(function() {
    var editName = $("#editNameInput").val();
    var editEmail = $("#editEmailInput").val();
    var id = $("#userSelect").val();

    var data = {
      "name": editName,
      "email": editEmail
    };

    $.ajax({
      type: "PUT",
      url:url+id,
      data: JSON.stringify(data)
    })
    .done(function(response) {
      updateUserList();
      alert("User updated!");
    })
    .fail(function(response) {
      alert("Updating failed!");
    });
  });

  $("#deleteUserButton").click(function(){
    var id = $("#userSelect").val();
    
    $.ajax({
      type: "DELETE",
      url: url+id
    })
    .done(function(response){
      updateUserList();
      alert("Delete successful!");
    })
    .fail(function(response){
      alert("Delete failed!");
    });
  });

  $("#addButton").click(function(){
    var firstNum = $("#firstNumberInput").val();
    var secondNum = $("#secondNumberInput").val();

    var data = {
      "first": firstNum,
      "second": secondNum
    };

    var post = $.post(addUrl, JSON.stringify(data))
      .done(function(response) {
        response = JSON.parse(response);
        $("#result").text(response.answer);
        alert("Addition Succeeded!");
      })
      .fail(function(response){
        alert("Addition failed!");
      });
  });
};


var updateUserList = function() {
  var get = $.get(url, function(response) {
    response = JSON.parse(response);
    $("#usersList").empty();
    $("#userSelect").empty();
    if(response.length === 0){
      alert("no users!");
      return;
    }
    $.each(response, function(i, user) {
        $("#usersList").append($("<li>"+user.id + ": " + user.name + " " + user.email + "</li>"));
        $("#userSelect").append($("<option>").text(user.id).attr("value", user.id));
    });
  })
  .fail(function(){
    alert("Updating user list failed!");
  });
};

