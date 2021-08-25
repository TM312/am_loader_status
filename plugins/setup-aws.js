import { createApi } from '../utils/aws';


const setupAws = (context, inject) => {
    inject('aws', createApi(context));
};

export default setupAws;