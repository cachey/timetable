var subj = 2031;
var year = 2016;

var Activities = new Mongo.Collection(toString(year)+'.'+toString(subj));

if (Meteor.isClient) {
  Template.registerHelper("subjcode", function() {
    return "MED"+toString(subj); 
  });
  document.title = toString(subj) + ' timetable';
  // hide the help alert displayed on startup
  Template.body.events({
    'click': function (event) {
      $('div.alert').alert('close');
    }
  });

  Template.timetable.helpers({
    settings: function () {
      return {
        collection: Activities,
        class: 'table table-condensed table-responsive table-hover',
        rowsPerPage: 200,
        showRowCount: true,
        showNavigation: 'true',
        showColumnToggles: false,
        rowClass: colorFunction,
        filters: ['activity', 'theme', 'discipline', 'search', 'future', 'mst'],
        fields: [
          { key: 'Activity', label: 'Activity', fn: function(val, obj) {
            return val.split('_')[0];
          }},
          { key: 'Theme', label: 'Theme'},
          { key: 'Num', label: 'P#'},
          { key: 'Time', label: 'Time', sortOrder: 0, sortByValue: true, fn: function(val, obj) {
             if (Session.get('timeSet')) {
               return moment(val).from(new Date());
            } else {
             return moment(val).format('h a[,] D MMM');
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
