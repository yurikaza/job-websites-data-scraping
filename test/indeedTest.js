"use strict";

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const json2csv = require("json2csv").Parser;


class getData {
    constructor() {
        this.pageOne();
        this.pageTwo();
        this.pageThree();
    }

    async pageOne() {
        try {

            
            
            //let job = req.body.namesda;
            //let location = req.body.locationss;
            //let country = req.body.countryss;
            let job = 'software engineer';
            let location = 'Seoul';
            let country = 'kr';
            let JoobleUrl = `https://${country}.indeed.com/%EC%B7%A8%EC%97%85?q=${job}&l=${location}&start=0`;

            axios.get(JoobleUrl)
            .then((joobleDatas) => {

                let $ = cheerio.load(joobleDatas.data);

                let JoobleList = [];
                $('a.sponTapItem').each(function(i, elem) {
                    JoobleList[i] = {
                        title: $(this).find('h2.jobTitle').text(),
                        company: $(this).find('span.companyName').text(),
                        description: $(this).find('div.job-snippet').text(),
                        link: `https://${country}.indeed.com` + $(this).find('a').attr('href'),
                    }      
                });

                const devtoListTrimmed = JoobleList.filter(n => n != undefined )
                fs.writeFile('./data/test/indeed-page-One.json', JSON.stringify(devtoListTrimmed, null, 4), (err)=> console.log('File successfully written!'))

                const j2cp = new json2csv()
                const csv = j2cp.parse(JoobleList);
                fs.writeFileSync('./data/test/indeed-page-One.csv', csv, "utf-8")
                              
            })

        } catch (error) {
            console.error(error);
        }
    }

    async pageTwo() {
        try {

            
            
            //let job = req.body.namesda;
            //let location = req.body.locationss;
            //let country = req.body.countryss;
            let job = 'software engineer';
            let location = 'Seoul';
            let country = 'kr';
            let JoobleUrl = `https://${country}.indeed.com/%EC%B7%A8%EC%97%85?q=${job}&l=${location}&start=10`;

            axios.get(JoobleUrl)
            .then((joobleDatas) => {

                let $ = cheerio.load(joobleDatas.data);

                let JoobleList = [];
                $('a.sponTapItem').each(function(i, elem) {
                    JoobleList[i] = {
                        title: $(this).find('h2.jobTitle').text(),
                        company: $(this).find('span.companyName').text(),
                        description: $(this).find('div.job-snippet').text(),
                        link: `https://${country}.indeed.com` + $(this).find('a').attr('href'),
                    }      
                });

                const devtoListTrimmed = JoobleList.filter(n => n != undefined )
                fs.writeFile('./data/test/indeed-page-Two.json', JSON.stringify(devtoListTrimmed, null, 4), (err)=> console.log('File successfully written!'))

                const j2cp = new json2csv()
                const csv = j2cp.parse(JoobleList);
                fs.writeFileSync('./data/test/indeed-page-Two.csv', csv, "utf-8")
                              
            })

        } catch (error) {
            console.error(error);
        }
    }

    async pageThree() {
        try {

            
            
            //let job = req.body.namesda;
            //let location = req.body.locationss;
            //let country = req.body.countryss;
            let job = 'software engineer';
            let location = 'Seoul';
            let country = 'kr';
            let JoobleUrl = `https://${country}.indeed.com/%EC%B7%A8%EC%97%85?q=${job}&l=${location}&start=20`;

            axios.get(JoobleUrl)
            .then((joobleDatas) => {

                let $ = cheerio.load(joobleDatas.data);

                let JoobleList = [];
                $('a.sponTapItem').each(function(i, elem) {
                    JoobleList[i] = {
                        title: $(this).find('h2.jobTitle').text(),
                        company: $(this).find('span.companyName').text(),
                        description: $(this).find('div.job-snippet').text(),
                        link: `https://${country}.indeed.com` + $(this).find('a').attr('href'),
                    }      
                });

                const devtoListTrimmed = JoobleList.filter(n => n != undefined )
                fs.writeFile('./data/test/indeed-page-Three.json', JSON.stringify(devtoListTrimmed, null, 4), (err)=> console.log('File successfully written!'))

                const j2cp = new json2csv()
                const csv = j2cp.parse(JoobleList);
                fs.writeFileSync('./data/test/indeed-page-Three.csv', csv, "utf-8")
                              
            })

        } catch (error) {
            console.error(error);
        }
    }
    
}

new getData();