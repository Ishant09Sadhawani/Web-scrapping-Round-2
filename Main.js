const { title } = require("process");
const express = require('express');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const request = require('request');
const app = express();
let page;

const puppeteer = require("puppeteer");
(async function fn() {
    let browser = await puppeteer.launch({
        headless: false, defaultViewport: null,
        args: ["--start-maximized"],
    })
    page = await browser.newPage();
      await page.goto("https://www.wikipedia.org/");
     await page.click(".central-featured-lang.lang1")
    await page.click(".portal-hright.portal-vbot")
    
    await page.click('a[title="Wikipedia:Contents/A–Z index"]');
    
    await page.waitFor(1000);
      await page.click('a[title="Special:AllPages/I"]');
      await page.waitFor(1000);
      await page.click('a[title="I"]');
      let url = await page.url();
    //   console.log(url);
      request(url, function (error, response, html) {
        // console.error('error:', error); 
        file(html);
      });
      
      function file(html){
        const $ = cheerio.load(html);
        
        var obj = [];
        const data = $('.mw-parser-output h2');
        for(let i = 1;i<4;i++){
          var head = $(data[i]).text()
          // console.log(x) 
          var  desc = $(data[i]).nextUntil(data[i+1],"p,h3,ul").text();
          // console.log(p);
          obj.push({
            "HEADING":head,
            "DESCRIPTION":desc
          });
        }
        obj = JSON.stringify(obj);
        AppendDataToFile(obj);
      }
})()


  function AppendDataToFile(obj){
    let newWorkbook = xlsx.utils.book_new();
    var myJsonString = JSON.parse(obj);
    let newSheet = xlsx.utils.json_to_sheet(myJsonString);
    xlsx.utils.book_append_sheet(newWorkbook,newSheet,'sheet-1');
    xlsx.writeFile(newWorkbook,"I_Data.xlsx");
  }
