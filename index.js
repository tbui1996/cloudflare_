

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
 /*fetch('https://cfw-takehome.developers.workers.dev/api/variants')
 	.then((response) => {
 		return response.json();
 	})
 	.then((data)=>{
 		console.log(data);
 	})*/
async function handleRequest(request) {
	//Part one
	let reqBody, stringify, parsestringify, firstUrl, secondUrl;
	let parsestringifylen;
	try{
	reqBody = 'https://cfw-takehome.developers.workers.dev/api/variants';
	const response = await fetch(reqBody);
	const data = await response.json();
	stringify = JSON.stringify(data);
	parsestringify = JSON.parse(stringify);
	parsestringifylen = parsestringify.variants.length;
	//get length of array parsed
	console.log(parsestringifylen);
	firstUrl = parsestringify.variants[0];
	secondUrl = parsestringify.variants[1];
	/*console.log(stringify);
	console.log(firstUrl);
	console.log(secondUrl);*/
	} catch(err){
		if (err instanceof HttpError && err.response.status==404){
			alert("No such");
		} else{
			throw err;
		}
	}
	var index = Math.floor(Math.random() * parsestringifylen);

	//window.open (parsestringify.variants[index]);
	request = parsestringify.variants[index]
	openWin(request)
	//window.open("request","_blank")
	return new Response(request);

}

async function openWin(request){
	myWindow = window.open("request","_blank")
}
//handleRequest('users').then(console.log);





