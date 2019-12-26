$(function(){
  function buildHTML(message){
    if (message.image){
      var html = 
        `<div class="chat_group">
            <div class="group">
              <div class="group_message">
                <div class="group_message__member">
                  ${message.user_name}
                </div>
                <div class="group_message__time">
                  ${message.created_at}
                </div>
              </div>
            <div class="group_text">
              ${message.text}
            </div>
            <img class="lower-message__image" src=${message.image}>
            </div>
          </div>`
      return html;
    } else {
      var html =
        `<div class="chat_group">
            <div class="group">
              <div class="group_message">
                <div class="group_message__member">
                  ${message.user_name}
                </div>
                <div class="group_message__time">
                  ${message.created_at}
                </div>
              </div>
            <div class="group_text">
              ${message.text}
            </div>
          </div>`
      return html;
    };
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url:url,
      type:'POST',
      data:formData,
      dataType:'json',
      processData:false,
      contentType:false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);      
      $('form')[0].reset();
      $('.send-box__btn').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
    .always(function(){
      $('.send-box__btn').prop('disabled', false);
    });
  });
});