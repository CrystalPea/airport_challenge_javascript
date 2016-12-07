describe("Airport", function() {
  var airport;

  beforeEach(function() {
    airport = new Airport();
    airport.isStormy = false;
    plane = jasmine.createSpyObj("Plane", ['land', 'takeOff']);
  });

  describe("land", function() {
    beforeEach(function(){
      airport.land(plane);
    });

    it("instructs a plane to land", function() {
      expect(plane.land).toHaveBeenCalled();
    });

    it("should store airplanes", function(){
      expect(airport.hangar).toEqual([plane]);
    });
  });

  describe("takeOff", function() {
    it("instructs a plane to take off", function() {
      airport.land(plane);
      airport.takeOff(plane);
      expect(plane.takeOff).toHaveBeenCalled();
    });
    it("checks if a plane taking off is in a hangar", function() {
      expect(function(){airport.takeOff(plane)}).toThrowError("Plane is not on this airport")
    });
  });

  describe("Weather", function(){
    beforeEach(function(){
      airport.land(plane);
      airport.isStormy = true;
    })
    
    it("should not take off when stormy", function(){
      var message = "Can't take off as it is stormy";
      expect(function(){airport.takeOff(plane)}).toThrowError(message);
    });
  });
});
