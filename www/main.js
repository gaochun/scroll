var db = null;

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
      var request = indexedDB.open("library", 1);

      request.onupgradeneeded = function(event) {
        var db = request.result;
        if (event.oldVersion < 1) {
          var store = db.createObjectStore("thumbnail", {keyPath: "name"});
          var imageIndex = store.createIndex("by_image", "image");
        }
      };

      request.onsuccess = function() {
        db = request.result;
        init();
      };
    }
};

app.initialize();


function init() {
  var path = "/storage/emulated/0/test_pictures/images/"
  var index = 0;
  var width = screen.width / 3;
  window.setThumbnailSize(width);

  var file_names = [];

  for (var i = 1; i <= 100; i++) {
    file_names.push('beautifulgirlA (' + i + ').jpg');
    $('<img>').css('width', width + 'px').css('height', width + 'px').appendTo($('body'));
  }

  for (var i = 1; i <= 100; i++) {
    file_names.push('beautifulgirlB (' + i + ').jpg');
    $('<img>').css('width', width + 'px').css('height', width + 'px').appendTo($('body'));
  }

  for (var i = 1; i <= 96; i++) {
    file_names.push('beautifulgirlC (' + i + ').jpg');
    $('<img>').css('width', width + 'px').css('height', width + 'px').appendTo($('body'));
  }

  for (var i = 1; i <= 100; i++) {
    file_names.push('beautifulgirlD (' + i + ').jpg');
    $('<img>').css('width', width + 'px').css('height', width + 'px').appendTo($('body'));
  }

  for (var i = 1; i <= 100; i++) {
    file_names.push('beautifulgirlE (' + i + ').jpg');
    $('<img>').css('width', width + 'px').css('height', width + 'px').appendTo($('body'));
  }

  for (var i = 1; i <= 75; i++) {
    file_names.push('beautifulgirlF (' + i + ').jpg');
    $('<img>').css('width', width + 'px').css('height', width + 'px').appendTo($('body'));
  }

  file_names.reduce(function(sequence, file_name) {
    return sequence.then(function() {
      return new Promise(function(resolve, reject) {
        var tx = db.transaction("thumbnail", "readwrite");
        var store = tx.objectStore("thumbnail");
        var request = store.get(file_name);
        request.onsuccess = function() {
          var matching = request.result;
          if (matching !== undefined) {
            resolve(matching.image);
          } else {
            reject();
          }
        };
      }).then(function(result) {
        $('img').eq(index++).attr('src', 'data:image/png;base64,'+result);
      }).catch(function() {
        return new Promise(function(resolve, reject) {
          window.getThumbnail(path + file_name, function(result) {
            resolve(result);
          });
        }).then(function(result) {
          $('img').eq(index++).attr('src', 'data:image/png;base64,'+result);
          var tx = db.transaction("thumbnail", "readwrite");
          var store = tx.objectStore("thumbnail");
          var request = store.put({name: file_name, image: result});
        });
      });
    });
  }, Promise.resolve());
}
