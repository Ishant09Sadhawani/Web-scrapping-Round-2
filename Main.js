var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape data for Patna colleges
  url = 'https://collegedunia.com/btech/anand-colleges';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var Summary, Course, Eligibility, Fees;
      var json = { Summary : "", Course : "", Eligibilty : "", Fees : ""};

      $('.title_wrapper').filter(function(){
        var data = $(this);
        Summary = data.children().first().text().trim();
        Course = data.children().last().children().last().text().trim();
        Eligibility = data.children().first().text().trim();
        Fees =  data.children().last().children().last().text().trim();



        json.Summary = Summary;
        json.Course= Course;
        json.Eligibilty = Eligibility;
        json.Fees = Fees
      })

      $('.FeesValue').filter(function(){
        var data = $(this);
        Fees = data.text().trim();

        json.Fees = Fees;
      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.listen('5500')
console.log('Magic happens on port 5500');
exports = module.exports = app;
