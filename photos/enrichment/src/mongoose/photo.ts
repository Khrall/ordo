import * as mongoose from 'mongoose';

const uri: string = 'mongodb://localhost:27017/ordo';

mongoose.connect(uri, {useNewUrlParser: true}, (err: any) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('Succesfully Connected!');
    }
});

export interface IPhoto extends mongoose.Document {
    _id: string;
    name: string;
    hash: string;
    createdDate: Date;
    resized: boolean;
}

export const PhotoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    hash: {type: String, required: true},
    createdDate: {type: Date, required: true},
    resized: {type: Boolean, default: false}
});

const Photo = mongoose.model('Photo', PhotoSchema);
export default Photo;
