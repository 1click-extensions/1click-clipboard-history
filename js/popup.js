document.getElementById('title').innerText = chrome.i18n.getMessage("popup_title");
toCopy = document.getElementById('to_copy');
textCopied = document.getElementById('text-copied');
clear = document.getElementById('clear');
textCopied.innerText = chrome.i18n.getMessage("text_copied");
clear.innerText = chrome.i18n.getMessage("clear");
console.log(clear);
clear.onclick = function(){
    chrome.runtime.sendMessage({
        data: 'emptyData'
      });
      window.close();
}

premissions.checkPermissions({permissions: ['tabs', "clipboardRead", "clipboardWrite"],origins:['<all_urls>']}, function(){}, function(){
    document.getElementById('title').style.display = "none";
    document.getElementById('clear').style.display = "none";
    dataDom = document.getElementById('data');
    dataDom.innerHTML = '<p>' + chrome.i18n.getMessage("permission_needed") + '</p><button type="button" class="btn give-perm">' + chrome.i18n.getMessage("grant_permissions") + '</button>';
    dataDom.getElementsByClassName('give-perm')[0].onclick = function(){
        premissions.requestPermissions({permissions: ['tabs', "clipboardRead", "clipboardWrite"],origins:['<all_urls>']}, function(){
            dataDom.dontAddData = false;
            rebuildPopup();
            chrome.runtime.sendMessage({
                data: 'permissions_granted',
            });
        }, function(){});
    }
    dataDom.dontAddData = true;
});


function rebuildPopup(){
    console.log('rebuildPopup')
    document.getElementById('title').style.display = "block";
    document.getElementById('clear').style.display = "inline-block";
    chrome.runtime.sendMessage({
        data: 'getAllCopyData',
    }, function(data){
        var dataDom = document.getElementById('data');
        if(!dataDom.dontAddData){
            dataDom.innerHTML = '';
            //console.log(data);
            for(var i=0; i < data.length;i++){
                    var part = data[i],
                        li = document.createElement('li');
                        var iden = 'one_click_input' + i;
                    li.innerHTML = '<button class="btn" data-clipboard-action="copy" data-clipboard-target="#'+ iden + '"></button>' + 
                                    '<input id="' + iden + '" type="text" style="display:none"/>';
                    var button = li.getElementsByClassName('btn')[0];
                    //console.log(button);
                    button.onclick = function(){
                        pasteSelected(this.innerText);
                    }
                    dataDom.appendChild(li);
                    document.getElementById(iden).value = part;
                    button.innerText = part;

            }
        }
        
        

    });
}
rebuildPopup();

  
function pasteSelected(str){
    toCopy.value = str;
    toCopy.textContent = str;
    var selection = document.getSelection(),
        range = document.createRange();
    //  range.selectNodeContents(textarea);
    range.selectNode(toCopy);
    selection.removeAllRanges();
    selection.addRange(range);
    toCopy.classList.add('show');
    var successful = document.execCommand('copy'); 
    toCopy.classList.remove('show');
    console.log('successful',successful, str)
    if(successful){
        textCopied.classList.add('show');
    }
}