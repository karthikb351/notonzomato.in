var Tabletop = require('tabletop');
var jsonfile = require('jsonfile');
var async = require('async');


var sheets = [
{
  name: "Bangalore",
  url: 'https://docs.google.com/spreadsheets/d/1r0TExc9AxJmI9sGDHV4Ufjm77yy2RVoxQaYKpIBjBNk/pubhtml',
  api: 'bangalore.json',
  sheetName: "Bangalore",
},
];

async.forEach(sheets, function (item, callback){

  function writeData(dataSet, tabletop) {
    var obj = {
      columns: tabletop.sheets(item.sheetName)['column_names'],
      rows: tabletop.sheets(item.sheetName).toArray()
    }
    var file = 'api/'+item.api;

    jsonfile.writeFileSync(file, obj)
    console.log('Saved: '+item.name);
    callback();
  }
  Tabletop.init( { key: item.url,
    callback: writeData,
    wanted: [item.sheetName],
    simpleSheet: false } )

  }, function(err) {
    console.log('Done');
  });  








