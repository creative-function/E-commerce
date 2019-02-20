console.log(`Hello World from main.js! 
Change this message, and make sure it changes in the browser 
to verify that you're working in the right files.`)

///NAV BAR////

let hamburger = document.querySelector('.hamburger');

//hamburger on click ( addEventListener('click'))

hamburger.addEventListener('click', function(){
	
	let menu = document.querySelector('header nav ul');
	let header = document.querySelector('header');

	header.classList.toggle('nav_open');

	// if (header.classList.contains('nav_open')){
	// 	// menu.style.display = "block"; 
	// 	header.classList.remove('nav_open')
	// }
 // 	else {
	// 	header.classList.add('nav_open')
 // 		// menu.style.display = "none";
 // 	};
})





/// SLIDESHOW ///

let slideURLs = [ 
    "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg",
    "https://cdn.pixabay.com/photo/2016/01/19/17/41/friends-1149841_960_720.jpg",
    "https://cdn.pixabay.com/photo/2017/08/07/18/57/dog-2606759_960_720.jpg",
    "https://cdn.pixabay.com/photo/2018/08/12/16/59/ara-3601194_960_720.jpg",

]

let counter = 0;

let slideshowDiv = document.querySelector (".slideshow")

//get the .dots div
let dotsDiv = document.querySelector('.dots');




let dotCount = 0;
while(dotCount < slideURLs.length){
	
	//make a new div
	let newDiv = document.createElement('div');

	//append the new div to the .dots div

	dotsDiv.appendChild(newDiv);
	dotCount ++;	
}






let generateSlide = function ( difference = 1) {

	//increase counter s it goes to the next image
	counter += difference;


	if (counter === slideURLs.length){
		counter=0;
		console.log("last one");
	} // if counter number is bigger than the last item numeber in array, start the counter back at index item 0
	
	if (counter ===-1){
		counter = slideURLs.length-1;
	}


	console.log("generateSlide")

	// find old slide 
	let oldSlide = document.querySelector('.slideshow img');

	if (oldSlide) {
		//remove previous slide
		slideshowDiv.removeChild(oldSlide); 
	} else {
		console.log ("not old");
	}

	let newSlide = document.createElement('img'); // create an element for the page

	newSlide.setAttribute ('src', slideURLs[counter]); // set the source, array[index]

	slideshowDiv.appendChild (newSlide); // add imae to the container

	//find active dot (if there is one) and remove .active from it 

	let oldActiveDot = dotsDiv.querySelector('.dots .active');
	if (oldActiveDot){
		oldActiveDot.classList.remove('active')
	}

 	//get the dot inside dotsDiv using the counter
 	dotsDiv.children[counter].classList.add('active');
 	//dotsDiv, give me your children, but just the one that matches the current counter index number
}


let autoNext= setInterval (generateSlide, 4 * 1000); // and set interval every 5 seconds
//give setInterval an ID that can be refrecned as an agrument/variable in other functions 


generateSlide();//call it once



let prevButton = document.querySelector("button.prev");

let nextButton = document.querySelector("button.next");

prevButton.addEventListener('click', function(){

	console.log ("back");
	generateSlide(-1);
	clearInterval (autoNext);
})

nextButton.addEventListener('click', function(){

	console.log ("next");
	generateSlide(1);
	clearInterval(autoNext);


})


///PRODUCT DISPLAY




// productData.forEach(function(product){
//     console.log(product);
// });


let inventory = document.querySelector('ul.inventory')

//let this variable do this thing

let displayProducts = function (results) {


    inventory.innerHTML = ""; // clears out ul.inventory div before running the loop 

    for (let i = 0; i < results.length; i++) { // declaration, argument, if true  \ for every i, so long as i < array length, increase the value or i or continue function.

        // let this variable mean the item in the array 'results'
        let product = results[i];
        console.log("this product is " + product.name); // tell me the name of this product aka results[i]

        let newProductLI = document.createElement("li"); // let this variable = a new <li>

        let foodImg = new Image(); //let this variable = a new image
        foodImg.src = product.image; //the src of this image in the image in the product array/object? i= object inside the product data array 
        foodImg.style.width = "30%"; // style the image to be 30% 
        newProductLI.appendChild(foodImg); // add the image to the <li>

        let newTitle = document.createElement("h2"); // let this variable = a new h2
        newTitle.innerText = product.name + " " + " $" + product.price; //in the new hs write the name of of results[i] and price of results[i]
        newProductLI.appendChild(newTitle); // add the h2 to the <li>

        let newButton = document.createElement("button"); // let tbhis variable = a new button
        newButton.innerText = "Add to Cart"; // in the new button, write add to cart
        newProductLI.appendChild(newButton); // add the new button to the <li>

        inventory.appendChild(newProductLI); // add the list to the inventory class <ul>
    }


};

displayProducts(productData); //display products with all product data 
// run this function through the productData array in data.js  
// and pull the objects aka [i] out of the reults aka new array 
//made form a filtered productData array with the given arguments


// user will select a value

//FILTERING FUNCTIONS


let petSelect = document.getElementById("pet-select"); // let this variable = this id aka a option bar

petSelect.addEventListener("change", function () { // when the user changees the option, run this functon
    
    console.log("Picked:" + petSelect.value); // tell me which value of the pet-select bar was chosen
    
    if (petSelect.value === ""){
        displayProducts(productData);
    }
    else{
        let filteredProducts = productData.filter(function(product) {
            if (product.categories.includes(petSelect.value)) {
                return true;
            } else {
                return false;
            }
        });
        console.log(filteredProducts);
        
        displayProducts(filteredProducts);
    }
    
});



// SORTING FUNCTIONS

let lowestToHighestPrice = function (productA, productB) {
    // return productA.price - productB.price;
    if (productA.price < productB.price) { // if a cost less than B
        return -1; // -1= A should be before B in the products
    } else if (productA.price > productB.price) { //if a cost more than b
        return 1; //1=  B should be before A in the products
    } else {
        return 0; // 0= these products are equal price
    }

}

let highestToLowestPrice = function (productA, productB) {
    // return productA.price - productB.price;
    if (productA.price > productB.price) { // if a cost more than b
        return -1; // A should be before B in the products
    } else if (productA.price < productB.price) { // if a cost less than b
        return 1; // B should be before A in the products
    } else {
        return 0; // these products are equal price
    }

}

let sortByName = function (productA, productB) {
    // return productA.price - productB.price;
    if (productA.name < productB.name) { // if a name is before b (smaller = first)
        return -1; // A should be before B in the products
    } else if (productA.name > productB.name) { // if a name is after b
        return 1; // B should be before A in the products
    } else {
        return 0; // these products are equal price
    }

}




let priceSorting = document.getElementById("price-sorting");

priceSorting.addEventListener("change", function () {

    console.log("Sorted By:" + priceSorting.value);

    let sortedProducts;
    // sort product data by...
    if (priceSorting.value === "price-lowest") {
        sortedProducts = productData.sort(lowestToHighestPrice)
    } else if (priceSorting.value === "price-highest") {
        sortedProducts = productData.sort(highestToLowestPrice)
    } else if (priceSorting.value === "a-z") {
        sortedProducts = productData.sort(sortByName)
    }
    // call displayProducts() with sorted array 
    console.log(sortedProducts);

    displayProducts(sortedProducts); // above function with new array to use to sord objects from productData
})
//value will use .sort to filter array by specific property
//page will display productData by filter

//how do we make value = object?










