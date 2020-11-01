# Omflow

Single Page Application for Omflow.yoga


## Frontend

Svelte, svelte-spa-router, parcel.js, bulma

```
parcel client/index.html
```

- [Local](http://localhost:1234)


## Backend

RESTful JSON API
Node.js - express - mongoose

```
nodemon server/server.js
```

- [Local](http://localhost:5000)


## Heroku

- [Dashboard](https://omflow-svelte.herokuapp.com/)

```
heroku login
heroku logs --tail -a omflow-svelte
```


## License
[MIT](https://choosealicense.com/licenses/mit/)


## Links

- [Website](https://www.omflow.yoga/)
- [Email](mailto:inspire@omflow.yoga)
- [Facebook](https://www.facebook.com/omflowinspires)
- [Instagram](https://www.instagram.com/omflow.yoga/)
- [LinkedIn](https://www.linkedin.com/company/omflow)


## ToDo

- practices are reOccurring = true|false
- Scheduler: timezones / display / filter
- Navigation: burger
- Glossary

- localStorage strategy... Effects: stores.js / simplify and rename omflowUser -> omflower
- Generalize store: isLoggedIn, user(omflower), logout, teachers, classes, ... (token)

---

Created by [Christof Bauer](https://github.com/Existenziell) on 2020-10-20.



# History

This project is based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit alex-parra/svelte-template-parcel svelteParcel
cd svelteParcel
npm install
```


