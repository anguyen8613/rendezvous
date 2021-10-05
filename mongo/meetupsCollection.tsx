import { MongoClient, ObjectId } from "mongodb";

export const getMeetups = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://alvin:admin@rendezvous.srupj.mongodb.net/rendezvous?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return meetups;
};

export const getSelectedMeetup = async (meetupId: string) => {
  const client = await MongoClient.connect(
    "mongodb+srv://alvin:admin@rendezvous.srupj.mongodb.net/rendezvous?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId)
  });
  client.close();
  return selectedMeetup;
};
