const request=require("request-promise");
const cheerio=require("cheerio");
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const data = fs.readFileSync('data.csv')
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line
    .map(e => e.split(',').map(e => e.trim())); // split each line to array


( async () =>  {
    var dataList = [];

    for(let i=0; i<data.length; i++ ){

        var uri = `https://www.imdb.com/title/${data[i][0]}`;

        var options={ method: 'GET'
        , uri
        , gzip: true
        ,  headers: {
            'X-Requested-With': 'XMLHttpRequest' ,
            "Content-Type" : "application/json;charset=UTF-8"
            }
            ,resolveWithFullResponse: true
        };
        
        const response = await request(options);
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
                
                console.log(`${i} / ${data.length}...Done`);

                dataList.push({numero: i, id: data[i][0], director, actors: actors.toString(), language: languages.toString(), country: countrys.toString()});
            }
    }


    const csvWriter = createCsvWriter({
        path: 'file.csv',
        header: [
            {id: 'numero', title: 'numero'},
            {id: 'id', title: 'ID'},
            {id: 'director', title: 'director'},
            {id: 'actors', title: 'actors'},
            {id: 'language', title: 'language'},
            {id: 'country', title: 'country'},
        ]
    });

    csvWriter.writeRecords(dataList)       // returns a promise
    .then(() => {
        console.log('...Done');
    });

} )()