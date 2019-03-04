angular.module('studentApplication')
.service('studentService', function(appConstant, $location, $q, $http, $rootScope) {
	var responseData = null;
	this.studentRecords = [];
	this.retrieveStudentRecords = function(){
		var deferred = $q.defer();
		$rootScope.loader = true;
		$http.get(appConstant.mongoAPIUrl+'?apiKey='+appConstant.mongoAPI).then(
			function successCall(response){
				deferred.resolve(response);
				$rootScope.studentRecords = response.data;
				responseData = response.data;
				console.log('http', responseData)
				$rootScope.loader = false;
			}, function errorCall(response){
				deferred.reject(response);
				$rootScope.loader = false;
			});
		return deferred.promise;
	}; 
	this.createStudentRecords = function(newStudentRecord) {
		var deferred = $q.defer();
		$rootScope.loader = true;
		$http.post(appConstant.mongoAPIUrl+'?apiKey='+appConstant.mongoAPI,newStudentRecord).then(
			function successCall(response){
				deferred.resolve(response);
				$rootScope.loader = false;
				$location.path("/StudentList");
			}, function errorCall(response){
				deferred.reject(response);
				$rootScope.loader = false;
			});
		return deferred.promise;
	};
	this.getStudentRecords = function(idx) {
		return $rootScope.studentRecords[idx];
	};
	this.editStudentRecords = function(tempStuId, editStudentRec) {
		var deferred = $q.defer();
		$rootScope.loader = true;
		$http.put(appConstant.mongoAPIUrl+'/'+tempStuId+'?apiKey='+appConstant.mongoAPI,editStudentRec).then( 
			function successCall(response){
				deferred.resolve(response.data);
				$rootScope.loader = false;
				$location.path("/StudentList/success");
			}, function errorCall(response){
				deferred.reject(response);
				$rootScope.loader = false;
				console.log('Error in updating student record');
			});
		return deferred.promise;
	};
	this.deleteStudentRecords = function(studentId) {
		var deferred = $q.defer();
		$http.delete(appConstant.mongoAPIUrl+'/'+studentId+'?apiKey='+appConstant.mongoAPI).then( 
			function successCall(response){
				deferred.resolve(response.data);
				$location.path("/StudentList");
			}, function errorCall(response){
				deferred.reject(response);
				console.log('Error in updating student record');
			});
		return deferred.promise;
	};
	var queue = [];
	this.queue = queue;
	this.add = function( item ) {
		queue.push(item);
		setTimeout(function(){
          // remove the alert after 2000 ms
          $('.alerts .alert').eq(0).remove();
          queue.shift();
      },2000);
	};
	this.pop = function(){
		return this.queue.pop();       
	}; 
	this.states = {
		"AP":"Andhra Pradesh",
		"AR":"Arunachal Pradesh",
		"AS":"Assam",
		"BR":"Bihar",
		"CG":"Chhattisgarh",
		"Chandigarh":"Chandigarh",
		"DN":"Dadra and Nagar Haveli",
		"DD":"Daman and Diu",
		"DL":"Delhi",
		"GA":"Goa",
		"GJ":"Gujarat",
		"HR":"Haryana",
		"HP":"Himachal Pradesh",
		"JK":"Jammu and Kashmir",
		"JH":"Jharkhand",
		"KA":"Karnataka",
		"KL":"Kerala",
		"MP":"Madhya Pradesh",
		"MH":"Maharashtra",
		"MN":"Manipur",
		"ML":"Meghalaya",
		"MZ":"Mizoram",
		"NL":"Nagaland",
		"OR":"Orissa",
		"PB":"Punjab",
		"PY":"Pondicherry",
		"RJ":"Rajasthan",
		"SK":"Sikkim",
		"TN":"Tamil Nadu",
		"TR":"Tripura",
		"UP":"Uttar Pradesh",
		"UK":"Uttarakhand",
		"WB":"West Bengal"
	};  
});
