module.exports = function($scope, syncData) {
  syncData('syncedValue').$bind($scope, 'syncedValue');
};
