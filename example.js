const list1 = [1, 2, 3, 4, 5];

const list2 = [...list1, 6, 7, 8];

console.log(list2); // > 1, 2, 3, 4, 5, 6, 7, 8

const obj1 = {
  nome: "Alan Cruz",
  dtNasc: "25/08/1996",
};

const obj2 = {
  ...obj1,
  email: "alanlucascruz@gmail.com",
};

console.log(obj2);
/* 
  {
    nome: "Alan Cruz",
    dtNasc: "25/08/1996",
    email: "alanlucascruz@gmail.com",
  }  
*/

const numbers = [1, 2, 3, 4, 5];

console.log(sum(...numbers));
