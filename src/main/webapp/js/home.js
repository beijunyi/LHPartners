//Authored by http://www.beijunyi.com on 17th March 2014

FADE_OUT_DURATION = 1000;
FADE_OUT_EASING = "swing";

FADE_IN_DURATION = 1000;
FADE_IN_EASING = "swing";

SLIDE_SHOW_DURATION = 4000;

SLIDE_MIN = 1;
SLIDE_MAX = 6;

app.controller('HomeController', ['$scope', '$timeout',
  function($scope, $timeout) {

    var currentSlideImage, currentSlideText;
    var promise;

    function hideCurrent(callback) {
      if(currentSlideImage) {
        currentSlideImage.fadeOut({
          duration: FADE_OUT_DURATION,
          easing: FADE_OUT_EASING,
          start: function() {
            if(currentSlideText) {
              currentSlideText.fadeOut({
                duration: FADE_OUT_DURATION,
                easing: FADE_OUT_EASING,
                complete: function() {
                  currentSlideText = null;
                }
              });
            }
          },
          complete: function() {
            currentSlideImage = null;
            callback();
          }
        });
      } else
        callback();
    }

    function showCurrent(callback) {
      if(currentSlideImage) {
        currentSlideImage.fadeIn({
          duration: FADE_IN_DURATION,
          easing: FADE_IN_EASING,
          start: function() {
            if(currentSlideText) {
              currentSlideText.fadeIn({
                duration: FADE_IN_DURATION,
                easing: FADE_IN_EASING
              });
            }
          },
          complete: function() {
            callback();
          }
        });
      } else
        callback();
    }

    function fadeCycle(callback) {
      function hideStep() {
        hideCurrent(callback);
      }
      function displayStep() {
        promise = $timeout(hideStep, SLIDE_SHOW_DURATION);
      }
      function showStep() {
        showCurrent(displayStep)
      }
      showStep();
    }

    function showSlide(slide, callback) {
      currentSlideImage = $('#home-slide' + slide + '-image');
      currentSlideText = $('#home-slide' + slide + '-text');
      fadeCycle(callback);
    }

    function showSlides() {
      var currentSlide;

      function showNextSlide() {
        if(!currentSlide || currentSlide >= SLIDE_MAX)
          currentSlide = SLIDE_MIN;
        else
          currentSlide++;
        showSlide(currentSlide, showNextSlide);
      }

      showNextSlide();

    }

    $scope.$on('$locationChangeStart', function(){
      $timeout.cancel(promise);
    });

    $scope.$on('$destroy', function(){
      $timeout.cancel(promise);
    });

    showSlides();

  }
]);