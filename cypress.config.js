defaultCommandTimeout: 10000;
module.exports = {

  // The rest of the Cypress config options go here...
 // projectId: "7frvih",
 projectId: "hwjn29",
 env: {
  MAILSLURP_API_KEY:
    "7cf3d9293c23acb0647de684abf9c19432ab561c128429424436d0a8abceda0e",
},
 reporter: "cypress-mochawesome-reporter",
  e2e: {
    defaultCommandTimeout: 40000,
    responseTimeout: 40000,
    requestTimeout: 40000,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
};