angular.module('studentApplication').controller('editStudentController', ['studentService', 'appConstant', '$routeParams', '$rootScope', function(studentService, appConstant, $routeParams, $rootScope) {
      var editStudent = this;
      editStudent.stateList = studentService.states;
      var studentRecord = studentService.getStudentRecords($routeParams.id); 
      console.log('1', studentRecord);
      editStudent.name = studentRecord.name;
      editStudent.tempStuId = studentRecord._id.$oid;
      editStudent.rollno = studentRecord.rollno;
      editStudent.dob = new Date(studentRecord.dob);
      editStudent.linkedin=studentRecord.linkedin;
      editStudent.mailid=studentRecord.mailid;
      editStudent.state=studentRecord.state;
      editStudent.phone=studentRecord.phone;
    
    editStudent.EditStudentRecord =  function() {
      var editStudentRec = {
        'name':editStudent.name,
        'rollno':editStudent.rollno,
        'dob':editStudent.dob,
        'linkedin':editStudent.linkedin,
        'mailid':editStudent.mailid,
        'state':editStudent.state,
        'phone':editStudent.phone
      };
      studentService.editStudentRecords(editStudent.tempStuId, editStudentRec);
      $rootScope.$broadcast('curPageAftrEdit', true);
    };
    
  }]);