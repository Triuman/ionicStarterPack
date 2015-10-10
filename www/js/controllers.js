angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $location, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  $scope.loginData = {};

  $scope.loggedIn = false;
  $scope.doLogin = function (){
    $scope.loggedIn = true;
    $scope.loginData.loginDate = Date.now();



    var deviceInformation = ionic.Platform.device();
    $scope.device = {};
    $scope.device.model = deviceInformation.model || "Unknown";
    $scope.device.platform = deviceInformation.platform || ionic.Platform.platform();


    $location.path("/app/dashboard");
  };

  $scope.registerData = {};

  $scope.doRegister = function (){
    var alertPopup = $ionicPopup.alert({
      title: 'Register',
      template: 'Kullanıcı oluşturuldu!'
    });
    alertPopup.then(function(res) {
      $location.path("/app/login");
    });



  };
    
  $scope.logout = function (){
    $scope.loggedIn = false;
    $location.path("/app/login");
  };

})
  .controller('LocationCtrl', function($scope, $cordovaGeolocation, $ionicLoading) {
    //document.addEventListener("deviceready", onDeviceReady, false);


      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
      });

      var posOptions = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      };
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        var lat  = position.coords.latitude || 25;
        var long = position.coords.longitude || 25;

        var myLatlng = new google.maps.LatLng(lat, long);

        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'You are here!'
        });

        $scope.map = map;
        $ionicLoading.hide();

      }, function(err) {
        $ionicLoading.hide();
        console.log(err);
      });


  })
  .controller('ContactsCtrl', function($scope, $cordovaContacts, $ionicPlatform, $ionicLoading) {
    $ionicPlatform.ready(function() {
      $ionicLoading.show({
        template: 'Loading...'
      });

      $scope.contacts = [];

      var options = {};
      options.multiple = true;
      options.hasPhoneNumber = true;
      options.fields = ['name.formatted', 'phoneNumbers'];
      $cordovaContacts.find(options).then(function(result) {
  //      $scope.contacts = result;


        for (var i = 0; i < result.length; i++) {
          var contact = result[i];
          if(contact.phoneNumbers != null)
            $scope.contacts.push(contact);
        }

        //var contactsWithAtLeastOnePhoneNumber = _.filter(result, function(contact){
        //  return contact.phoneNumbers.length > 0
        //});

        //
        // Contacts with at least one phone number...
        //$scope.contacts = contactsWithAtLeastOnePhoneNumber;

        $ionicLoading.hide();

      }, function(error) {
        $scope.contacts = "ERROR: " + error;
      });

    });
  })

.controller('DatePickerCtrl', function($scope, $cordovaDatePicker) {

    $scope.now = Date.now();

    $scope.showDatePicker = function(){
      var options = {
        date: new Date(),
        mode: 'time', // or 'time'
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      };

      $cordovaDatePicker.show(options).then(function(date){
        $scope.now = date;
      });
    };

  });
