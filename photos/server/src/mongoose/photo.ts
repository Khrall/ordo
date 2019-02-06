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
    name: string;
    hash: string;
}

export const PhotoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    hash: {type: String, required: true},
});

const Photo = mongoose.model('Photo', PhotoSchema);
export default Photo;
