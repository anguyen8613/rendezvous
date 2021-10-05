import { useRef } from "react";
import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

function NewMeetupForm({
  onAddMeetup
}: {
  onAddMeetup: (
    meetupData: {
      title: string;
      image: string;
      address: string;
      description: string;
    }
  ) => void;
}) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  function submitHandler(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredTitle =
      titleInputRef && titleInputRef.current
        ? titleInputRef.current.value
        : "default title";
    const enteredImage =
      imageInputRef && imageInputRef.current
        ? imageInputRef.current.value
        : "default image";
    const enteredAddress =
      addressInputRef && addressInputRef.current
        ? addressInputRef.current.value
        : "default addres";
    const enteredDescription =
      descriptionInputRef && descriptionInputRef.current
        ? descriptionInputRef.current.value
        : "default description";

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription
    };

    onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows={5}
            ref={descriptionInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
