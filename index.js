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


const keys = ['ae471440','8ecea15d','b9bd48a6','e54431d3','47203f8b','193ef3a','9c7e8dca','a0bcf344',
'da2a56d7', '7410c07d', 'd73910fd', '96792a97', 'e0b7bf94', '2709942b', '6d2e3336', '837a1b8b', 'ff6766e3', 
'3fb5f5bd', '87c1b8b2', 'ea376380', '2dd0dbee', '4d1be897', '2599746f', '92087764', 'd4a899e2', '97cd5b44', 
'4eb286e7', 'd3422035'];


( async () =>  {
   
    var s = 297478;

    while(s < 340000 ){
    await Promise.all(
    data.slice(s,s+=200).map((row,i) => {
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
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=3fb5f5bd`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=87c1b8b2`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=ea376380`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=2dd0dbee`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=4d1be897`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=2599746f`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=92087764`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=d4a899e2`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=97cd5b44`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=4eb286e7`
        //, uri: `http://www.omdbapi.com/?i=${row[0]}&plot=full&apikey=d3422035`
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

        }).catch(err => { console.log(err.message);});
    } else {
        return console.log(`${row[0]} is already scraped !`);
    }
    })).then( values => {
        console.log(values.length,'...Done');
    }).catch(err => console.log(err.message));
    }

} )()