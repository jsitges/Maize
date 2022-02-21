function doGet(e) {
 
  if (e.parameters.v == "form"){
  return loadForm();
  }
  else{
    return loadPrint();
  }
}

function loadForm() {
  var url = 'https://docs.google.com/spreadsheets/d/1PpJKjAVj_bnbckG_PvFzoNvcbD6Bq19TQOYe1tOEFKE/edit#gid=1603846568'; 
  var ss= SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("BASES");
  var list = ws.getRange(2,5,ws.getRange("E2").getDataRegion().getLastRow(),1).getValues();
  var template = HtmlService.createTemplateFromFile('WebApp');   
  template.list = list.map(function(o){return '<option>'+o[0]+'</option>'; }).
                  filter(function(o){return o !== "<option></option>" }).
                  join('');

  return template.evaluate().setTitle('GRANOS').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function loadPrint() {
  try {
    LockService.getScriptLock().waitLock(15000);
    var url = 'https://docs.google.com/spreadsheets/d/1PpJKjAVj_bnbckG_PvFzoNvcbD6Bq19TQOYe1tOEFKE/edit#gid=1603846568'; 
    var ss= SpreadsheetApp.openByUrl(url);
    var ws = ss.getSheetByName("GRANOS");
    var info = ws.getRange(2,4,2,6).getDisplayValues();
    var printTemplate = HtmlService.createTemplateFromFile('Print'); 
    printTemplate.info = info.map(function(o){return '<td>'+o[0]+'</td>'; });
    LockService.getScriptLock().releaseLock();
} catch (e) {Logger.log('Could not obtain lock after 10 seconds.');}
  
  return printTemplate.evaluate().setTitle('NOTA').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}




