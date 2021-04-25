function validateEmail(providedEmail) {
  var regexEmailCheck = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (regexEmailCheck.test(providedEmail)) {
    return true;
  }
  else {
    return false;
  }
}

function validateComment(providedComment){
  var comment = $("#commentFormInput").val();
  if(comment.length <= 255 && comment.length >= 10 ){
    return true;
  }
  else {
    return false;
  }
}


$('#emailFormInput').on('keydown keyup', function(e){
  var providedEmail = $("#emailFormInput").val();
  if ($.trim(providedEmail)==0) {
    $('.btn').attr('disabled', true);
    console.log('it checks if no input');
  }
  if (validateEmail(providedEmail)) {
    $('.btn').removeAttr('disabled');
  }

});

$('#commentFormInput').on('keydown keyup', function(e){
  var providedComment = $('#commentFormInput').val();
  if ($.trim(providedComment==0)) {
    $('.btn').attr('disabled',true);
    console.log("it removed the attribute in email");
  }
  if (validateComment(providedComment)){
    $('.btn').removeAttr('disabled');
    console.log("it removed the attribute in comment");
  }

});

function getEmail(){
  return $("#emailFormInput").val();
}
function getComment(){
  return $("#commentFormInput").val();
}

$(function(){
    $('.contactForm').submit(function(event){
        event.preventDefault();
        console.log("Submit event is fired");
        var data = {
          email: getEmail(),
          comment: getComment()
        };
        $.ajax({
          url: "https://rqwq3jswjd.execute-api.us-east-1.amazonaws.com/contactinfobeta5/contact-info-forward",
          type: 'post',
          contentType: "application/json",
          data: JSON.stringify(data),
          success: function(){
            console.log("Info was successfully transferred to Lambda API.");
            console.log(data);
            $('.btn').attr('disabled', true);
            $('#emailFormInput').val('');
            $('#commentFormInput').val('');
          },
          error: function(jqXHR, textStatus, errorThrown){
            if (jqXHR.status == 500) {
                      console.log('Internal error: ' + jqXHR.responseText+"  "+errorThrown);
                  } else {
                      console.log(errorThrown);
                  }
          }
        });
    });
  });
