export function onRequest({ locals, request }, next) {
  // intercept data from a request
  // optionally, modify the properties in `locals`

  console.log("middleware")
 /*  if (request.url.pathname == "/api/db") {
    console.log("teste")
  } */

  // return a Response or the result of calling `next()`
  return next();
};