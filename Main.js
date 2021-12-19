const puppeteer = require("puppeteer");
const fs = require('fs');
const path = require("path"); 
const xlsx = require('xlsx');
const link = 'https://collegedunia.com/';
const link1 = 'https://collegedunia.com/btech-courses';
// let searchQuery = ['Software Engineer', 'India']; // query to search on site

let page;
(async function fn(){
    let browser = await puppeteer.launch({
        headless:false, defaultViewport: null,
        args: ["--start-maximized", "--disable-notifications","--enable-popup-blocking"]
    });
    page = await browser.newPage();
    console.log("Opened new Page");
    // to close pop-up windows
    browser.on('targetcreated', async (target) => { 
          if (target.type() === 'page') {              
                 const page = await target.page();      
                 const url = page.url();                
                 if (url.search(link) == -1){     
                          await page.close();           
                          }
          }
        });
    await page.goto(link);
//     await page.waitForSelector("input[id='qsb-keyword-sugg']", {visible:true});
//     await page.type("input[id='qsb-keyword-sugg']", searchQuery[0], {delay:20});
//     await page.type("input[id='qsb-location-sugg']", searchQuery[1], {delay:20});
    // await page.click(".jsx-3851299306.country-dropdown-head");
    //  await page.waitFor(2000);
    //  let arr= await page.$$('.jsx-1016423636.exam_card');
    // // await page.goto(link1);
     await page.click(".search-bar");
     page.waitFor(200)    // // // await page.waitForSelector();
    // // // {delay:200}
    // // await page.type({delay:200},".search-bar", "Anand");
    // // await page.delay(2000);
    // let arr= await page.$$('.jsx-2722606122.col.text-new.font-weight-bold.text-capitalize');
    // console.log(arr.length)
    //   await page.waitFor(20);
    //  await page.click(arr[1]._remoteObject.description);
    // console.log(arr[1]._remoteObject.description);
    await page.type(".search-bar", "anand",{delay:200});
     await page.waitFor(200);
    let arr= await page.$$('.jsx-2722606122.col.text-new.font-weight-bold.text-capitalize');
    console.log(arr.length)
     await page.click(arr[13]._remoteObject.description);
    // await page.waitFor(2000);
    // await page.click(".jsx-2722606122.col.text-new.font-weight-bold.text-capitalize");
    // jsx-2722606122 col text-new font-weight-bold text-capitalize
    // let links = "https://collegedunia.com/anand/degree-colleges";
    //     await page.goto(links);
    // elHandleArray.map(async el => {
    // await el.click()
    // })
    // await page.click(".slick-slide.slick-active.slick-current");

//     await page.waitForSelector(".fleft.pages>a[href]",{visible:true});
//     // to get first 10 pages link 
//     let hrefs = await page.evaluate(
//         () => Array.from(
//             document.querySelectorAll('.fleft.pages>a[href]'),
//             a => a.getAttribute('href')
//         )
//     );
//     console.log(hrefs);
//     let dirPath = path.join(__dirname, 'Jobs')
//     dirCreator(dirPath);
//     let jobType = searchQuery[0];
//     let filePath = path.join(dirPath, jobType+'.xlsx');

//     for(let i=0;i<hrefs.length;i++){
//         await page.goto(link+hrefs[i]);
//         // await page.goto(link);
//         // await page.waitFor(10000);
//         // await waitAndClick("span[id='block']", page);
//         await page.waitForSelector(".jobTupleHeader .title.fw500.ellipsis", {visible:true});
//         let jobTitileArr = await page.$$(".jobTupleHeader .title.fw500.ellipsis");
//         console.log(jobTitileArr.length);
//         let companyArr = await page.$$('.subTitle.ellipsis.fleft');
//         console.log(companyArr.length);
//         let expPayLocArr = await page.$$(".ellipsis.fleft.fs12.lh16");
//         console.log(expPayLocArr.length);
//         await page.waitForSelector(".tags.has-description", {visible:true});
//         let skillsArr = await page.$$(".tags.has-description");
//         console.log(skillsArr.length);

//         let jobInfo = excelReader(filePath, jobType);
//         for(let i=0;i<jobTitileArr.length;i++){
//             let jobdesc = await page.evaluate(getJobDesc, jobTitileArr[i], companyArr[i], expPayLocArr[i*3], expPayLocArr[i*3+1], 
//                 expPayLocArr[i*3+2], skillsArr[i]);
            
//             jobInfo.push(jobdesc);
//         }
        
//         let size = jobTitileArr.length;
//         console.log(`Page ${i+1}:\n\n`, jobInfo.slice(i*size, i*size+size));
//         console.log("`````````````````````````````````````");
//         // creating excel files to store info
//         excelWriter(filePath, jobInfo, jobType);
//     }

//     // await waitAndClick("a.fright.fs14.btn-secondary.br2", page);
//     // let links = await page.$$('.fleft.pages>a[href]');
//     // for(let i=0;i<links.length;i++){
//     //     console.log(links[i].getAttribute('href'));
//     // }

//     // for(let i=1;i<hrefs.length;i++){
//     //     let nextPageLink = link+hrefs[i];
//     //     await Promise.all([
//     //         page.waitForNavigation(),
//     //         page.click(nextPageLink)
//     //     ]);
//     // }

    // await browser.close();
})();


// // function createExcelFile(jobdesc, jobType){
// //     let filePath = path.join(dirPath, jobType+'.xlsx');
// //     excelWriter(filePath, jobdesc, jobType);
// // }


// function dirCreator(filePath){
//     if(!fs.existsSync(filePath)){
//         fs.mkdirSync(filePath);
//     }
// }

// function excelWriter(filePath, json, sheetName){
//     // new worksheet
//     let newWB = xlsx.utils.book_new();
//     // json data -> excel format convert
//     let newWS = xlsx.utils.json_to_sheet(json);
//     // -> newWB, WS, sheetname
//     xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
//     // filePath
//     xlsx.writeFile(newWB, filePath);
// }

// function excelReader(filePath, sheetName){
//     if(!fs.existsSync(filePath)){
//         return [];
//     }
//     // workbook get
//     let wb = xlsx.readFile(filePath);
//     // sheet get
//     let excelData = wb.Sheets[sheetName];
//     // sheet data get
//     let ans = xlsx.utils.sheet_to_json(excelData);
//     return ans;
// }

// function getJobDesc(element1, element2, element3, element4, element5, element6){
//     return {
//         Title: element1.textContent.trim(),
//         Company: element2.textContent.trim(),
//         Experience: element3.textContent.trim(),
//         Pay: element4.textContent.trim(),
//         Location: element5.textContent.trim(),
//         Skills: element6.textContent.trim(),
//     }
// }


// function waitAndClick(selector, cPage) {
//     return new Promise(function (resolve, reject) {
//         let waitForModalPromise = cPage.waitForSelector(selector, { visible: true });
//         waitForModalPromise
//             .then(function () {
//                 let clickModal =
//                     cPage.click(selector, { delay: 100 });
//                 return clickModal;
//             }).then(function () {
//                 resolve();
//             }).catch(function (err) {
//                 reject(err)
//             })
//     }
//     )
// }
