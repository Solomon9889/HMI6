var datepost
function load(){

// Get a database reference to our posts
// Attach an asynchronous callback to read the data at our posts reference
/* messagesRef.on("value", function(snapshot) {
  console.log(snapshot.child('messages'));

    

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});*/

messagesRef.on("child_added", function(snapshot, prevChildKey) {
  var newPost = snapshot.val();
  console.log("Dates: " + newPost.inputDate);
  datepost = newPost.inputDate;
  console.log(datepost);
 
});

messagesRef.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val(); 
                   // childData will be the actual contents of the child
                   //inputName,inputDate,inputNotes,inputTag
      var inputName1=childData.inputName;
      var inputDate1=childData.inputDate;
      var inputNotes1=childData.inputNotes;
      var inputTag1=childData.inputTag;
      console.log(childData);
      dataCel.each(function() {
        if ($(this).data("day") === inputDate1) {
          if (inputName1 != null) {
            $(this).attr("data-name", inputName1);
          }
          if (inputNotes1 != null) {
            $(this).attr("data-notes", inputNotes1);
          }
          $(this).addClass("event");
          if (inputTag1 != null) {
            $(this).addClass("event--" + inputTag1);
          }      fillEventSidebar($(this));

         
    
          
    }
      });





      
  });
});



}



window.onload = function() {
  load();
};





//global variables

var monthEl = $(".c-main");
var dataCel = $(".c-cal__cel");
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

var monthText = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var indexMonth = month;
var todayBtn = $(".c-today__btn");
var addBtn = $(".js-event__add");
var saveBtn = $(".js-event__save");
var closeBtn = $(".js-event__close");
var winCreator = $(".js-event__creator");
var inputDate = $(this).data();
var delBtn = $(".js-event__del");
var savBtn = $(".js-event__conf");
today = year + "-" + month + "-" + day;


// ------ set default events -------
function defaultEvents(dataDay,dataName,dataNotes,classTag){
  var date = $('*[data-day='+dataDay+']');
  date.attr("data-name", dataName);
  date.attr("data-notes", dataNotes);
  date.addClass("event");
  date.addClass("event--" + classTag);
}

//defaultEvents(today, 'YEAH!','Today is your day','important');
defaultEvents('2017-12-25', 'MERRY CHRISTMAS','A lot of gift!!!!','festivity');
defaultEvents('2017-05-04', "LUCA'S BIRTHDAY",'Another gifts...?','birthday');
defaultEvents('2017-03-03', "MY LADY'S BIRTHDAY",'A lot of money to spent!!!!','birthday');


// ------ functions control -------

//button of the current day
todayBtn.on("click", function() {
  if (month < indexMonth) {
    var step = indexMonth % month;
    movePrev(step, true);
  } else if (month > indexMonth) {
    var step = month - indexMonth;
    moveNext(step, true);
  }
});

//higlight the cel of current day
dataCel.each(function() {
  if ($(this).data("day") === today) {
    $(this).addClass("isToday");
    fillEventSidebar($(this));
  }
});
// Delete function
$('#show').on('click', function () {
  $('.center').show();
  $(this).hide();
  document.querySelector('input[type="date"]').value = today;
  console.log(today);
  deleteEvent(today);
})

$('#close').on('click', function () {
  $('.center').hide();
  $('#show').show();
})
//window event creator
addBtn.on("click", function() {
  winCreator.addClass("isVisible");
  $("body").addClass("overlay");
  dataCel.each(function() {
    if ($(this).hasClass("isSelected")) {
      today = $(this).data("day");
      console.log(today);
      document.querySelector('input[type="date"]').value = today;
    } else {
      document.querySelector('input[type="date"]').value = today;
    }
  });
});

delBtn.on("click", function() {
  winCreator.addClass("isVisible");
  $("body").addClass("overlay");
  dataCel.each(function() {
    if ($(this).data("day") === inputDate) {
      $(this).addClass("isToday");
     deleteEvent($(this).data("day")) ;
    }
  });
  winCreator.addClass("isVisible");
  $("body").addClass("overlay");
  dataCel.each(function() {
    if ($(this).hasClass("isSelected")) {
      today = $(this).data("day");
      console.log(today);

      document.querySelector('input[type="date"]').value = today;
    } else {
      document.querySelector('input[type="date"]').value = today;
    }
  });
});
closeBtn.on("click", function() {
  winCreator.removeClass("isVisible");
  $("body").removeClass("overlay");
});
;
  firebase.initializeApp(config);



  // Get a database reference to our posts

