import { Navigate, useNavigate } from "react-router-dom";
import { useStorage } from "../../util-hooks/useStorage";
import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

export default function NewMeetupForm() {
  const { addMeetup } = useStorage();
  let navigate = useNavigate();
  function submitHandler(event) {
    event.preventDefault();
    const fields = new FormData(event.target);

    const meetupData = {
      title: fields.get("title"),
      image: fields.get("image"),
      address: fields.get("address"),
      description: fields.get("description"),
    };

    addMeetup(meetupData);
    navigate("/all-meetups");
    event.target.reset();
  }
  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required id="title" name="title" />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="url" required id="image" name="image" />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" name="address" />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            name="description"
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}
