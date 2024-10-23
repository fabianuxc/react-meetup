import MeetupItem from "../components/meetups/MeetupItem";
import Card from "../components/ui/Card";
import { useFavourites } from "../providers/favourites-context/favourites-context-provider";
import classes from "./../components/meetups/MeetupList.module.css";


export default function FavoritesPage() {
  const { favourites } = useFavourites();

  return (
    <section>
      <h1>Favorites Page</h1>
      {favourites.length > 0 ? (
        <ul className={classes.list} data-test="meet-up-item">
          {favourites.map((meetup) => (
            <MeetupItem key={meetup.id} data={meetup} />
          ))}
        </ul>
      ) : (
        <p>No favorites</p>
      )}
    </section>
  );
}
