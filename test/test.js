"use strict";

const puppeteer = require('puppeteer');
const axios = require('axios');
const cheerio = require('cheerio');
const jsdom = require('jsdom');
const fs = require('fs');
const {JSDOM} = jsdom;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

class getData {
    constructor() {
        this.jooble();
        this.Indeed();
        this.glassDoor();
        this.linkedin();
        this.wholeData();
    }

    async jooble() {
        try {

            const job = 'software engineer'
            const location = 'Alabama'
            const url = `https://jooble.org/SearchResult?rgns=${location}&ukw=${job}`;

            axios.get(url)
            .then((response) => {

                let $ = cheerio.load(response.data);

                let devtoList = [];
                $('article._2caa5').each(function(i, elem) {
                    devtoList[i] = {
                        title: $(this).find('span._1b9db').text(),
                        description: $(this).find('div._10840').text(),
                        EmployerLocation: $(this).find('div.d7cb2').text(),
                        link: $(this).find('a._3c619').attr('href'),
                    }      
                });
                const devtoListTrimmed = devtoList.filter(n => n != undefined )
                fs.writeFile('./data/jooble.json', 
                              JSON.stringify(devtoListTrimmed, null, 4), 
                              (err)=> console.log('File successfully written!'))

                console.log(devtoList);
    
            })

        } catch (error) {
            console.error(error);
        }
    }

    async Indeed() {
        try {

        } catch (error) {
            console.error(error);
        }
    }

    async glassDoor() {
        try {

        } catch (error) {
            console.error(error);
        }
    }

    async linkedin() {
        try {

        } catch (error) {
            console.error(error);
        }
    }

    async wholeData() {
        try {

        } catch (error) {
            console.error(error);
        }
    }
}


new getData();