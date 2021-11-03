"use strict";

const express = require('express');
const axios = require('axios');
const request = require("request-promise")
const cheerio = require("cheerio")
const fs = require("fs")
const json2csv = require("json2csv").Parser;

const router = express.Router();

router.post('/jooble', function(req, res){

  class getData {
      constructor() {
          this.jooble();
      }
  
      async jooble() {
          try {
  
              let job = req.body.namesda;
              let location = req.body.locationss;
              let JoobleUrl = `https://jooble.org/SearchResult?rgns=${location}&ukw=${job}`;

  
              axios.get(JoobleUrl)
              .then((joobleDatas) => {
  
                  let $ = cheerio.load(joobleDatas.data);
  
                  let JoobleList = [];
                  $('article._2caa5').each(function(i, elem) {
                      JoobleList[i] = {
                          title: $(this).find('span._1b9db').text(),
                          description: $(this).find('div._10840').text(),
                          EmployerLocation: $(this).find('div.d7cb2').text(),
                          link: $(this).find('a._3c619').attr('href'),
                      }      
                  });

                  res.render('joobleList', {
                      JoobleLists: JoobleList
                  });

                  const devtoListTrimmed = JoobleList.filter(n => n != undefined )
                  fs.writeFile('./data/jooble/jooble.json', JSON.stringify(devtoListTrimmed, null, 4), (err)=> console.log('File successfully written!'))

                  const j2cp = new json2csv()
                  const csv = j2cp.parse(JoobleList);
                  fs.writeFileSync('./data/jooble/jooble.csv', csv, "utf-8")
                                
              })
  
          } catch (error) {
              console.error(error);
          }
      }
      
  }
  
  new getData();

});

router.post('/indeed', function(req, res){
     
 class indeedData {
    constructor() {
        this.pageOneIndeed();
    }

    async pageOneIndeed() {
        try {

            let job = req.body.namesda;
            let location = req.body.locationss;
            let country = req.body.countryss;
            let JoobleUrl = `https://${country}indeed.com/jobs?q=${job}&l=${location}&start=0`;

            axios.get(JoobleUrl)
            .then((joobleDatas) => {

                let $ = cheerio.load(joobleDatas.data);

                let JoobleList = [];
                $('a.sponTapItem').each(function(i, elem) {
                    JoobleList[i] = {
                        title: $(this).find('h2.jobTitle').text(),
                        company: $(this).find('span.companyName').text(),
                        description: $(this).find('div.job-snippet').text(),
                        link: `https://${country}indeed.com` + $(this).find('a').attr('href'),
                    }      
                });

                res.render('indeedList', {
                    JoobleLists: JoobleList
                });

                const devtoListTrimmed = JoobleList.filter(n => n != undefined )
                fs.writeFile('./data/indeed/indeed.json', JSON.stringify(devtoListTrimmed, null, 4), (err)=> console.log('File successfully written!'))

                const j2cp = new json2csv()
                const csv = j2cp.parse(JoobleList);
                fs.writeFileSync('./data/indeed/indeed.csv', csv, "utf-8")
                              
            })

        } catch (error) {
            console.error(error);
        }
    }
    
}

new indeedData();

});

router.get('/downloadJsonJoble', (req, res, next) => {
  res.download('./data/jooble/jooble.json');
  res.status(200);
});

router.get('/downloadCsvJoble', (req, res, next) => {
  res.download('./data/jooble/jooble.csv');
  res.status(200);
});

router.get('/downloadJsonIndeed', (req, res, next) => {
  res.download('./data/indeed/indeed.json');
  res.status(200);
});

router.get('/downloadCsvIndeed', (req, res, next) => {
  res.download('./data/indeed/indeed.csv');
  res.status(200);
});

router.post('/test', (req, res) => {
  // Insert Login Code Here
  let job = req.body.namesda
  let location = req.body.locationss
  let url = `https://jooble.org/SearchResult?rgns=${location}&ukw=${job}`;
  res.send(`url: ${url}`);
});


module.exports = router;