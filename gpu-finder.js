    const axios = require('axios');
    const cheerio = require('cheerio');
    const colors = require('colors');
    const open = require('open');

    const newegg = 'https://www.newegg.com/p/pl?N=100007709%20601357282%208000%204841%20601303642%20601303641&PageSize=96'
    const addToCart = 'https://secure.newegg.com/Shopping/AddtoCart.aspx?Submit=ADD&ItemList='
    
    //const newegg = 'https://www.newegg.com/p/pl?N=100006519%204814&PMSub=147%20381&SrchInDesc=ddr4&cm_sp=Tab_Components_6-_-visnav-_-DDR4_3'

    const amd = '';
    const NUM_SECONDS = 10;

    console.log("URL:  " + newegg);
    console.log("Calling every " + NUM_SECONDS + " seconds.");

    var interval = setInterval(function() {

      axios(newegg)
        .then(response => {

          const html = response.data;
          const $ = cheerio.load(html);     
         
          var div = $('div.item-container:contains("Add to cart")').text();

          var theDate = "[" + new Date().toLocaleTimeString() + "]";

          if (div.trim().length > 0) {
            var itemNumberBegin = div.indexOf('Item #:') + 8;
            var itemNumberEnd = div.indexOf('Return Policy:');
            var itemNumber = div.substring(itemNumberBegin, itemNumberEnd);
            open(newegg);
            open(addToCart + itemNumber);
            console.info(theDate.white + " -- FOUND".yellow);
            clearInterval(interval);
          } else {
            console.info(theDate.white + " -- NOT FOUND".yellow);
          }

        })
        .catch(console.error);

    }, NUM_SECONDS*1000);