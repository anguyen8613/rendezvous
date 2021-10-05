import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";
import { PageProps } from "../../interfaces/PageProps";

function MeetupList(props: PageProps) {
  return (
    <ul className={classes.list}>
      {props.meetups.map(meetup => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          description={meetup.description}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
