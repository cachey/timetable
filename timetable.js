var Activities = new Mongo.Collection("activities");

if (Meteor.isClient) {
  // 'relative times' toggle
  Template.options.helpers({
    naturalDisplay: function () { return Session.get("timeSet"); },
  })
  Template.options.events({
    "change .naturalDisplay input": function (event) {
      Session.set("timeSet", event.target.checked);
    },
  })
  
  Template.activityFilter.created = function () {
    this.filter = new ReactiveTable.Filter('activity', ['Activity']);
  };
  Template.activityFilter.events({
  	"click .btn-default": function (event, template) {
  		template.filter.set(event.target.innerText.slice(0, -1));
  		if (event.target.innerText === "All") {
  			template.filter.set('');
  		}
  	}
  });
  
  Template.themeFilter.created = function () {
    this.filter = new ReactiveTable.Filter('theme', ['Theme']);
  };
  Template.themeFilter.events({
  	"click .btn-default": function (event, template) {
  		template.filter.set(event.target.innerText);
  		if (event.target.innerText === "All") {
  			template.filter.set('');
  		}
  	}
  });
  // name filter
  Template.nameFilter.created = function () {
    this.filter = new ReactiveTable.Filter('search', ['Description']);
  };

  Template.nameFilter.events({
     "keyup .reactive-table-input, input .reactive-table-input": function (event, template) {
       template.filter.set(event.target.value);
     } 
  }); 
  
  // discipline filter
  Template.disciplineFilter.created = function () {
    this.filter = new ReactiveTable.Filter('discipline', ['Discipline', 'Subdiscipline']);
  };
  Template.disciplineFilter.events({
     "keyup .reactive-table-input, input .reactive-table-input": function (event, template) {
       template.filter.set(event.target.value);
     } 
  });
  Template.timetable.helpers({
    settings: function () {
      return {
        collection: Activities,
        class: "table table-striped table-hover",
        rowsPerPage: 40,
        showRowCount: true,
        showNavigation: 'true',
        showColumnToggles: false,
        filters: ['activity', 'theme', 'discipline', 'search'],
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
               return moment(val, "YYYY/MM/DD HH:mm:ss").from(new Date());
            } else {
             return moment(val, "YYYY/MM/DD HH:mm:ss").format("h a[,] D MMM");
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

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
