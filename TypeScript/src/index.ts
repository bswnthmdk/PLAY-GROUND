function hello(name: string): string {
  return `Hello, ${name}`;
}

console.log(hello("Babu"));

// Type Narrowing
function getChai(kind: string | number): string | number {
  if (typeof kind === "string") {
    return `Name of chai is ${kind.toLowerCase()}`;
  }
  return `Amount of chai is ${kind}`;
}

// Truthy/Falsy Narrowing
function showMsg(msg?: string): string | null {
  if (msg) {
    return msg.toUpperCase();
  }
  return "Noting to show";
}

// console.log(getChai(100));
// console.log(getChai("Filter"));
// console.log(showMsg());
// console.log(showMsg("Hello World!"));

// Narrowing of instances
class Class1 {
  greet() {
    return "Hello from Class-1";
  }
}
class Class2 {
  greet() {
    return "Hello from Class-2";
  }
}
function getClassInstance(instance: Class1 | Class2): string {
  if (instance instanceof Class1) {
    return instance.greet();
  }
  return instance.greet();
}

// console.log(getClassInstance(new Class1()));
// console.log(getClassInstance(new Class2()));

type Chienese = { type: "Chienese"; name: String };
type Italian = { type: "Italian"; price: String };
type Indian = { type: "Indian"; aroma: String };

function getCuisine(cuisine: Chienese | Italian | Indian): string {
  switch (cuisine.type) {
    case "Chienese":
      return `Cuisine name is ${cuisine.name}`;
    case "Italian":
      return `Cuisine price is ${cuisine.price}`;
    case "Indian":
      return `Cuisine aroma is ${cuisine.aroma}`;
    default:
      return "Unknown cuisine";
  }
}

// Conditional rendering function
function renderCuisine(cuisineType: string) {
  let cuisine: Chienese | Italian | Indian | null = null;

  if (cuisineType === "Chinese") {
    cuisine = { type: "Chienese", name: "Fried Rice" };
  } else if (cuisineType === "Italian") {
    cuisine = { type: "Italian", price: "$15" };
  } else if (cuisineType === "Indian") {
    cuisine = { type: "Indian", aroma: "Spicy" };
  }

  if (cuisine) {
    console.log(getCuisine(cuisine));
  } else {
    console.log("Cuisine not found!");
  }
}

// Testing conditional render
// renderCuisine("Chinese");
// renderCuisine("Italian");
// renderCuisine("Indian");
// renderCuisine("Mexican"); // This will print "Cuisine not found!"

/*
================== FLOW OF EXECUTION ==================

1. renderCuisine("Chinese")
   - Creates a Chienese cuisine object: { type: "Chienese", name: "Fried Rice" }
   - Calls getCuisine() with the object
   - Switch case matches "Chienese"
   - Output: "Cuisine name is Fried Rice"

2. renderCuisine("Italian")
   - Creates an Italian cuisine object: { type: "Italian", price: "$15" }
   - Calls getCuisine() with the object
   - Switch case matches "Italian"
   - Output: "Cuisine price is $15"

3. renderCuisine("Indian")
   - Creates an Indian cuisine object: { type: "Indian", aroma: "Spicy" }
   - Calls getCuisine() with the object
   - Switch case matches "Indian"
   - Output: "Cuisine aroma is Spicy"

4. renderCuisine("Mexican")
   - cuisineType "Mexican" doesn't match any condition
   - cuisine remains null
   - Else block executes
   - Output: "Cuisine not found!"

======================================================
*/

let response: any = "42";
let numericLength: number = (response as string).length;
console.log(`Length of response is: ${response}`);

type Book = { name: string };
let bookString = '{"name":"Who Moved My Cheese?"}';
let bookObject = JSON.parse(bookString) as Book;
console.log(bookObject.name);

// INTERFACE
interface User {
  id: number;
  name: string;
}
// TypeScript automatically merges this with the above interface
interface User {
  email: string;
}
const user: User = {
  id: 1,
  name: "Biswanath",
  email: "test@mail.com",
};

console.log(user.email);

// TYPE
type UserBase = {
  id: number;
  name: string;
};
type UserContact = {
  email: string;
};
// This creates a NEW type using intersection
type UserWithEmail = UserBase & UserContact;
const user2: UserWithEmail = {
  id: 1,
  name: "Biswanath",
  email: "test@mail.com",
};

console.log(user2.email);

let value1: any;
value1 = "string";
value1 = 1.5;
value1 = [1, 2, 3];
value1.toUpperCase();

let value2: unknown;
value2 = "string";
value2 = 2.6;
value2 = [1, 2, 3];
if (typeof value2 === "string") {
  value2.toUpperCase();
}
