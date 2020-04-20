async function handleRequest(request) {
  let reqBody, stringify, parsestringify, firstUrl, secondUrl;
   let parsestringifylen;

   reqBody = 'https://cfw-takehome.developers.workers.dev/api/variants';
   const response = await fetch(reqBody);
   const data = await response.json();
   stringify = JSON.stringify(data);
   parsestringify = JSON.parse(stringify);
   parsestringifylen = parsestringify.variants.length;
   firstUrl = parsestringify.variants[0];
   secondUrl = parsestringify.variants[1];
   


const NAME = 'experiment-0'
 // Responses below are place holders, you could set up
 // a custom path for each test (e.g. /control/somepath )
 const TEST_RESPONSE = new Response(firstUrl) // fetch('/test/sompath', request)
 const CONTROL_RESPONSE = new Response(secondUrl) // fetch('/control/sompath', request)
 // Determine which group this requester is in.
 const cookie = request.headers.get('cookie')
 if (cookie && cookie.includes(`${NAME}=control`)) {
   return Response.redirect(secondUrl,302)

 } else if (cookie && cookie.includes(`${NAME}=test`)) {
   return Response.redirect(firstUrl,302)
 } else {
   // if no cookie then this is a new client, decide a group and set the cookie
   let group = Math.random() < 0.5 ? 'test' : 'control' // 50/50 split
   let response = group === 'control' ? CONTROL_RESPONSE : TEST_RESPONSE
   response.headers.append('Set-Cookie', `${NAME}=${group}; path=/`)
   return response
 }
}
addEventListener('fetch', event => {
 event.respondWith(handleRequest(event.request))
})
