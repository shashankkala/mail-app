var app = angular.module('mailApp', ['ngMaterial', 'ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'home.html',
		controller: 'mailController'
	})
	.when('/more',{
		templateUrl : 'more.html'
	})
	.when('/prime',{
		templateUrl: 'primeChecker.html',
		controller: 'primeController'
	})
	.when('/fibonacci',{
		templateUrl: 'fibonacciGenerator.html',
		controller: 'fibonacciController'
	})
	.when('/todo',{
		templateUrl: 'toDo.html',
		controller: 'toDoController'
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

app.controller('primeController', function($scope){
	$scope.flag = 0;
	
	//This function is called when 'Check' button is clicked and it will display whether the number you have entered is prime or not
	$scope.checkPrime = function(){
		if($scope.number == 1){
			$scope.isOne = true;
			return;
		}	
	
		for($scope.i = 2; $scope.i <= Math.sqrt(Math.floor($scope.number)); $scope.i++){
			if($scope.number % $scope.i == 0){
				$scope.flag = 1;
				break;
			}
		
		}
		if ($scope.flag == 0) $scope.isPrime = true;
		else $scope.isNotPrime = true;
		$scope.flag = 0;
		
	};
	
	//This function is called when 'Reset' button is clicked and it clears the input and clears the paragraph showing whether the number is prime or not and the validation message present if any.
	$scope.reset = function(){
		$scope.number = "";
		$scope.isNotPrime = false;
		$scope.isPrime = false;
		$scope.isOne = false;
		$scope.primeChecker.number.$dirty = false;
	};
	
	//This function is called whenever the input field is modified and it clears the paragraph showing whether the number is prime or not.
	$scope.hide = function(){
		$scope.isNotPrime = false;
		$scope.isPrime = false;
		$scope.isOne = false;
		$scope.primeChecker.number.$dirty = true;
	};
});

app.controller('fibonacciController', function($scope){
	
	//This function is called when 'Generate' button is clicked. It stores the fibonacci sequence upto the number provided in the input in an array and then displays the content of this array as comma separated values.
	$scope.generateFibonacci = function(){
		$scope.prev = 0;
		$scope.current = 1;
		$scope.next = 0;
		$scope.sequence = [];
		$scope.pos = 0;
		while($scope.next <= $scope.number){
			$scope.sequence[$scope.pos] = $scope.next;
			$scope.prev = $scope.current;
			$scope.current = $scope.next;
			$scope.next = $scope.prev + $scope.current;
			$scope.pos++ ;
		}
		$scope.showNow = true;
	};
	
	//This function converts the array generated above into a string of comma separated values.
	$scope.displayArray = function(string){
        return string.join(", ");
    };
	
	//This function is called whenever the input field is modified and it clears the paragraph displaying the fibonacci sequence.
	$scope.hide = function(){
	    $scope.showNow = false;
		$scope.fibonacciGenerator.number.$dirty = true;
	};
	
	//This function is called when 'Reset' button is clicked and it clears the input and clears the paragraph displaying the array and the validation message present if any. 
	$scope.reset = function(){
	    $scope.number = "";
		$scope.showNow = false;
		$scope.fibonacciGenerator.number.$dirty = false;
	};
});

app.controller('toDoController', function($scope) {
    $scope.toDoList = [{toDoText:'Learn Node.js', done:false}];
	
	$scope.changeState = function(){
		$scope.toDoForm.toDoInput.$dirty = true;
	};
	
    $scope.addTask = function() {
		$scope.toDoForm.toDoInput.$dirty = false;
        $scope.toDoList.push({toDoText:$scope.toDoInput, done:false});
        $scope.toDoInput = "";
    };

    $scope.removeTask = function() {
        var oldList = $scope.toDoList;
        $scope.toDoList = [];
        angular.forEach(oldList, function(x) {
            if (!x.done) $scope.toDoList.push(x);
        });
    };

});