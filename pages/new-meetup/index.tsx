import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { MeetupInterface } from "../../interfaces/MeetupInterface";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData: {
    title: string;
    image: string;
    address: string;
    description: string;
  }) {
    //using fetch api. In this case we can also call mongo directly since we own the db.
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    console.log(data);
    router.push("/");
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}

export default NewMeetupPage;
