import axios from 'axios';

const KEY = 'a2dddf6f-7336-4a31-ba5a-be34ef9f9736';

async function getBreedByName(numLimit, nameBreedId) {
  try {
    axios.defaults.headers.common['x-api-key'] = KEY; // Replace this with your API Key

    let response = await axios.get('https://api.thecatapi.com/v1/images/search', {
      // params: { limit: `${numLimit}`, page: `${numPage}`, q: sib },
      params: { limit: `${numLimit}`, breed_ids: `${nameBreedId}`, size: 'full' },
    }); // Ask for 1 Image, at full resolution'beng'
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function getDataListBreeds() {
  try {
    axios.defaults.headers.common['x-api-key'] = KEY; // Replace this with your API Key
    // https://api.thecatapi.com/v1/breeds/search?q=sib
    let response = await axios.get('https://api.thecatapi.com/v1/breeds', {
      // params: { limit: 5, size: 'full' },
    }); // Ask for 1 Image, at full resolution

    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function getBreeds(numLimit, numPage) {
  try {
    axios.defaults.headers.common['x-api-key'] = KEY; // Replace this with your API Key, as it's set to defaults it will be used from now onwards

    let response = await axios.get('https://api.thecatapi.com/v1/breeds/', {
      params: { limit: `${numLimit}`, size: 'full', page: `${numPage}` },
    });
    const breeds = response.data;
    return breeds;
  } catch (err) {
    console.log(err);
  }
}
// getBreeds(10);
export { getDataListBreeds, getBreeds, getBreedByName };
