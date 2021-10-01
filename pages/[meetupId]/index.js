
import {getSelectedMeetup, getMeetups} from '../../mongo/meetupsCollection';
import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails({meetupData}){
	return(
		<MeetupDetail 
			image= {meetupData.image}
			title={meetupData.title}
			address={meetupData.address}
			description={meetupData.description}
		/>
	)
}

export async function getStaticPaths(){
	//api call to get all ids
	const meetups = await getMeetups();
	return{
		fallback: 'blocking', //supported ids are all covered in the paths.  
		paths: meetups.map(meetup => ({params:{meetupId: meetup._id.toString()}}))
	}
}

export async function getStaticProps(context){
	//fetch data for a single meetup
	const meetupId = context.params.meetupId;
	const selectedMeetup = await getSelectedMeetup(meetupId);
	return{
		props:{
			meetupData:{
				id:selectedMeetup._id.toString(),
				title: selectedMeetup.address,
				image: selectedMeetup.image,
				description: selectedMeetup.description
			}
		}
	}
}

export default MeetupDetails;