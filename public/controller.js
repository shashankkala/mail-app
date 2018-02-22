var app = angular.module('mailApp', ['ngMaterial', 'ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/more',{
		templateUrl : 'more.html'
	})
	.otherwise({
		redirectTo : '/' 
	});
});

app.controller('mailController', ['$scope', '$http', '$mdToast', '$animate', '$location',
	function($scope, $http, $mdToast, $animate, $location){
		
		$scope.toastPosition = {
			bottom: false,
			top: true,
			left: false,
			right: true
		};
		
		$scope.getToastPosition = function(){
			return Object.keys($scope.toastPosition)
				.filter(function (pos){
					return $scope.toastPosition[pos];
				})
				.join(' ');
		};
		
		//executed when 'Send Mail' button is pressed
		$scope.sendMail = function(){
			$mdToast.show(
						$mdToast.simple()
							.content('Your message is being sent to : '+$scope.toEmail)
							.position($scope.getToastPosition())
							.hideDelay(5000)
			
					);
			var data = ({
				toEmail : $scope.toEmail,
				subject : $scope.subject,
				mailMessage : $scope.mailMessage
			});
			
			$http.post('/mailForm', data)
				.success(function(data, status, headers, config) {
					$mdToast.show(
						$mdToast.simple()
							.content('Your message was delivered successfully to : '+data.toEmail)
							.position($scope.getToastPosition())
							.hideDelay(5000)
			
					);	
			
				})
				.error(function(data, status, headers, config) {
					$mdToast.show(
						$mdToast.simple()
							.content('An error occurred while sending the mail')
							.position($scope.getToastPosition())
							.hideDelay(5000)
			
					);
				});	
			
		};
		
		$scope.resetData = function(){
			$scope.toEmail = "";
			$scope.sendEmailForm.toEmail.$dirty = false;
			$scope.subject = "";
			$scope.mailMessage = "";
		};
		
		$scope.changeState = function(){
			$scope.sendEmailForm.toEmail.$dirty = true;
		};
		
		$scope.moreApps = function(){
			/* $mdToast.show(
						$mdToast.simple()
							.content('Redirecting...')
							.position($scope.getToastPosition())
							.hideDelay(5000)
			
					); */
			console.log('inside function moreApps');
			$location.path('/more');
		};
		
	}
]);