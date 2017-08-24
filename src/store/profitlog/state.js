import {
  store
} from 'utils/';


export default {
  kwargs: store.get('kwargs') || {}
};