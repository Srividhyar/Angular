//Create StudentController
angular.module('studentApplication').controller('createStudentController', ['studentService', 'appConstant', '$location', '$http', function(studentService, appConstant, $location, $http) {
  this.stateList = studentService.states;
  this.createStudentRecord =  function() {
  
    var newStudent = {
      'name':this.name,
      'rollno':this.rollno,
      'dob':this.dob,
      'linkedin':this.linkedin,
      'mailid':this.mailid,
      'state':this.state,
      'phone':this.phone
    };
    studentService.createStudentRecords(newStudent);
  };

}]);