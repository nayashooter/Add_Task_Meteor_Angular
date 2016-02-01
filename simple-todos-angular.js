  Applications = new Mongo.Collection('applications');
     
    if (Meteor.isClient) {
     
      // This code only runs on the client
      angular.module('simple-todos',['angular-meteor']);

      function onReady() {
        angular.bootstrap(document, ['simple-todos']);
      }
     
      if (Meteor.isCordova)
        angular.element(document).on('deviceready', onReady);
      else
        angular.element(document).ready(onReady);

     
        angular.module('simple-todos').controller('TodosListCtrl', ['$scope', '$reactive',
        function ($scope, $reactive) {
          $reactive(this).attach($scope);

          this.newApplication = {};   

          this.helpers({
            applications: () => {
              return Applications.find({});
            }
          });

          this.addApplication = () => {
            this.newApplication["createdAt"] = new Date();
            Applications.insert(this.newApplication);
            this.newApplication = {};
          };

          this.removeApplication = (app) => {
            Applications.remove({_id : app._id});
          }

          }]);
    }


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if ( Applications.find().count() === 0){
        Applications.insert(
          { 
            IdApp : "HBADM" , 
            name :"HabAdmin" , 
            urlDev : "http://habadmin.dev.S2h.corp" , 
            urlRec :"http://habadmin.rec.S2h.corp" , 
            urlProd :"http://habadmin.S2h.corp" ,
            createdAt : new Date()
          }); 
    }

  });
}
