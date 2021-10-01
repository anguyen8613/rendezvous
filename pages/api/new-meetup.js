//.com/api.new-meetup
import {MongoClient} from 'mongodb';

//The api folder is only visible in the server
async function handler(req, res){

	if(req.method === 'POST'){
		try{
			const data = req.body;

			const {title, image, address, description} = data;

			const client = await MongoClient.connect('mongodb+srv://alvin:admin@rendezvous.srupj.mongodb.net/rendezvous?retryWrites=true&w=majority');
			const db = client.db();

			const meetupsCollection = db.collection('meetups');
			const result = await meetupsCollection.insertOne({title, image, address, description});

			client.close();

			res.status(201).json({message: ' Meetup inserted!'});
		
		}catch(e){
			console.log(e);
			res.status(400).json({message: ' Failed'});
		}
	}

}

export default handler;