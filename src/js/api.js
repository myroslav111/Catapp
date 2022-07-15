import Notiflix from 'notiflix';
import axios from 'axios';

const KEY = 'a2dddf6f-7336-4a31-ba5a-be34ef9f9736';

// async function getData() {
//   try {
//     axios.defaults.headers.common['x-api-key'] = KEY; // Replace this with your API Key

//     let response = await axios.get('https://api.thecatapi.com/v1/images/search', {
//       params: { limit: 1, size: 'full' },
//     }); // Ask for 1 Image, at full resolution

//     console.log(response.data);
//   } catch (err) {
//     console.log(err);
//   }
// }
// getData();

async function getData() {
  try {
    axios.defaults.headers.common['x-api-key'] = KEY; // Replace this with your API Key
    // https://api.thecatapi.com/v1/breeds/search?q=sib
    let response = await axios.get('https://api.thecatapi.com/v1/breeds', {
      // params: { limit: 5, size: 'full' },
    }); // Ask for 1 Image, at full resolution

    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
}
// getData();

async function getBreeds(numLimit, numPage) {
  try {
    axios.defaults.headers.common['x-api-key'] = KEY; // Replace this with your API Key, as it's set to defaults it will be used from now onwards

    let response = await axios.get('https://api.thecatapi.com/v1/breeds/', {
      params: { limit: `${numLimit}`, size: 'full', page: `${numPage}` },
    });
    const breeds = response.data;
    // console.log('-- (' + breeds.length + ') Breeds from TheCatAPI.com');
    // console.log(response);

    // pick one to display initially
    // this.selected_breed = this.breeds[10];
    return breeds;
  } catch (err) {
    console.log(err);
  }
}
// getBreeds(10);
export { getData, getBreeds };
