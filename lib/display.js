colorFunction = function(item) {
  switch (Session.get('colorKey')) {
  	case 'Activity':
	  switch (item.Activity.split("_")[0]) {
	    case 'Lecture': return 'info';
		case 'Practical': return 'danger';
		case 'Tutorial': return 'success';
		default: return '';
	  }
	case 'Theme':
	  switch (parseInt(item.Theme)) {
		case 1: return 'danger';
		case 2: return 'warning';
		case 3: return 'info';
	    case 4: return 'success';
	    default: return '';
	  }
    default: return '';
  }
};

if (Meteor.isClient) {
  // 'display relative times'
  Session.set("timeSet", '');
  
  Template.relativeTimesPicker.helpers({
    naturalDisplay: function () { return Session.get("timeSet"); }
  })

  Template.relativeTimesPicker.events({
    "change .naturalDisplay input": function (event) {
      Session.set("timeSet", event.target.checked);
    }
  }),
  
  Template.relativeTimesPicker.helpers({
  	futureOnly: function() { return Session.get("nowSet"); }
  })
  
  // row shading functionality
  Session.set('colorKey', '');
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
  })
    
}
