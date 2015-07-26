var Activities = new Mongo.Collection("activities");
if (Meteor.isClient) {

  // hide the help alert displayed on startup
  Template.body.events({
    "click": function (event) {
      $("div.alert").alert('close');
    }
  }),

  Template.timetable.helpers({
    settings: function () {
      return {
        collection: Activities,
        class: "table table-condensed table-responsive table-hover",
        rowsPerPage: 40,
        showRowCount: true,
        showNavigation: 'true',
        showColumnToggles: false,
        rowClass: colorFunction,
        filters: ['activity', 'theme', 'discipline', 'search', 'future'],
        fields: [
          { key: 'Activity', label: 'Activity', fn: function(val, obj) {
            return val.split("_")[0];
          }},
          { key: 'Theme', label: 'Theme'},
          { key: 'Num', label: 'P#', fn: function (val, obj) {
            return ("000"+val.slice(1)).slice(-3);  
          }},
          { key: 'Time', label: 'Time', sortOrder: 0, sortByValue: true, fn: function(val, obj) {
             if (Session.get("timeSet")) {
               return moment(val).from(new Date());
            } else {
             return moment(val).format("h a[,] D MMM");
            }
          }},
          { key: 'Description', label: 'Title'},
          { key: 'Discipline', label: 'Discipline'},
          { key: 'Subdiscipline', label: 'Subdiscpline'}
        ]
      };
    }
  });
}
