# host-it

Simply host directories with basic auth

---

## Installation 

Simply run the following:

```
yarn add host-it
```

Similar to serve you can also use this module as a global module

```
yarn global add host-it
```

---


## Run

You can run it as a command line with the following parameters:

- `directory`: **(required)** 
    - This represents the path to the directory you want to host
- `port`: **(optional, default 8080)**
    - The port you want the server to run on
- `username`: **(optional)**
    - If you use username you will need to use the password and hostname parameter. This will activate basic auth on the hosted content
- `password`: **(optional)**
    - If you use password you will need to use the username and hostname parameter. This will activate basic auth on the hosted content
- `hostname`: **(optional)**
    - If you use hostname you will need to use the username and password parameter. This will activate basic auth on the hosted content
- `isReact`: **(optional)**
    - If your app is react we will redirect all to `index.html`

You can also add a `host-it.json` file at the source of your project.

Example:

```json
{
    "directory": "dashboard",
}
```

or 


```json
{
    "directory": "test",
    "port": 5000,
    "security": {
        "username": "admin",
        "password": "root",
        "hostname": "pixiumdigital.com"
    }
}
```

---


## Author

Burlet Mederic

mederic.burlet@pixiumdigital.com