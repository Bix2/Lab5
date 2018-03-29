var url = "/";
var primus = Primus.connect(url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
});


/*
*
* HANDLING INCOMING REQUESTS
*
*/

primus.on('data', function(data) {
  var question = $('.title--live');
  var choice1 = $('.choice1 p.text');
  var choice2 = $('.choice2 p.text');
  
  if(question){
    question.html(data.question);
    choice1.html(data.choice1);
    choice2.html(data.choice2);
    $('.button').css({display: "none" });
    $('.choices').css({background: "#2EBC99"});
  }
});

/*
*
* SUBMIT FORM
*
*/

$(document).ready(function() {

  var submitPoll = $(".submit");

  if (submitPoll) {
    submitPoll.click(function(e) {
      primus.write({
        question: $('#question').val(),
        choice1: $('#option1').val(),
        choice2: $('#option2').val(),
      })
      e.preventDefault();
    });

/*
*
* VOTE FOR OPTIONS
*
*/

  } else {
    $(".choice1").click(function() {
      prims.write({
        action: "vote"
      })
      vote("1");
    })

    $(".choice2").click(function() {
      prims.write({
        action:"vote"
      })
      vote("2");
    })
  }

  var countChoice1 = 0;
  var countChoice2 = 0;

  function vote(id) {
    if (id == 1) {
      countChoice1++;
    } else if (id == 2) {
      countChoice2++;
    }
  }

/*
*
* ANIMATION OF VOTING
*
*/

  $(".choices").click(function() {
    $(this).animate({
      width: '+=100px'
    }, 500);

    return false;
  });

});