$(function(){
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();    //フォームの値を取得して変数に代入する
    console.log(input);
  });
});