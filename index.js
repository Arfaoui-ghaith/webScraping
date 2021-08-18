const request=require("request-promise");
const cheerio=require("cheerio");
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const data = fs.readFileSync('data.csv')
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line
    .map(e => e.split(',').map(e => e.trim())); // split each line to array


const register = fs.readFileSync('register.txt')
    .toString() // convert Buffer to string
    .trim()
    .split(' ') // split string to lines
    .map(e => e.trim()); // split each line to array



( async () =>  {
   
    await Promise.all(
    data.slice(2500,3000).map((row,i) => {
    if(register.every(el => el !== row[0])){
        return request({ method: 'GET'
        , uri: `https://www.imdb.com/title/${row[0]}`
        , gzip: true
        ,  headers: {
            'X-Requested-With': 'XMLHttpRequest' ,
            "Content-Type" : "application/json;charset=UTF-8"
            }
            ,resolveWithFullResponse: true
        }).then(response => {
            
            if(response.statusCode == 200){
                const $ = cheerio.load(response.body);
        
                const director = $('a[class="ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link"]').first().text();
                var actors = [];
                const actorsItems = $('a[data-testid="title-cast-item__actor"]').each((index, element) => {
                    actors.push($(element).text());
                });
                var languages = [];
                const languagesItems = $('li[data-testid="title-details-languages"]').find('div').find('ul').find('li').each((index, element) => {
                    languages.push($(element).find('a').text());
                });
        
                var countrys = [];
                const countrysItems = $('li[data-testid="title-details-origin"]').find('div').find('ul').find('li').each((index, element) => {
                    countrys.push($(element).find('a').text());
                });
                
                fs.appendFile('output.txt', i+"*"+row[0]+"*"+director+"*"+actors.toString()+"*"+languages.toString()+"*"+countrys.toString()+"####", function (err) {
                    if (err) {
                      console.log(err);
                    } else {
                        console.log(`${i} / 1000 ...Done`);
                    }
                });

                fs.appendFile('register.txt', row[0]+" ", function (err) {
                    if (err) {
                      console.log(err);
                    } else {
                        console.log(`${row[0]} ... Added to the Register`);
                    }
                });


                //return {numero: i, id: row[0], director, actors: actors.toString(), language: languages.toString(), country: countrys.toString()};
            }

        }).catch(err => console.log(err.message));
    } else {
        return console.log(`${row[0]} is already scraped !`);
    }
    })).then( values => {
        console.log(values.length,'...Done');
    }).catch(err => console.log(err.message));

} )()