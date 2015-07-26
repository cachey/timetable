if (Meteor.isClient) {
  // 'hide past events'
  // the status of the checkbox is stored in session variable nowSet
  Session.set('nowSet', false);
  
  Template.futureOnlyPicker.created = function() {
  	this.filter = new ReactiveTable.Filter('future', ['Time']);
  };
  
  Template.futureOnlyPicker.helpers({
    futureOnly: function() { return Session.get('nowSet'); }
  })
  
  Template.futureOnlyPicker.events({
    'change .futureOnly input': function (event, template) {
      Session.set('nowSet', event.target.checked);
      if (event.target.checked) {
      	template.filter.set({'$gte': new Date()});
      } else {
      	template.filter.set('');
      }
    }
  })
  
  Template.activityFilter.created = function () {
    this.filter = new ReactiveTable.Filter('activity', ['Activity']);
  };
  Template.activityFilter.events({
  	'click .btn-default': function (event, template) {
      template.filter.set(event.target.innerText.slice(0, -1));
  		if (event.target.innerText === 'All') {
  			template.filter.set('');
  		}
  	}
  });
  
  Template.themeFilter.created = function () {
    this.filter = new ReactiveTable.Filter('theme', ['Theme']);
  };
  Template.themeFilter.events({
  	'click .btn-default': function (event, template) {
      template.filter.set(event.target.innerText);
  		if (event.target.innerText === 'All') {
  			template.filter.set('');
  		}
  	}
  });

  Template.nameFilter.created = function () {
    this.filter = new ReactiveTable.Filter('search', ['Description']);
  };

  Template.nameFilter.events({
     'keyup .reactive-table-input, input .reactive-table-input': function (event, template) {
       template.filter.set(event.target.value);
     } 
  }); 
  

  Template.disciplineFilter.created = function () {
    this.filter = new ReactiveTable.Filter('discipline', ['Discipline', 'Subdiscipline']);
  };
  Template.disciplineFilter.events({
     'keyup .reactive-table-input, input .reactive-table-input': function (event, template) {
       template.filter.set(event.target.value);
     } 
  });
}
