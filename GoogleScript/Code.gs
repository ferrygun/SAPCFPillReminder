function toDate(dStr,format) {
	var now = new Date();
	if (format == "h:m") {
 		now.setHours(dStr.substr(0,dStr.indexOf(":")));
 		now.setMinutes(dStr.substr(dStr.indexOf(":")+1));
 		now.setSeconds(0);
 		return now;
	} else 
		return "Invalid Format";
}

function DeleteRecord() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var log = ss.getSheetByName("PillReminder"); 
  for(n=2;n<=log.getLastRow();++n){ 
    log.getRange(n,2).setValue('');
    log.getRange(n,4).setValue('');
  }
}

function CheckStatus() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var log = ss.getSheetByName("PillReminder"); 
  var inputTime;
  var currentTime;
  var diff;
  var timestamp;
  var ttime;
  var message;
  var payload;
  var options;
  var sendstatus;
  var threshold = 1*60*1000;
  var URL= 'https://appnode-demo-p528034trial.cfapps.eu10.hana.ondemand.com/webhook';
  var username = 'ferrygun@yahoo.com';
  var password = 'Papamama18';
  
  for(n=2;n<=log.getLastRow();++n){ 
 
    currentTime = new Date();
    inputTime = toDate(log.getRange(n,1).getDisplayValue(),"h:m");
    timestamp = log.getRange(n,2).getValue();
    message = log.getRange(n,3).getValue();
    
    payload = {
      "message" : message
    };
    
    var headers = {
      "Authorization" : "Basic " + Utilities.base64Encode(username + ':' + password)
    };
    
    options = {
      "method"  : "POST",
      "headers": headers,
      "payload" : payload,   
      "followRedirects" : true,
      "muteHttpExceptions": true
    };
    
    if (timestamp == '') {
        diff = Date.parse(currentTime) - Date.parse(inputTime)
        Logger.log(diff);
        if( diff > threshold) {
          log.getRange(n,4).setValue('y');
          UrlFetchApp.fetch(URL, options);
        }
        break;
    }
  }
}

function myFunction() {
  var URL= 'https://appnode-demo-p528034trial.cfapps.eu10.hana.ondemand.com/webhook';
  var username = 'ferrygun@yahoo.com';
  var password = 'Papamama18';
  
  var options;
    
  payload = {
      "message" : 'FD'
  };
  
  var headers = {
    "Authorization" : "Basic " + Utilities.base64Encode(username + ':' + password)
  };
  
  options = {
      "method"  : "POST",
      "headers": headers,
      "payload" : payload,   
      "followRedirects" : true,
      "muteHttpExceptions": true
    };
  
  var reponse = UrlFetchApp.fetch(URL, options);
  Logger.log(reponse);
}
