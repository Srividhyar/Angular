//Define an angular module for our app
angular.module('studentApplication', ['ngRoute'])
.constant('appConstant', {
  'mongoAPI' : 'glR24-LqK3OyVBDqIhk8QKk3KhOSjc2R',
  'mongoAPIUrl' : 'https://api.mongolab.com/api/1/databases/studentdirectory/collections/students'
})
  //Routing for different pages
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      when('/StudentList', {
        templateUrl: '/src/student/partials/studentList.html',
        controller: 'listStudentController',
        controllerAs: 'listStudent',
        resolve : {
          'fetchStudentData': function(studentService){
            return studentService.retrieveStudentRecords();
          } 
        }
      }).
      when('/CreateStudent', {
        templateUrl: '/src/student/partials/createStudent.html',
        controller: 'createStudentController',
        controllerAs: 'createStudent'
      }).        
      when('/EditStudent/:id', {
        templateUrl: '/src/student/partials/editStudent.html',
        controller: 'editStudentController',
        controllerAs: 'editStudent'
      }).
      otherwise({
        redirectTo: '/StudentList'
      });
    }]);
  
  