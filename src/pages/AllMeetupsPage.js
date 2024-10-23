import MeetupItem from "../components/meetups/MeetupItem";
import { useFetch } from "../util-hooks/useFetch";
import { useStorage } from "../util-hooks/useStorage";
import classes from "./../components/meetups/MeetupList.module.css";

export default function AllMeetupsPage() {

  const { meetups } = useStorage();

 if (meetups.length === 0) {
    return <p>No meetups found. Create a new one!</p>;
 }

  return (
    <section>
      <h1>All Meetups</h1>
      <ul className={classes.list}>
        {meetups.map((meetup) => (
          <MeetupItem key={meetup.id} data={meetup} />
        ))}
      </ul>
    </section>
  );
}
