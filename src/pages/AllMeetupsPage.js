import MeetupItem from "../components/meetups/MeetupItem";
import { useFetch } from "../util-hooks/useFetch";
import classes from "./../components/meetups/MeetupList.module.css";

export default function AllMeetupsPage() {
  const { data } = useFetch({
    url: "/data.json",
  });

  if (!data) return <p>Loading...</p>;

  return (
    <section>
      <h1>All Meetups</h1>
      <ul className={classes.list}>
        <MeetupItem data={data[0]} />
        <MeetupItem data={data[1]} />
        <MeetupItem data={data[2]} />
        <MeetupItem data={data[0]} />
      </ul>
    </section>
  );
}
