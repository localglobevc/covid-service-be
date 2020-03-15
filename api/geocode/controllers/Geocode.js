'use strict';

const Client = require('@googlemaps/google-maps-services-js').Client;

module.exports = {
  geocode: async (ctx) => {
    try {
      const gclient = new Client({});
      const GOOGLE_KEY = 'AIzaSyCKWPdrtSrSefYwm9rNRzBuBWhseZTg7VU';

      const geocode = await gclient.geocode({params:{address: ctx.params.postcode, key: GOOGLE_KEY}});

      const {
        short_name: neighbourhood
      } = geocode.data.results[0].address_components.find(result => result.types[0] === 'neighborhood');

      const {
        short_name: postcode
      } = geocode.data.results[0].address_components.find(result => result.types[0] === 'postal_code');

      ctx.body = {
        neighbourhood,
        postcode
      };
    } catch (e) {
      ctx.body = {error: 'Postcode not found'};
    }
  }
};
