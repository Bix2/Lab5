var url = "/";
var primus = Primus.connect(url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
});

/*
* * * * * * * * * 
*  CREATE POLL  *
* * * * * * * * *
*/

var submitPoll = $(".submit");

if (submitPoll) {
  submitPoll.click(function(e) {
    var question = $('#question').val();
    var choice1 = $('#opt1').val();
    var choice2 = $('#opt2').val();
    primus.write({ 
      // write polldata
      question: question,
      option1: choice1,
      option2: choice2,
    })
    e.preventDefault();
  });
}


/*
* * * * * * * * * 
*  VOTE IN POLL *
* * * * * * * * *
*/

$(".option").on('click', function(e) {
  // only vote once
  if ($(this).hasClass('clicked')) return; 
  $(".option").addClass('clicked') 
    .off('click');
    $('.feedback').html("Vote submitted!")
    primus.write({ 
      action: "vote",
      optionID: this.dataset.id,
    });
    e.preventDefault();
});


var count1 = 0;
var count2 = 0;
var total = 0;

primus.on("data", function(data) {
  // console.log(data);

  var pollTitle = $(".title--live");
  if (pollTitle) {
    pollTitle.html(data.question);
    $(".opt1").html(data.option1);
    $(".opt2").html(data.option2);
    $('.button').css({display: "none"});
    $('.feedback').css({display: "block"});
  
    /*
    * * * * * * * * * * * * *  * 
    *  HANDLING INCOMING VOTES *
    * * * * * * * * * * * * *  *
    */

    if (data.action == "vote" && data.optionID == "1") {
      count1++;
      total++;
      $('.count').css({visibility: "visible"}, {width:"0"});
      $('.count1 span').html(Math.floor(parseInt((count1/total)*100).toFixed(0)) + '%');
      $('.count2 span').html(Math.floor(parseInt((count2/total)*100).toFixed(0)) + '%');
      $('.count1').animate({width: '+=20px'}, 500);
    }
  
    if (data.action == "vote" && data.optionID == "2") {
      count2++;
      total++;
      $('.count').css({visibility: "visible"}, {width:"0"});
      $('.count1 span').html(Math.floor(parseInt((count1/total)*100).toFixed(0)) + '%');
      $('.count2 span').html(Math.floor(parseInt((count2/total)*100).toFixed(0)) + '%');
      $('.count2').animate({width: '+=20px'}, 500);
    } 
  }
});      