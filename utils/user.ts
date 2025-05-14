export interface User {
  id: "uuid";
  name: "string";
  age: "int";
  score: "int";
  active: "bool";
  country: "string";
  team: {
    name: "string";
    leader: "bool";
    projects: [{ name: "string"; completed: "bool" }];
  };
  logs: [{ date: "YYYY-MM-DD"; action: "login/logout" }];
}
