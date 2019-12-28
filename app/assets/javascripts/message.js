$(function(){
  var buildHTML = function(message){
    if (message.text && message.image){
      var html = 
        `<div class="message" data-message-id = ${message.id}>
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

    } else if (message.text){
      var html =
        `<div class="message" data-message-id = ${message.id}>
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
    } else if (message.image){
      var html =
        `<div class="message"  data-message-id = ${message.id}>
          <div class="group">
            <div class="group_message">
              <div class="group_message__member">
                ${message.user_name}
              </div>
              <div class="group_message__time">
                ${message.created_at}
              </div>
            </div>
            <img class="lower-message__image" src=${message.image}>
            </div>
          </div>
        </div>`
    };
    return html;
  };
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
    })
    .always(function(){
      $('.send-box__btn').prop('disabled', false);
    });
  });

  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
    })
    .fail(function() {
      console.log('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});