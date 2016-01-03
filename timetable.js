var Units = new Meteor.Collection('units');
var Activities = new Meteor.Collection('activities');


Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', {
  template: 'select'
});

Router.route('/view/:unit', {
  template: 'display',
  data: function() {
    Session.set('unit', parseInt(this.params.unit));
    var unitInfo = Units.findOne({number: parseInt(this.params.unit)});
    Session.set('halfway', unitInfo.halfway);
    console.log(unitInfo.halfway);
    return unitInfo;
  }
});

if (Meteor.isClient) {
  Template.select.helpers({
    'unit': function() {
      return Units.find();
    }
  });

  Template.display.helpers({
    settings: function () {
      return {
        collection: Activities.find(Session.get('unit') ? {Unit: Session.get('unit')} : {}),
        class: 'table table-condensed table-responsive table-hover',
        rowsPerPage: 200,
        showRowCount: true,
        showNavigation: 'true',
        rowClass: colorFunction,
        filters: ['activity', 'theme', 'discipline', 'search', 'future', 'mst'],
        fields: [
          { key: 'Unit', label: 'Unit', sortOrder: (Session.get('unit') ? 1 : 0), hidden: function() {return Session.get('unit')}},
          { key: 'Activity', label: 'Activity', fn: function(val, obj) { return val.split(' ')[0]}},
          { key: 'Theme', label: 'Theme'},
          { key: 'Series', label: 'P#'},
          { key: 'Date', label: 'Date', sortOrder: (Session.get('unit') ? 0 : 1), sortByValue: true, fn: function(val, obj) {
             if (Session.get('timeSet')) {
               return moment(val).from(new Date());
            } else {
             return moment(val).format('h\u00a0a[,]\u00a0D\u00a0MMM');
            }
          }},
          { key: 'Title', label: 'Title'},
          { key: 'Discipline', label: 'Discipline'},
          { key: 'Subdiscipline', label: 'Subdiscpline'}
          
        ]
      };
    }
  });
  Template.usageTip.helpers({
    randomTip: function() {
       tips = ["This box is meant to show a random tip or message but I haven't written any yet."];
       return tips[Math.floor((Math.random() * tips.length))];
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  /* Test data
  Units.insert({number: 1011, class:'primary'});
  Units.insert({number: 1022, class:'info'});
  Units.insert({number: 2031, class:'success'});
  Units.insert({number: 2042, class:'warning'});
  */
  });
}
