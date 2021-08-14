// {
//     let a = "hello";
//     let add = function (a,b) {
//         return a+b
//     }
//     console.log(add (5,5));
// }

// (
//     function (name, day) {
//         let greet = `hello ${name}, today is ${day}`;
//         console.log(greet);
//         let add = function (a,b) {
//             return a + b;
//         }
//         console.log(add(5,3));
//     }
// ) ("androso", "friday");

//----------------- Closures


// // Second type
// function outer () {
//     let varA = "HI";
//     let varB = "FIVE";
//     function inner () {
//         return varA + " BYE";
//     }
//     return inner;
// }
// let myfunc = outer();
// console.log(myfunc());

// // Third type 

// function greeting (type) {
//     return function (name) {
//         console.log(`${type}, ${name}!!!`);
//     }
// }

// const sayBonjour = greeting("bonjour");

// // Fourth Example 

// function html (tag) {
//     return function (innerContent) {
//         return `<${tag}>${innerContent}</${tag}>`;
//     }
// }

// let h1 = html("h1");
// let h2 = document.createElement("h2");
// h2.innerText = "This is an articial h2"
// console.log(h1("This is an artificial heading"))

// // CLosures in the module pattern
// function nameModule () {
//     let name = "calzado";
//     return {
//         age: 18,
//         getName () {
//             return name;
//         },
//         setName (newName) {
//             name = newName; 
//         }
//     }
// }

// const francisco = nameModule()
// const renata = nameModule();

// francisco.setName("Francisco");
// francisco.age = 23;
// renata.setName("Renata");

