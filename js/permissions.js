var premissions = {
    checkPermissions: function (permissions, callback, fallback) {
      // Optional paramets permissions to check
     chrome.permissions.contains(permissions, function (contains) {
        if (contains) {
          callback();
        } else {
          fallback();
        }
      });
    },
    requestPermissions: function (permissions, callback, fallback) {
      // Optional paramets permissions to request
      console.log('request!!!!', permissions);
      chrome.permissions.request(permissions, function (granted) {
        if (granted) {
          callback();
        } else {
          fallback();
        }
      });
    },
    requestWhenNotExsits(permissions, callback, fallback){
      premissions.checkPermissions(permissions, callback, function(){
        premissions.requestPermissions(permissions, callback, fallback);
      })
    }
  };