# React Meetup 

Proyecto realizado parcialmente como prueba técnica.

## Implementación
### Barra de Navegación
Para alcanzar los requisitos del enunciado, fue necesario añadir determinadas clases al fichero css y controlar la posición del scroll.

Primeramente, se fijó el header como posición "fixed" y "top: 0", consiguiendo que la barra de navegación estuviese visible durante todo el scroll. Seguidamente, se añadió una clase "header-hidden" para cuando la barra de navegación estuviese oculta, y finalmente se añadió un pequeño efecto visual.
```css
.header {
    ...
    position: fixed;
    top: 0;
    transition: transform 0.3s ease;
}

.header.hide {
    transform: translateY(-100%);
}

.header.show {
    transform: translateY(0);
}

.header-hidden {
    ...
    position: hidden;
    
}
```

Para su correcto funcionamiento, se hace uso de dos estados, uno que controla si se esta mostrando o no la barra de navegación, y otro que controla la posición del scroll vertical. Para calcular el scroll, se utiliza un efecto junto con eventos, consiguiendo ocultar la barra de navegación al bajar hacia abajo y mostrarla al subir.

```js
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { favourites } = useFavourites();

  useEffect(() => {
    const handleHeaderScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleHeaderScroll);

    return () => {
      window.removeEventListener("scroll", handleHeaderScroll);
    };
  }, [lastScrollY]);
```

### Mostrar urls
Para mostrar la url (p. ej. /favorites) se ha utilizado el paquete react-router-dom, que permite añadir enrutamiento a un proyecto de react.

Para su uso, simplemente hay que envolver la aplicación con las etiquetas \<Router> e indicar las vistas a cargar en la dirección con \<Route>
```js
<Router>
    <MainNavigation />
    <Layout>
        <Routes>
            <Route path="/all-meetups" element={<AllMeetupsPage />} />
            <Route path="/new-meetups" element={<NewMeetupsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<AllMeetupsPage />} />
        </Routes>
    </Layout>
</Router>

```
Con esto, en el componente de la barra de navegación ya se tiene acceso al uso de las etiquetas \<Link>, que permite la navegación entre pantallas.
```js
<li>
    <Link to="/all-meetups">All Meetups</Link>
</li>
```

Gracias a este pequeño cambio, podemos mostrar urls completas en la barra del navegador y además hacer uso de un sistema de enrutamiento mucho más robusto que el originalmente encontrado en el proyecto.

### Funcionamiento de favoritos
Debido a que los favoritos se utilizan en varios componentes como la barra de navegación o en el MeetUpItem, en lugar de pasar el estado como prop y provocar un prop drilling, se ha optado por implementar un contexto que este disponible en toda la aplicación.

El contexto hace uso también del local storage como función básica para mantener los datos en la sesión local del usuario.
```js
<FavouritesContext.Provider 
    value={{
        favourites,
        addFavourite,
        removeFavourite,
        isFavourited,
    }}
>
      {children}
</FavouritesContext.Provider>
```

Gracias a ello, los datos de favoritos pueden ser llamados desde cualquier punto de la aplicación. Este sería el código necesario para el correcto funcionamiento del botón de añadir a favoritos:

```js
const { addFavourite, removeFavourite, isFavourited } = useFavourites();

const handlerFavourite = () => {
    if (isFavourited(item.id)) {
        removeFavourite(item.id);
    } else {
        addFavourite(item);
    }
};
...
<button onClick={handlerFavourite}>
    {isFavourited(item.id)
        ? "Remove from favorites"
        : "Add to favorites"}
</button>
```

Además, conseguimos que los cambios esten sincronizados con la placa que se muestra en la barra de navegación .
```js
const { favourites } = useFavourites();
...
<Link to="/favorites">
    My Favorites{" "}
    <span className={classes.badge}>{favourites.length}</span>
</Link>
```

Por último, se implementó la vista de Favoritos, que también hace uso de este contexto para obtener los datos.
```js
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
```

### Formulario y datos
Con el objetivo de mejorar la funcionalidad de la aplicación, y como una primera versión, se ha decidido implementar el sistema de local storage del navegador para guardar los datos de la aplicación. Para ello, se ha creado un custom hook que se encarga de obtener y almacenar la información de las Meetups.

```js
export function useStorage() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    const storedMeetups = localStorage.getItem("meetups");
    if (storedMeetups) {
      setMeetups(JSON.parse(storedMeetups));
    }
  }, []);

  const addMeetup = (meetup) => {
    const updatedMeetups = [...meetups, meetup];
    setMeetups(updatedMeetups);
    localStorage.setItem("meetups", JSON.stringify(updatedMeetups));
  };

  return {
    meetups,
    addMeetup,
  };
}
```

En el formulario para la creación de nuevas Meetups se implementa este hook para guardar las nuevas meetups que se crean. Para recoger los datos del formulario, se hace uso de FormData, y una vez guardados, se redirige a la página donde se muestran todas las meetups.
```js
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
  ```

Finalmente, se editó la vista de mostrar todas las meetups de forma que se renderice cada elemento del array mediante un map.
```js
const { meetups } = useStorage();
...
{meetups.map((meetup) => (
     <MeetupItem key={meetup.id} data={meetup} />
))}
```

### Tests
En cuanto a los tests, se utiliza la biblioteca de Jest, y unicamente se han implementado tests para el componente MeetupItem. Fue necesario crear un mock del contexto de favoritos, que se reinicia antes de comenzar cada prueba.
```js
jest.mock("../../providers/favourites-context/favourites-context-provider", () => ({
  useFavourites: jest.fn(), 
}));
```

En total, se realizaron dos pruebas:

- Prueba simple de renderizado del componente: se prueba a renderizar el componente sin ningún tipo de información.
- Prueba de renderizado con información: en este test se le pasa medianete props un mock de datos y se comprueba que los campos se renderizan correctamente. A continuación se muestra parte del código.

```js
it("<MeetupItem/> renders data correctly", () => {
    const data = {
        ...
    }
    const wrapper = shallow(<MeetupItem data={data}/>);
    expect(wrapper.find('h3').text()).toEqual(data.title);
    expect(wrapper.find('img').prop('src')).toEqual(data.image);
    expect(wrapper.find('img').prop('alt')).toEqual(data.title);
    expect(wrapper.find('address').text()).toEqual(data.address);
    expect(wrapper.find('p').text()).toEqual(data.description);
  });
```

## Ejecución del proyecto

### `npm install`
Instala las dependencias del proyecto.


### `npm start`

Ejecuta la aplicación en modo desarrollador.\
Abrir [http://localhost:3000](http://localhost:3000) para verlo.

La página se recarga cada vez que realices cambios.

### `npm test`

Ejecuta los tests.


### `npm run build`

Compila la aplicación para producción.

