document.addEventListener('copy', function(e) {
    var copyed = document.getSelection().toString();
    
      //console.log(copyed);
      chrome.runtime.sendMessage({
          data: 'copyDataAdded',
          str: copyed,
        });
});
