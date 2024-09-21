const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3000;


app.get('/ping', function (req, res) {
    res.send('Hello World')
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

app.get('/scrape', async (req, res) => {
    try {
        // URL que quieres scrapeear
        const url = 'https://tramites.copnia.gov.co/Copnia_Microsite/RequestStatus/GetRequestInfo?key=9883656&documentNumber=1017256539';
        const { data } = await axios.get(url);

        const $ = cheerio.load(data);

        let text = $('[class="form-control text-box single-line"]').attr('value');
        //text = "HOLA";

        res.json({
            success: true,
            titles: text,
            status: text == "Caso en trámite" ? false : true
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al scrapeear la página',
            error: error.message,
        });
    }
});