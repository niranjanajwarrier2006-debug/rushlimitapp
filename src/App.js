import React, { useState, useEffect } from 'react';
import { Bus, Users, TrendingUp, MapPin, Clock, CheckCircle, AlertTriangle, BarChart3, Zap, Navigation, Bell, LogOut, Search, Calendar } from 'lucide-react';

const RushLimitApp = () => {
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [availableBuses, setAvailableBuses] = useState(null);
  const [busesDeployed, setBusesDeployed] = useState(false);
  
  // Passenger states
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [assignedBus, setAssignedBus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [trackingBus, setTrackingBus] = useState(null);

  const [routes] = useState([
    {
      id: 1,
      routeNumber: '42',
      name: 'Trivandrum Central - Kovalam',
      from: 'Trivandrum Central',
      to: 'Kovalam Beach',
      distance: '16 km',
      times: ['06:00', '07:00', '08:00', '09:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
      checkedInUsers: 45,
      predictedTotal: 68,
      shadowDemand: 23,
      flakeRate: 15,
      basesNeeded: 2,
      status: 'overcrowded',
      mapCenter: { lat: 8.5241, lng: 76.9366 }
    },
    {
      id: 2,
      routeNumber: '18',
      name: 'Thampanoor - Technopark',
      from: 'Thampanoor',
      to: 'Technopark Phase 3',
      distance: '12 km',
      times: ['06:30', '07:30', '08:30', '09:30', '17:00', '18:00', '19:00'],
      checkedInUsers: 52,
      predictedTotal: 64,
      shadowDemand: 12,
      flakeRate: 12,
      basesNeeded: 2,
      status: 'optimal',
      mapCenter: { lat: 8.5500, lng: 76.8800 }
    },
    {
      id: 3,
      routeNumber: '7',
      name: 'East Fort - Vizhinjam',
      from: 'East Fort',
      to: 'Vizhinjam Port',
      distance: '18 km',
      times: ['05:30', '07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00'],
      checkedInUsers: 28,
      predictedTotal: 35,
      shadowDemand: 7,
      flakeRate: 10,
      basesNeeded: 1,
      status: 'optimal',
      mapCenter: { lat: 8.4800, lng: 76.9500 }
    },
    {
      id: 4,
      routeNumber: '22',
      name: 'Trivandrum Zoo - Airport',
      from: 'Museum/Zoo',
      to: 'Trivandrum International Airport',
      distance: '8 km',
      times: ['05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
      checkedInUsers: 38,
      predictedTotal: 48,
      shadowDemand: 10,
      flakeRate: 8,
      basesNeeded: 1,
      status: 'optimal',
      mapCenter: { lat: 8.4850, lng: 76.9200 }
    },
    {
      id: 5,
      routeNumber: '33',
      name: 'Kazhakootam - Medical College',
      from: 'Kazhakootam',
      to: 'Medical College',
      distance: '14 km',
      times: ['06:00', '07:00', '08:00', '13:00', '14:00', '17:00', '18:00'],
      checkedInUsers: 18,
      predictedTotal: 25,
      shadowDemand: 7,
      flakeRate: 14,
      basesNeeded: 1,
      status: 'underutilized',
      mapCenter: { lat: 8.5700, lng: 76.8800 }
    }
  ]);

  const [busFleet] = useState([
    { id: 1, licensePlate: 'KL-01-AB-1234', capacity: 50, routeAssigned: '42', status: 'active', currentOccupancy: 42, location: { lat: 8.5241, lng: 76.9366 } },
    { id: 2, licensePlate: 'KL-01-CD-5678', capacity: 50, routeAssigned: '42', status: 'active', currentOccupancy: 38, location: { lat: 8.5120, lng: 76.9550 } },
    { id: 3, licensePlate: 'KL-01-EF-9012', capacity: 45, routeAssigned: '18', status: 'active', currentOccupancy: 40, location: { lat: 8.5500, lng: 76.8800 } },
    { id: 4, licensePlate: 'KL-01-GH-3456', capacity: 50, routeAssigned: '18', status: 'active', currentOccupancy: 35, location: { lat: 8.5450, lng: 76.8950 } },
    { id: 5, licensePlate: 'KL-01-IJ-7890', capacity: 40, routeAssigned: '7', status: 'active', currentOccupancy: 28, location: { lat: 8.4800, lng: 76.9500 } },
    { id: 6, licensePlate: 'KL-01-KL-2345', capacity: 45, routeAssigned: '22', status: 'active', currentOccupancy: 32, location: { lat: 8.4850, lng: 76.9200 } },
    { id: 7, licensePlate: 'KL-01-MN-6789', capacity: 40, routeAssigned: '33', status: 'standby', currentOccupancy: 0, location: { lat: 8.5700, lng: 76.8800 } },
  ]);

  const mlInsights = {
    averageFlakeRate: 12.5,
    shadowDemandAccuracy: 91,
    todaySavings: 3450,
    weeklyPredictionAccuracy: 89,
    peakHourPrediction: '08:00 - 09:00 AM',
    weatherImpact: 'Moderate rain expected - 15% increased demand',
    specialEvents: 'Attukal Pongala next week - Deploy 40% more buses'
  };

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Zap className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">RUSH LIMIT</h1>
          <p className="text-gray-600">Proactive Transit Network</p>
          <p className="text-sm text-indigo-600 font-medium mt-2">Trivandrum City Transport</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => {
              setUserType('passenger');
              setIsLoggedIn(true);
              setCurrentUser({ name: 'Passenger User', id: 'P001' });
            }}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition transform hover:scale-105 flex items-center justify-center gap-3"
          >
            <Users size={24} />
            Login as Passenger
          </button>

          <button
            onClick={() => {
              setUserType('busowner');
              setIsLoggedIn(true);
              setCurrentUser({ name: 'Bus Owner', id: 'BO001' });
            }}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-4 rounded-xl transition transform hover:scale-105 flex items-center justify-center gap-3"
          >
            <Bus size={24} />
            Login as Bus Owner
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Mark your attendance 10 hours before travel • Get priority boarding • Track your bus in real-time
          </p>
        </div>
      </div>
    </div>
  );

  const BusDeploymentInput = () => {
    const [inputValue, setInputValue] = useState('');

    const handleDeployBuses = () => {
      const numBuses = parseInt(inputValue);
      if (numBuses > 0) {
        setAvailableBuses(numBuses);
        setBusesDeployed(true);
      } else {
        alert('Please enter a valid number of buses');
      }
    };

    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Bus className="text-white" size={40} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Bus Deployment</h1>
            <p className="text-gray-400">How many buses can you deploy today?</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Number of Buses Available</label>
              <input
                type="number"
                min="1"
                max="20"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-700 text-white text-2xl font-bold text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0"
              />
            </div>

            <button
              onClick={handleDeployBuses}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-4 rounded-xl transition transform hover:scale-105"
            >
              Continue to Dashboard
            </button>

            <button
              onClick={() => {
                setIsLoggedIn(false);
                setUserType(null);
              }}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition"
            >
              Back to Login
            </button>
          </div>

          <div className="mt-6 bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-300 text-center">
              <BarChart3 className="inline mr-2" size={16} />
              Total buses needed today: {routes.reduce((sum, r) => sum + r.basesNeeded, 0)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const PassengerView = () => {
    const filteredRoutes = routes.filter(route =>
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.routeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.to.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleMarkAttendance = (route, time) => {
      const routeBuses = busFleet.filter(bus => bus.routeAssigned === route.routeNumber && bus.status === 'active');
      const randomBus = routeBuses[Math.floor(Math.random() * routeBuses.length)];
      
      setSelectedRoute(route);
      setSelectedTime(time);
      setAssignedBus(randomBus);
      setAttendanceMarked(true);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Zap size={32} />
                <div>
                  <h1 className="text-2xl font-bold">RUSH LIMIT</h1>
                  <p className="text-sm opacity-90">Trivandrum Transit</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setUserType(null);
                  setAttendanceMarked(false);
                  setSelectedRoute(null);
                  setAssignedBus(null);
                }}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition"
              >
                <LogOut size={20} />
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search routes, stops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6">
          {attendanceMarked && assignedBus && (
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border-2 border-green-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500 p-3 rounded-full">
                  <CheckCircle className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-900">Attendance Marked!</h2>
                  <p className="text-green-700">Your spot is reserved</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl mb-4">
                <p className="text-sm opacity-90 mb-2">YOUR ASSIGNED BUS</p>
                <p className="text-3xl font-bold mb-1">{assignedBus.licensePlate}</p>
                <p className="text-lg">{selectedRoute.name}</p>
                <div className="mt-4 pt-4 border-t border-white border-opacity-30">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm opacity-90">Date</p>
                      <p className="font-semibold">{new Date(selectedDate).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Time</p>
                      <p className="font-semibold">{selectedTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Boarding Point</p>
                  <p className="font-semibold text-gray-900">{selectedRoute.from}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Destination</p>
                  <p className="font-semibold text-gray-900">{selectedRoute.to}</p>
                </div>
              </div>

              <button
                onClick={() => setTrackingBus(assignedBus)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Navigation size={20} />
                Track My Bus Live
              </button>
            </div>
          )}

          {!attendanceMarked && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Select Travel Date</h3>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={getMinDate()}
                max={getMaxDate()}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
              />
              <p className="text-sm text-gray-600 mt-2">
                <Clock size={16} className="inline mr-1" />
                Mark attendance at least 10 hours before travel
              </p>
            </div>
          )}

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Routes</h2>
          <div className="space-y-4">
            {filteredRoutes.map(route => (
              <div key={route.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-indigo-600 text-white px-3 py-1 rounded-lg font-bold text-lg">
                        {route.routeNumber}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{route.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin size={16} />
                      <span className="text-sm">{route.from} → {route.to}</span>
                    </div>
                    <p className="text-sm text-gray-500">{route.distance}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Available Times:</p>
                  <div className="flex flex-wrap gap-2">
                    {route.times.map(time => (
                      <button
                        key={time}
                        onClick={() => handleMarkAttendance(route, time)}
                        disabled={attendanceMarked}
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                          attendanceMarked
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Checked In</p>
                    <p className="text-lg font-bold text-indigo-600">{route.checkedInUsers}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Predicted</p>
                    <p className="text-lg font-bold text-purple-600">{route.predictedTotal}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Buses</p>
                    <p className="text-lg font-bold text-green-600">{route.basesNeeded}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Predicted occupancy</span>
                    <span className="font-semibold">{Math.round((route.predictedTotal / (route.basesNeeded * 50)) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        route.status === 'overcrowded' ? 'bg-red-500' : 
                        route.status === 'optimal' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{width: `${Math.min((route.predictedTotal / (route.basesNeeded * 50)) * 100, 100)}%`}}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {trackingBus && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-screen overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Live Bus Tracking</h2>
                <button
                  onClick={() => setTrackingBus(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  aria-label="Close tracking"
                >
                  ✕
                </button>
              </div>

              <div className="bg-gray-100 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-600 mb-2">Tracking Bus</p>
                <p className="text-2xl font-bold text-indigo-600">{trackingBus.licensePlate}</p>
              </div>

              <div className="mb-4 rounded-xl overflow-hidden" style={{height: '400px'}}>
                {/* Safe Google Maps embed without API key */}
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Live Bus Tracking</h3>
                    <p className="text-gray-600 mb-4">Bus {trackingBus.licensePlate} is on Route {trackingBus.routeAssigned}</p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Current Location</p>
                      <p className="font-bold">Near {routes.find(r => r.routeNumber === trackingBus.routeAssigned)?.from}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Current Occupancy</p>
                  <p className="text-2xl font-bold text-blue-600">{trackingBus.currentOccupancy}/{trackingBus.capacity}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">ETA to Your Stop</p>
                  <p className="text-2xl font-bold text-green-600">8 min</p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <div className="flex items-center gap-2">
                  <Bell className="text-yellow-600" size={20} />
                  <p className="text-yellow-900 font-medium">Your bus is 2 km away</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const BusOwnerView = () => {
    const totalCapacity = busFleet.reduce((sum, bus) => sum + bus.capacity, 0);
    const totalOccupied = busFleet.reduce((sum, bus) => sum + bus.currentOccupancy, 0);
    const activeBuses = busFleet.filter(bus => bus.status === 'active').length;
    const totalBusesNeeded = routes.reduce((sum, r) => sum + r.basesNeeded, 0);

    return (
      <div className="min-h-screen bg-gray-900 text-white pb-20">
        <div className="bg-gray-800 p-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-3 rounded-xl">
                  <BarChart3 size={32} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">RUSH LIMIT</h1>
                  <p className="text-gray-400">Bus Owner Dashboard - Trivandrum</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-green-600 px-6 py-3 rounded-lg">
                  <p className="text-sm opacity-90">Buses Available</p>
                  <p className="text-2xl font-bold">{availableBuses || 0}</p>
                </div>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUserType(null);
                    setBusesDeployed(false);
                    setAvailableBuses(null);
                  }}
                  className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition"
                  aria-label="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          {availableBuses < totalBusesNeeded && (
            <div className="bg-orange-900 border border-orange-600 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-orange-400" size={32} />
                <div>
                  <p className="text-xl font-bold">⚠️ Insufficient Buses</p>
                  <p className="text-gray-300">You have {availableBuses} buses available, but need {totalBusesNeeded} to cover all routes optimally.</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="text-indigo-400" size={24} />
                <p className="text-gray-400 text-sm">Total Check-ins Today</p>
              </div>
              <p className="text-4xl font-bold">{routes.reduce((sum, r) => sum + r.checkedInUsers, 0)}</p>
              <p className="text-green-400 text-sm mt-1">+18% vs yesterday</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="text-purple-400" size={24} />
                <p className="text-gray-400 text-sm">Predicted Riders</p>
              </div>
              <p className="text-4xl font-bold">{routes.reduce((sum, r) => sum + r.predictedTotal, 0)}</p>
              <p className="text-blue-400 text-sm mt-1">ML prediction</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Bus className="text-yellow-400" size={24} />
                <p className="text-gray-400 text-sm">Active Buses</p>
              </div>
              <p className="text-4xl font-bold">{activeBuses}</p>
              <p className="text-green-400 text-sm mt-1">All routes covered</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="text-green-400" size={24} />
                <p className="text-gray-400 text-sm">Efficiency Score</p>
              </div>
              <p className="text-4xl font-bold">92%</p>
              <p className="text-green-400 text-sm mt-1">Optimal deployment</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap size={24} />
              ML Engine Real-Time Insights
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-gray-300 text-sm mb-2">Average Flake Rate</p>
                <p className="text-3xl font-bold">{mlInsights.averageFlakeRate}%</p>
                <p className="text-gray-400 text-xs mt-1">Users who check-in but don't board</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm mb-2">Shadow Demand Accuracy</p>
                <p className="text-3xl font-bold">{mlInsights.shadowDemandAccuracy}%</p>
                <p className="text-gray-400 text-xs mt-1">Prediction vs actual walk-ins</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm mb-2">Today's Savings</p>
                <p className="text-3xl font-bold">₹{mlInsights.todaySavings}</p>
                <p className="text-gray-400 text-xs mt-1">From optimized deployments</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white border-opacity-20">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 mb-1">Peak Hour Prediction</p>
                  <p className="font-bold">{mlInsights.peakHourPrediction}</p>
                </div>
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 mb-1">Weather Impact</p>
                  <p className="font-bold text-sm">{mlInsights.weatherImpact}</p>
                </div>
              </div>
              <div className="bg-orange-900 bg-opacity-50 border border-orange-600 p-4 rounded-lg mt-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="text-orange-400" size={20} />
                  <p className="font-bold text-orange-200">{mlInsights.specialEvents}</p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Route Performance & Deployment</h2>
          <div className="space-y-4">
            {routes.map(route => (
              <div key={route.id} className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-600 px-4 py-2 rounded-lg">
                      <p className="text-2xl font-bold">{route.routeNumber}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{route.name}</h3>
                      <p className="text-gray-400 text-sm">{route.from} → {route.to} ({route.distance})</p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-semibold ${
                    route.status === 'overcrowded' ? 'bg-red-500' :
                    route.status === 'optimal' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}>
                    {route.status === 'overcrowded' ? '⚠️ Deploy Shadow Bus' :
                     route.status === 'optimal' ? '✓ Optimal' : '⚡ Low Demand'}
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-4 mb-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-400 text-xs mb-1">Check-ins</p>
                    <p className="text-2xl font-bold text-indigo-400">{route.checkedInUsers}</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-400 text-xs mb-1">Shadow Demand</p>
                    <p className="text-2xl font-bold text-purple-400">+{route.shadowDemand}</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-400 text-xs mb-1">Total Predicted</p>
                    <p className="text-2xl font-bold text-blue-400">{route.predictedTotal}</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-400 text-xs mb-1">Flake Rate</p>
                    <p className="text-2xl font-bold text-yellow-400">{route.flakeRate}%</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-400 text-xs mb-1">Buses Needed</p>
                    <p className="text-2xl font-bold text-green-400">{route.basesNeeded}</p>
                  </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Predicted Load per Bus</span>
                    <span className="font-semibold">{Math.round((route.predictedTotal / route.basesNeeded) / 50 * 100)}% capacity</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full ${
                        route.status === 'overcrowded' ? 'bg-red-500' :
                        route.status === 'optimal' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{width: `${Math.min((route.predictedTotal / route.basesNeeded) / 50 * 100, 100)}%`}}
                    />
                  </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-3">Deployed Buses on Route {route.routeNumber}:</p>
                  <div className="grid grid-cols-3 gap-3">
                    {busFleet
                      .filter(bus => bus.routeAssigned === route.routeNumber)
                      .map(bus => (
                        <div key={bus.id} className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                          <p className="font-bold text-sm mb-1">{bus.licensePlate}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Users size={14} />
                            <span>{bus.currentOccupancy}/{bus.capacity}</span>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-1.5 mt-2">
                            <div 
                              className="bg-indigo-500 h-1.5 rounded-full"
                              style={{width: `${(bus.currentOccupancy / bus.capacity) * 100}%`}}
                            />
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>

                {route.status === 'overcrowded' && (
                  <div className="bg-red-900 border border-red-600 rounded-lg p-4 mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle size={24} />
                      <div>
                        <p className="font-bold">⚠️ Action Required</p>
                        <p className="text-sm text-gray-300">Deploy 1 additional bus to prevent overcrowding</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert('Shadow bus deployment initiated for Route ' + route.routeNumber)}
                      className="bg-red-600 hover:bg-red-500 px-6 py-3 rounded-lg font-semibold transition"
                    >
                      Deploy Shadow Bus
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gray-800 rounded-xl p-6 mt-6">
            <h3 className="text-xl font-bold mb-4">Fleet Status Overview</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-400 text-sm mb-2">Total Fleet Capacity</p>
                <p className="text-3xl font-bold">{totalCapacity}</p>
                <p className="text-gray-400 text-xs mt-1">seats across all buses</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-400 text-sm mb-2">Currently Occupied</p>
                <p className="text-3xl font-bold text-indigo-400">{totalOccupied}</p>
                <p className="text-gray-400 text-xs mt-1">{Math.round((totalOccupied / totalCapacity) * 100)}% utilization</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-400 text-sm mb-2">Available Seats</p>
                <p className="text-3xl font-bold text-green-400">{totalCapacity - totalOccupied}</p>
                <p className="text-gray-400 text-xs mt-1">for walk-in passengers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  if (userType === 'busowner' && !busesDeployed) {
    return <BusDeploymentInput />;
  }

  if (userType === 'passenger') {
    return <PassengerView />;
  }

  if (userType === 'busowner') {
    return <BusOwnerView />;
  }

  return null;
};

export default RushLimitApp;