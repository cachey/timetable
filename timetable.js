var Activities = new Mongo.Collection("activities");
if (Meteor.isClient) {
  Session.set('colorKey', '');
  // 'relative times' toggle
  Template.options.helpers({
    naturalDisplay: function () { return Session.get("timeSet"); },
  })
  Template.options.events({
    "change .naturalDisplay input": function (event) {
      Session.set("timeSet", event.target.checked);
    }
  }),
  
  Template.body.events({
    "click": function (event) {
      $("div.alert").alert('close');
    }
  }),
  
  Template.colorPicker.events({
    "click .btn-default": function (event, template) {
      var colorPicked = function () {
      	switch (event.target.innerText) {
      		case 'Activity type': return 'Activity';
      		case 'Theme': return 'Theme';
      		default: return '';
 	   	}
      };
      Session.set('colorKey', colorPicked());
    }
  }),

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
        class: "table table-condensed table-responsive table-hover",
        rowsPerPage: 40,
        showRowCount: true,
        showNavigation: 'true',
        showColumnToggles: false,
        rowClass: function(item) {
          if (Session.get('colorKey') === 'Activity') {
            switch (item.Activity.split("_")[0]) {
              case 'Lecture': return 'info';
              case 'Practical': return 'danger';
              case 'Tutorial': return 'success';
              default: return '';
            }
          } else if (Session.get('colorKey') === 'Theme') {
             switch (parseInt(item.Theme)) {
              case 1: return 'danger';
              case 2: return 'warning';
              case 3: return 'info';
              case 4: return 'success';
              default: return '';
            }
          } else {
            return '';
          }
        },
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
