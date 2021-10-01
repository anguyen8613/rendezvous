
import Head from 'next/head';
import {getMeetups} from '../mongo/meetupsCollection';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
	{
		id: 'm1',
		title: 'A First Meetup',
		image: 'https://griffithobservatory.org/wp-content/uploads/2021/03/cameron-venti-c5GkEd-j5vI-unsplash_noCautionTape-1600x800.jpg',
		address: 'Some address 4, 23434 Some City',
		description: 'This is a first Meetup!'
	},
	{
		id: 'm2',
		title: 'A second Meetup',
		image: 'https://griffithobservatory.org/wp-content/uploads/2021/03/cameron-venti-c5GkEd-j5vI-unsplash_noCautionTape-1600x800.jpg',
		address: 'Some address 4, 23434 Some City',
		description: 'This is a second Meetup!'
	}

]


function HomePage(props){
	return(
		<>
			<Head>
				<title>Rendezvous</title>
				<metadata charset='UTF-8'/>
				<metadata name='description' content='Rendezvous With Friends!'/>
				<metadata name='keywords' content='meetup, location, next.js, mongodb, react'/>
				<metadata name='author' content='Alvin Nguyen'/>
			</Head>
			<MeetupList meetups={props.meetups}/>
		</>
	)
}

// only use when the data changes multiple time a second
// export async function getServerSideProps(context){
// 	const req = context.req;
// 	const res = context.res;
// 	//fetch data from api
// 	return{
// 		props: {
// 			meetups: DUMMY_MEETUPS
// 		}
// 	}
// }

export async function getStaticProps(context){
	const req = context.req;
	const res = context.res;
	//fetch('/api/meetups'); only need to use this if the api is outside our database. (some other site)

	const meetups = await getMeetups();
	
	return{
		props: {
			meetups: meetups.map(meetup => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString()
			}))
		},
		revalidate: 1 
	}
}

export default HomePage;