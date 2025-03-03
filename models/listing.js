const { ref } = require("joi");
const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const Review= require("./review.js");

const listingSchema=new Schema({
    title:{
        type: String,
        required: true,
    },
    description: String,
    image:{
        type: String,
        // filename: String,
        // url: String,
        //default: "https://unsplash.com/photos/a-lake-surrounded-by-mountains-and-trees-under-a-blue-sky-jV8916l2k0I",
        //set: (v)=> v==="" ? "https://unsplash.com/photos/a-lake-surrounded-by-mountains-and-trees-under-a-blue-sky-jV8916l2k0I" :v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}})
    }
});

//create model
const Listing=mongoose.model("Listing", listingSchema);
module.exports=Listing;