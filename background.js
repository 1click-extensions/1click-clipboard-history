chrome.runtime.setUninstallURL("https://1ce.org");

if (!localStorage.created) {
  chrome.tabs.create({ url: "https://1ce.org" });
  var manifest = chrome.runtime.getManifest();
  localStorage.ver = manifest.version;
  localStorage.created = 1;
}
var pasteData = [];
chrome.runtime.onMessage.addListener(function (data, sender, callback) {
 //console.log(sender)
 switch (data.data) {
     case 'copyDataAdded':
       //console.log(data.imgData);
       pasteData.unshift(data.str);
       if(pasteData.length > 40){
          pasteData.splice(pasteData.length - 40)
       }
       break;
     case 'getAllCopyData':
       //console.log(data.imgData);
       callback(pasteData);
       break;
     case 'emptyData':
       //console.log(data.imgData);
       pasteData = [];
       break;
    //  case 'pasteSelected':
    //    //console.log(data.imgData);
    //    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    //     chrome.tabs.sendMessage(tabs[0].id, {data:'pasteSelected',str: data.str});
    //   });
    //    //console.log(data.str);
    //    break;
   }
});