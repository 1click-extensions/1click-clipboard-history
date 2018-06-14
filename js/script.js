document.addEventListener('copy', function(e) {
    var copyed = document.getSelection().toString();
          chrome.runtime.sendMessage({
          data: 'copyDataAdded',
          str: copyed,
        });
});
