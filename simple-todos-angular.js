Tasks = new Mongo.Collection('tasks');
     
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

          this.newTask = {};   

          this.helpers({
            tasks: () => {
              return Tasks.find({});
            }
          });

          this.addTask = () => {
            this.newTask["createdAt"] = new Date();

            Tasks.insert(this.newTask);
            this.newTask = {};
          };

          this.removeTask = (task) => {
            Tasks.remove({_id : task._id});
          }

       



               
           /* $scope.addTask = function (newTask) {
              $scope.tasks.push( {
                text: newTask,
                createdAt: new Date() }
              );
            };*/

          }]);
    }


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
