import { GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from 'querystring';
import { getSelectedMeetup, getMeetups } from "../../mongo/meetupsCollection";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MeetupInterface } from "../../interfaces/MeetupInterface";

interface PageProps {
  meetupData: MeetupInterface;
}

interface IParams extends ParsedUrlQuery {
    meetupId: string
}

function MeetupDetails({ meetupData }: PageProps) {
  return (
    <MeetupDetail
      image={meetupData.image}
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  //api call to get all ids
  const meetups = await getMeetups();
  return {
    fallback: "blocking", //supported ids are all covered in the paths.
    paths: meetups.map(meetup => ({
      params: { meetupId: meetup._id.toString() }
    }))
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  //fetch data for a single meetup
  const { meetupId } = context.params as IParams;
  const selectedMeetup = await getSelectedMeetup(meetupId);
  return {
    props: {
      meetupData: {
        id: selectedMeetup? selectedMeetup._id.toString(): '',
        title: selectedMeetup ? selectedMeetup.address : '',
        image: selectedMeetup ? selectedMeetup.image : '',
        description: selectedMeetup ? selectedMeetup.description : ''
      }
    }
  };
}

export default MeetupDetails;
