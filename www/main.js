// $(function(){
//   //var path = "file:///mnt/sdcard/test_pictures/";
//   var path = "images/"
//
//   for (var i = 1; i <= 100; i++) {
//     $('<img>').attr('src', path + 'beautifulgirlA (' + i + ').jpg').css('width', '33%').appendTo($('body'));
//   }
//
//   for (var i = 1; i <= 100; i++) {
//     $('<img>').attr('src', path + 'beautifulgirlB (' + i + ').jpg').css('width', '33%').appendTo($('body'));
//   }
//
//   for (var i = 1; i <= 96; i++) {
//     $('<img>').attr('src', path + 'beautifulgirlC (' + i + ').jpg').css('width', '33%').appendTo($('body'));
//   }
//
//   for (var i = 1; i <= 100; i++) {
//     $('<img>').attr('src', path + 'beautifulgirlD (' + i + ').jpg').css('width', '33%').appendTo($('body'));
//   }
//
//   for (var i = 1; i <= 100; i++) {
//     $('<img>').attr('src', path + 'beautifulgirlE (' + i + ').jpg').css('width', '33%').appendTo($('body'));
//   }
//
//   for (var i = 1; i <= 100; i++) {
//     $('<img>').attr('src', path + 'beautifulgirlF (' + i + ').jpg').css('width', '33%').appendTo($('body'));
//   }
//
//   for (var i = 1; i <= 75; i++) {
//     $('<img>').attr('src', path + 'beautifulgirlG (' + i + ').jpg').css('width', '33%').appendTo($('body'));
//   }
//
// });


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        setTimeout(init, 200);
    }
};

app.initialize();


function init() {
  // window.thumbnail("/storage/emulated/0/test.jpg", function(result) {
  //   $('<img>').attr('src', 'data:image/png;base64,'+result).css('width', '33%').appendTo($('body'));
  // });

  //var path = "file:///mnt/sdcard/test_pictures/";
  var path = "/storage/emulated/0/test_pictures/images/"

  for (var i = 1; i <= 100; i++) {
    //$('<img>').attr('src', path + 'beautifulgirlA (' + i + ').jpg').css('width', '33%').appendTo($('body'));
    window.thumbnail(path + 'beautifulgirlA (' + i + ').jpg', function(result) {
      $('<img>').attr('src', 'data:image/png;base64,'+result).css('width', '33%').appendTo($('body'));
    });
  }

  for (var i = 1; i <= 100; i++) {
    window.thumbnail(path + 'beautifulgirlB (' + i + ').jpg', function(result) {
      $('<img>').attr('src', 'data:image/png;base64,'+result).css('width', '33%').appendTo($('body'));
    });
  }

  for (var i = 1; i <= 96; i++) {
    window.thumbnail(path + 'beautifulgirlB (' + i + ').jpg', function(result) {
      $('<img>').attr('src', 'data:image/png;base64,'+result).css('width', '33%').appendTo($('body'));
    });
  }

//  for (var i = 1; i <= 100; i++) {
//    window.thumbnail(path + 'beautifulgirlC (' + i + ').jpg', function(result) {
//      $('<img>').attr('src', 'data:image/png;base64,'+result).css('width', '33%').appendTo($('body'));
//    });
//  }
//
//  for (var i = 1; i <= 100; i++) {
//    window.thumbnail(path + 'beautifulgirlD (' + i + ').jpg', function(result) {
//      $('<img>').attr('src', 'data:image/png;base64,'+result).css('width', '33%').appendTo($('body'));
//    });
//  }
//
//  for (var i = 1; i <= 100; i++) {
//    window.thumbnail(path + 'beautifulgirlE (' + i + ').jpg', function(result) {
//      $('<img>').attr('src', 'data:image/png;base64,'+result).css('width', '33%').appendTo($('body'));
//    });
//  }
//
//  for (var i = 1; i <= 75; i++) {
//    window.thumbnail(path + 'beautifulgirlF (' + i + ').jpg', function(result) {
//      $('<img>').attr('src', 'data:image/png;base64,'+result).css('width', '33%').appendTo($('body'));
//    });
//  }
}
