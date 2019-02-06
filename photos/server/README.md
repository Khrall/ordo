# Photos Server

## Getting Started

Install dependencies with

```
yarn
```

Start a `minio` file-server and a `mongo` server using docker with:

```
docker-compose up
```

> Note: You need to have `photos/server/` as your working directory when calling `docker-compise up` in order for it to pick up `docker-compose.yml`.

You should now be able to open the minio browser at http://localhost:9000/minio/ and log in using the default `admin`/`password` credentials.

Once logged in, create a new bucket called `test-bucket`.

Last step before running the server is creating a new database on your `mongo` server called `ordo`. Feel free to use any cli/client for this - I recommend using [Robo 3T](https://robomongo.org/).

With that out of the way, you should be able to run the Photos server with

```
yarn start
```

## Quick Primer

The server is created using TypeScript-powered Express libraries. The most important one is [routing-controllers](https://github.com/typestack/routing-controllers), which allows annotation-based routing controllers such as `PhotoController.ts`.

This library in turn also uses [class-validator](https://github.com/typestack/class-validator) which allows us to define and automatically validate the expected bodies of POST/PUT requests, based on a class definition such as `PhotoObject.ts`.

The actual files are hosted by a [minio](https://docs.minio.io/) file-server (see [minio-js](https://github.com/minio/minio-js) for js-documentation). Photos Server only handles the generation of pre-signed URLs that can be used to send requests to the `minio` server on the user's client (See: [minio pre-signed urls](https://docs.minio.io/docs/upload-files-from-browser-using-pre-signed-urls.html)).

Any additional metadata about the photos is stored on a [mongo](https://www.mongodb.com/) database. This allows us to query based on the different properties of our photos.

## Endpoints

For now there's only a single end-point:

```
POST: http://localhost:4000/photo/create
```

The POST request needs to have content-type set to `application/json`, and the body needs to follow the class definition in `PhotoObject.ts`:

```
{
  name: string
}
```

This will return a pre-signed URL, which can be used to upload an object to the `minio` server. An example of how to use this can be found in the Photos App (`file-creator.ts`).
