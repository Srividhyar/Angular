//List controller 
angular.module('studentApplication')
.controller('listStudentController', ['fetchStudentData', 'studentService', 'appConstant', '$location', '$http', '$scope', function(fetchStudentData, studentService, appConstant, $location, $http, $scope) {
    var listStudent = this;
    listStudent.curPage = 1;
    listStudent.pageSize = 5;
    listStudent.recordPerPage = [2,4,5,10,20,50];
    //Default sorting is done with name in ascending order
    listStudent.predicate = 'name';
    listStudent.reverse = false;
    listStudent.students = fetchStudentData.data; 
    listStudent.sort = {
      column: 'name',
      descending: false
    };
    listStudent.editStudentRec = function(key, id) {
      angular.forEach(listStudent.students, function(value, index){
        if (id === value._id.$oid) {
          //var idx =(listStudent.curPage > 1) ? ((listStudent.pageSize*(listStudent.curPage-1)) + index) : index;
          window.location.href= "#EditStudent/"+index;
        }
      });
      localStorage.curPage = listStudent.curPage;
    }
    studentService.add({title:'Welcome',body:'Hello. This is an alert message'});
    listStudent.selectedCls = function(column) {
      return column == this.sort.column && 'sort-' + this.sort.descending;
    };
    
    listStudent.changeSorting = function(column) {
      var sort = this.sort;
      if (sort.column == column) {
        sort.descending = !sort.descending;
      } else {
        sort.column = column;
        sort.descending = false;
      }
    }; 

    listStudent.numberOfPages = function() {
      return Math.ceil(listStudent.students.length / listStudent.pageSize);
    }; 
    listStudent.updateRanger = function() {
      listStudent.curPage = 1;
      var range = [];
      for(var i=1;i<=listStudent.numberOfPages();i++) {
        range.push(i);
      }
      listStudent.range = range;
    }
    listStudent.updateRanger();
    //listStudent.curPage = localStorage.curPage;
    $scope.$on('curPageAftrEdit', function(ele, data) {
      console.log(data);
    });
    listStudent.setCurrent = function(currentVal) {

      listStudent.curPage = currentVal;
    }
    listStudent.chkNext = function() {
      if (listStudent.curPage < listStudent.numberOfPages()) {
        listStudent.curPage = listStudent.curPage+1;
      }
    }
    listStudent.chkPrev = function() {
      if (listStudent.curPage > 1) {
        listStudent.curPage = listStudent.curPage-1;
      }
    }
    listStudent.deleteStudent = function(studentId) {
      if(studentId) {                  
        studentService.deleteStudentRecords(studentId);
        angular.forEach(listStudent.students, function(value, index){
          if (studentId === value._id.$oid) {
            listStudent.students.splice(index,1);
          }
        });
        var currentRecLen = listStudent.students.length;
        if(currentRecLen % listStudent.pageSize == 0)  {
          listStudent.curPage = listStudent.curPage-1;
          listStudent.numberOfPages();
          listStudent.updateRanger();
        }  
      }
    } 
    }]);