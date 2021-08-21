const request=require("request-promise");
const cheerio=require("cheerio");
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const data = fs.readFileSync('data.csv')
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line
    .map(e => e.split(',').map(e => e.trim())); // split each line to array


const register = fs.readFileSync('register2.txt')
    .toString() // convert Buffer to string
    .trim()
    .split(' ') // split string to lines
    .map(e => e.trim()); // split each line to array


( async () =>  {
   
    await Promise.all(
    data.slice(0,50000).map((row,i) => {
    if(register.every(el => el !== row[0])){
        return request({ method: 'GET'
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=ae471440`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=8ecea15d`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=b9bd48a6`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=e54431d3`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=e927bb71`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=47203f8b`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=193ef3a`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=9c7e8dca`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=a0bcf344`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=da2a56d7`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=7410c07d`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=d73910fd`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=96792a97`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=e0b7bf94`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=2709942b`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=6d2e3336`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=837a1b8b`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=ff6766e3`
        , uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=3e5351f0`
        , gzip: true
        ,  headers: {
            'X-Requested-With': 'XMLHttpRequest' ,
            "Content-Type" : "application/json;charset=UTF-8"
            }
            ,resolveWithFullResponse: true
        }).then(response => {
            
            if(response.statusCode == 200){
                
                var reslt = JSON.parse(response.body);
                
                fs.appendFile('output.csv', row[0]+",["+reslt.Director+"],["+reslt.Actors+"],["+reslt.Language+"],["+reslt.Country+"],\n", function (err) {
                    if (err) {
                      console.log(err);
                    } else {
                        console.log(`${row[0]} ...Done`);
                    }
                });

                fs.appendFile('register2.txt', row[0]+" ", function (err) {
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