//important stuff : insertion 
var messagesRef=firebase.database().ref('messages');
saveBtn.on("click", function() {
  var inputName = $("input[name=name]").val();
  var inputDate = $("input[name=date]").val();

  var inputNotes = $("textarea[name=notes]").val();
  var inputTag = $("select[name=tags]")
  .find(":selected")
  .text();
  console.log(typeof(inputDate))
  console.log(typeof(inputName))

  console.log(typeof(inputNotes))
  console.log(typeof(inputTag))


  defaultEvents(today, 'happy!','Today is your day','important');


    saveMessage(inputName,inputDate,inputNotes,inputTag);
    
//need to change the code below  
    dataCel.each(function() {
    if ($(this).data("day") === inputDate) {
      if (inputName != null) {
        $(this).attr("data-name", inputName);
      }
      if (inputNotes != null) {
        $(this).attr("data-notes", inputNotes);
      }
      $(this).addClass("event");
      if (inputTag != null) {
        $(this).addClass("event--" + inputTag);
      }      fillEventSidebar($(this));

      
}
  });
  // savBtn.on("click", function() {

  //   var inputDate = $("input[name=date]").val();

  //   deleteEvent(inputDate);

  // });
  function saveMessage(inputName,inputDate,inputNotes,inputTag){
    var newMessageRef=messagesRef.push();
    newMessageRef.set({
        inputName: inputName,
        inputDate: inputDate,
        inputNotes: inputNotes,
        inputTag:inputTag


    });

}
function getLeads(){
  var leadsRef = database.ref('bookevent-10ecc');
  leadsRef.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        //console.log(childData)
      });
  });
}



// function createInput(){
//   var something = $('<input/>').attr({ type: 'button', name:'btn1', value:'a button' });
//   $("p").append(something);
// }

  winCreator.removeClass("isVisible");
  $("body").removeClass("overlay");
  $("#addEvent")[0].reset();

 


});

//fill sidebar event info
function fillEventSidebar(self) {
  $(".c-aside__event").remove();
  var thisName = self.attr("data-name");
  var thisNotes = self.attr("data-notes");
  var thisImportant = self.hasClass("event--important");
  var thisBirthday = self.hasClass("event--birthday");
  var thisFestivity = self.hasClass("event--festivity");
  var thisEvent = self.hasClass("event");
  
  switch (true) {
    case thisEvent:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event'>" +
        thisName +
        " <span> • " +
        thisNotes +
        "</span></p>"
      );
      break;
    case thisImportant:
     
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--important'>" +
        thisName +
        " <span> • " + "<br>"+
        thisNotes + 
        "</span></p>" + x
      );
    
      break;
    case thisBirthday:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--birthday'>" +
        thisName +
        " <span> • " +
        thisNotes +
        "</span></p>"
      );
      break;
    case thisFestivity:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--festivity'>" +
        thisName +
        " <span> • " +
        thisNotes +
        "</span></p>"
      );
      break;
    
   }
};
dataCel.on("click", function() {
  var thisEl = $(this);
  var thisDay = $(this)
  .attr("data-day")
  .slice(8);
  var thisMonth = $(this)
  .attr("data-day")
  .slice(5, 7);

  fillEventSidebar($(this));

  $(".c-aside__num").text(thisDay);
  $(".c-aside__month").text(monthText[thisMonth - 1]);

  dataCel.removeClass("isSelected");
  thisEl.addClass("isSelected");

});

//function for move the months
function moveNext(fakeClick, indexNext) {
  for (var i = 0; i < fakeClick; i++) {
    $(".c-main").css({
      left: "-=100%"
    });
    $(".c-paginator__month").css({
      left: "-=100%"
    });
    switch (true) {
      case indexNext:
        indexMonth += 1;
        break;
    }
  }
}
function movePrev(fakeClick, indexPrev) {
  for (var i = 0; i < fakeClick; i++) {
    $(".c-main").css({
      left: "+=100%"
    });
    $(".c-paginator__month").css({
      left: "+=100%"
    });
    switch (true) {
      case indexPrev:
        indexMonth -= 1;
        break;
    }
  }
}

//months paginator
function buttonsPaginator(buttonId, mainClass, monthClass, next, prev) {
  switch (true) {
    case next:
      $(buttonId).on("click", function() {
        if (indexMonth >= 2) {
          $(mainClass).css({
            left: "+=100%"
          });
          $(monthClass).css({
            left: "+=100%"
          });
          indexMonth -= 1;
        }
        return indexMonth;
      });
      break;
    case prev:
      $(buttonId).on("click", function() {
        if (indexMonth <= 11) {
          $(mainClass).css({
            left: "-=100%"
          });
          $(monthClass).css({
            left: "-=100%"
          });
          indexMonth += 1;
        }
        return indexMonth;
      });
      break;
  }
}

buttonsPaginator("#next", monthEl, ".c-paginator__month", false, true);
buttonsPaginator("#prev", monthEl, ".c-paginator__month", true, false);

//launch function to set the current month
moveNext(indexMonth - 1, false);

//fill the sidebar with current day
$(".c-aside__num").text(day);
$(".c-aside__month").text(monthText[month - 1]);







function deleteEvent(inputDate2){
  messagesRef.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val(); 
                   // childData will be the actual contents of the child
                   //inputName,inputDate,inputNotes,inputTag
      var inputName1=childData.inputName;
      var inputDate1=childData.inputDate;
      var inputNotes1=childData.inputNotes;
      var inputTag1=childData.inputTag;
      console.log(childData);

  if(inputDate2==inputDate1){
 messagesRef.set({
  inputName : null,
  inputDate : null, 
  inputNotes : null,
  inputTag : null,
 })
}

});
});   
  
}