const axios = require('axios').default;


        
export default class ApiService { 
    constructor() { 
        this.searchForm = "";
        this.page = 1;
    }

    async fetchImg() {

    const options = {
    key: '30076608-453b15a34a4d23543af1b2a78',
    q: this.searchForm,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    page: this.page,
    per_page: "40",
    }


    const response = await axios.get(`https://pixabay.com/api/?key=${options.key}&q=${options.q}&image_type=${options.image_type}&orientation=${options.orientation}&safesearch=${options.safesearch}&page=${options.page}&per_page=${options.per_page}`);
    console.log(response);
    return response;

        
    // return fetch(`https://pixabay.com/api/?key=${options.key}&q=${options.q}&image_type=${options.image_type}&orientation=${options.orientation}&safesearch=${options.safesearch}&page=${options.page}&per_page=${options.per_page}`)
    //     .then(response => response.json())
    //     .then((data) => { 
        
    //     this.page += 1;
    //         // console.log(data);
    //         // console.log(data.hits);
    //     return data;
    //     })
    }

    resetPage() { 
        this.page = 1;
    }

    get value() { 
        return this.searchForm;
    }
    set value(newValue){ 
        this.searchForm = newValue;
    }
}   

