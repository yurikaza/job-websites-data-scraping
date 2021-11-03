"use strict";

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
//const json2csv = require("json2csv").Parser;

class getData {

    constructor() {
        this.jooble();
    }

    async jooble() {
        try {
            
            const promises = [];

            var numbers = [0, 10, 20, 30, 40, 50];

            for (var i = 0; i < numbers.length; i++) {
                console.log(numbers[i]);

                let job = 'software engineer';
                let location = 'Seoul';
                let country = 'kr';

                axios({method: "get",url:`https://${country}.indeed.com/%EC%B7%A8%EC%97%85?q=${job}&l=${location}&start=${numbers[i]}`})
                .then(res => {

                    let $ = cheerio.load(res.data);

                    let JoobleList = [];
                    $('a.sponTapItem').each(function(i, elem) {
                        JoobleList[i] = {
                            title: $(this).find('h2.jobTitle').text(),
                            company: $(this).find('span.companyName').text(),
                            description: $(this).find('div.job-snippet').text(),
                            link: `https://${country}.indeed.com` + $(this).find('a').attr('href'),
                            func: function() {
                                return [this.title, this.company, this.description, this.link];
                              },
                        }      
                    });
                    const devtoListTrimmed = JoobleList.filter(n => n != undefined )
                    fs.writeFile('./data/test/indeed.json', JSON.stringify(devtoListTrimmed, null, 4), (err)=> console.log('File successfully written!'))
                   
                    /*
                    const j2cp = new json2csv()
                    const csv = j2cp.parse(JoobleList);
                    fs.writeFileSync('./data/test/indeed.csv', csv, "utf-8")*/
                })
            }

        } catch (error) {
            console.error(error);
        }

    }

}

new getData();