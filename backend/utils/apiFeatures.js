class ApiFeatures {
    constructor(query, querystr) {
        this.query = query
        this.querystr = querystr
    }
    search() {
        // console.log("search", this.querystr.keyword)
        const keyword = this.querystr.keyword ? {
            
            name: {
                $regex: this.querystr.keyword,
                $options: "i"
            }
        } : {}
        this.query = this.query.find({ ...keyword })
        return this;

    }
    filter() {
        const queryCopy = { ...this.querystr }
        //removing some feilds for  
        const removeFeilds = ["keyword", "page", "limit"];

        removeFeilds.forEach(key => delete queryCopy[key])

        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)
        this.query = this.query.find(JSON.parse(queryStr))
        return this
    }
    pagination(resultPerPage) {
        // console.log( this.querystr ,'asda');

        const currentPage = Number(this.querystr.page) || 1;
        console.log(currentPage , 'asda');
        const skip = resultPerPage * (currentPage - 1)
        this.query = this.query.limit(resultPerPage).skip(skip)
        return this


    }
}
module.exports = ApiFeatures