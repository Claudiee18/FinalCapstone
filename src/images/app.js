  // Initialize the map
  const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -1,
    maxZoom: .5,
    zoomSnap: 0.5,
    zoomDelta: 0.5,
    dragging: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    zoomControl: true
  });

  // Pag set sa image apil ang bounderies
  const bounds = [[0, 0], [1080, 1920]];
  const image = L.imageOverlay('FinalMapMap.jpg', bounds).addTo(map)
 map.fitBounds(bounds);

  /// Icons sa current location og destination
  const currentLocationIcon = L.icon({
    iconUrl: 'greenmarker.png', 
    iconSize: [18,18], 
    iconAnchor: [10, 12],
  });

  const destinationIcon = L.icon({
    iconUrl: 'Flag.png',
    iconSize: [15, 15], 
    iconAnchor: [10, 12]
  });


  function ForWelcomePage() {
    window.location.href = 'WelcomePage.html';
}
 

  // Marker data as an object
  const markersData = {
    "gate1": { 
      position: [521, 160]  ,
      name: "Gate 1",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/Gate3.jpg" },

    "Gate2": { 
      position: [320, 590],
      name: "Gate 2",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/Gate2.jpg"
     },

    "gate3": { 
      position:[155, 760],
      name: "Gate 3",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/Gate1.jpg"
      },

    "Bagobo Building": { 
      position: [650, 1345],
      name: "Bagobo",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/Bagobo.jpg" },

    "Badjao Building": {
      position: [512, 1670],
      name: "Badjao",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/Badjao.jpg" },


    "Benitez": { 
      position: [500, 690],
      name: "Benitez",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/Benitez1.jpg"
     },

    "Campus Ministry": { 
      position: [823, 520],
      name: "Campus Ministry",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/CampusMinistry.jpg"
     },

    "Canteen": { 
      position: [734, 898],
      name: "Cateen",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/Canteen.jpg" },

    "Clinic/Health Center": { 
      position: [810, 945],
      name: "Clinic",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/Clinic.jpg" },

    "Front Lawn": { 
      position: [440, 430],
      name: "Front Lawn",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/FrontLawn.jpg"
     },

    "FCB": { 
      position: [950, 1240],
      name: "FCB",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/FCB.jpg"
     },

    "Food Processing Inovation Center": { 
      position: [410, 1350],
      name: "Food Processing Center",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/FoodProcessing.jpg" },


    "JHS HE LAB": { 
      position: [818, 630],
      name: "JHS HE LAB",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/JHSHE.jpg" },

    "Juna Building": { 
      position: [670, 529],
      name: "Juna Building",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/Juna.jpg" },

    "Kalagan": { 
      position: [755, 1035],
      name: "Kalagan",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/Kalagan.jpg" },

    "Matigsalog Building": {
       position:[850, 435],
       name: "Matigsalog Building",
       image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/Matigsalog.jpg" },

    "Maranao Building": { 
      position: [970, 490],
      name: "Maranao Building",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/Maranao.jpg" },

    "Maguindanao Building": { 
      position: [1030, 590],
      name: "Maguidanao Building",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/Maguindanao.jpg" },

    "Mansaka Building": { 
      position: [880, 720],
      name: "Mansaka Building",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/Mansaka.jpg"
    },

    "Mandaya Building": { 
      position: [900, 890],
      name:"Mandaya Building",
      image: "E:/ForCampusMap/NewMapSetUp/BuildingImages/Mandaya.jpg"
     },

    "Make Shift Classroom": { 
      position: [675, 1000],
      name: "Make Shift Building",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/MakeShift.jpg" },

    "Pavilion": { position: [570, 880] ,
                  name: "Pavilion",
                  image: "E:/ForCampusMap/NewMapSetUp/BuildingImages/Pavilion.jpg"
    },

    "PlayGround": { 
      position: [480, 1400],
      name: "Playground",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/Playground.jpg" },

    "Motor Pool": { 
      position: [120, 1150],
      name: "Motor Pool",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/MotorPool.jpg" },

    "RSM": { 
      position: [660, 250],
      name:"RSM Event Center",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/RSM1.jpg"
     },

    "Scouting Room": { 
      position: [595, 1520],
      name: "Scouting Room",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/Scouting.jpg" },

    "T'boli Building": { 
      position: [900, 375],
      name: "T'boli Building",
      image:"E:/ForCampusMap/NewMapSetUp/BuildingImages/Tboli.jpg" }
  };




  // Variables to hold the current location and destination markers
  let currentLocationMarker = null;
  let destinationMarker = null;

  // Function to add a marker to the map
  function addMarker(coords, title, icon) { 
      if (!icon) {
        console.error("Icon is undefined for marker:", title);
        return;
      }
    const marker = L.marker(coords, {icon: icon}).addTo(map).bindPopup(title);
    return marker;
  }

  // Add routesData with waypoints after markersData
  const routesData = {
    "gate3 to Gate2": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [320, 780],
      [370, 625],
      [320, 590], 
    ],

    "gate3 to gate1": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [540, 400],
      [540, 200],
      [540, 190],
      [521, 160]
    ],

    "gate3 to Bagobo Building": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [335, 915 ],
      [430, 1080],
      [485, 1200],
      [540, 1120],
      [650, 1345]

    ],
    "gate3 to Badjao Building": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [335, 915 ],
      [430, 1080],
      [620, 1400],
      [490, 1610]
      
      
    ],
    "gate3 to Benitez": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [320, 780],
      [390, 640],
      [420, 655]
    ],
    "gate3 to Campus Ministry": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [595, 280],
      [740, 490],
      [823, 520]

    ],
    "gate3 to Canteen": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [335, 915 ],
      [430, 1080],
      [485, 1200],
      [500, 1150],
      [690, 840 ],
      [734, 898]
    ],
    "gate3 to Clinic/Health Center": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [335, 915 ],
      [430, 1080],
      [485, 1200],
      [500, 1150],
      [730, 790],
      [810, 945]
    ],
    "gate3 to Front Lawn": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [500, 480],
      [440, 430]
    ],
    "gate3 to FCB": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [335, 915 ],
      [430, 1080],
      [485, 1200],
      [530, 1150],
      [675, 1380],
      [817, 1090],
      [950, 1240]
    ],
    "gate3 to Food Processing Inovation Center": [  
      [155, 749],
      [200, 825 ],
      [260, 920],
      [335, 915 ],
      [430, 1080],
      [410, 1350]
    ],
    "gate3 to JHS HE LAB": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [595, 280],
      [720, 490],
      [830, 600],
      [818, 630]

    ],
    "gate3 to Juna Building": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [480, 500],
      [590, 300],
      [715, 525],
      [692, 565], 
      [680, 540]


    ],
    "gate3 to Kalagan": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [335, 915 ],
      [430, 1080],
      [490, 1190],
      [535, 1075],
      [600, 1195],
      [715, 1000],
      [755, 1035]

    ],
    "gate3 to Matigsalog Building": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [595, 310],
      [740, 525],
      [800, 490],
      [825, 445],
      [850, 435]

    ],
    "gate3 to Maranao Building": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [595, 310],
      [740, 525],
      [820, 560],
      [850, 500],
      [840, 480]

    ],
    "gate3 to Maguindanao Building": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [595, 310],
      [740, 525],
      [820, 560],
      [940, 720],
      [990, 650],
      [999, 685],
      [1020, 620],
      [1000, 590]
    ],
    "gate3 to Mansaka Building": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [595, 310],
      [740, 525],
      [820, 560],
      [880, 720],
    ],
    "gate3 to Mandaya Building": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [410, 645],
      [485, 725],
      [545, 610],
      [585, 660],
      [615, 600],
      [695, 685],
      [715, 625],
      [885, 865]
    ],
    "gate3 to Make Shift Classroom": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [335, 915 ],
      [430, 1080],
      [490, 1190],
      [625,950],
      [675, 1000]

    ],
    "gate3 to Pavilion": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [320, 780],
      [390, 640],
      [420, 655],
      [515, 765],
      [475, 800],
      [570, 880]
    ],
    "gate3 to PlayGround": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [335, 915 ],
      [430, 1080],
      [490, 1190],
      [540, 1270],
      [480, 1400]
    ],
    "gate3 to Motor Pool": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [120, 1150]

    ],
    "gate3 to RSM": [
      [155, 749],
      [200, 825 ],
      [240, 900],
      [399, 640],
      [660, 250]
    ],
    "gate3 to Scouting Room": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [335, 915 ],
      [430, 1080],
      [490, 1190],
      [540, 1270],
      [640, 1450],
      [595, 1520]
    ],
    "gate3 to T'boli Building": [
      [155, 749],
      [200, 825 ],
      [260, 920],
      [595, 310],
      [710, 525],
      [800, 375]
    ],

    //Reverse of Gate 3

    "Gate2 to gate3": [
    [320, 590],
    [370, 625],
    [320, 780],
    [260, 920],
    [200, 825],
    [155, 749]
],

"gate1 to gate3": [
    [521, 160],
    [540, 190],
    [540, 200],
    [540, 400],
    [260, 920],
    [200, 825],
    [155, 749]
],

"Bagobo Building to gate3": [
    [650, 1345],
    [540, 1120],
    [485, 1200],
    [430, 1080],
    [335, 915],
    [260, 920],
    [200, 825],
    [155, 749]
],

"Badjao Building to gate3": [
    [490, 1610],
    [620, 1400],
    [430, 1080],
    [335, 915],
    [260, 920],
    [200, 825],
    [155, 749]
],

"Benitez to gate3": [
    [420, 655],
    [390, 640],
    [320, 780],
    [260, 920],
    [200, 825],
    [155, 749]
],

"Campus Ministry to gate3": [
    [823, 520],
    [740, 490],
    [595, 280],
    [260, 920],
    [200, 825],
    [155, 749]
],

"Canteen to gate3": [
    [734, 898],
    [690, 840],
    [500, 1150],
    [485, 1200],
    [430, 1080],
    [335, 915],
    [260, 920],
    [200, 825],
    [155, 749]
],

"Clinic/Health Center to gate3": [
    [810, 945],
    [730, 790],
    [500, 1150],
    [485, 1200],
    [430, 1080],
    [335, 915],
    [260, 920],
    [200, 825],
    [155, 749]
],

"Front Lawn to gate3": [
    [440, 430],
    [500, 480],
    [260, 920],
    [200, 825],
    [155, 749]
],

"FCB to gate3": [
    [950, 1240],
    [817, 1090],
    [675, 1380],
    [530, 1150],
    [485, 1200],
    [430, 1080],
    [335, 915],
    [260, 920],
    [200, 825],
    [155, 749]
],

"Food Processing Innovation Center to gate3": [
    [410, 1350],
    [430, 1080],
    [335, 915],
    [260, 920],
    [200, 825],
    [155, 749]
],

"JHS HE LAB to gate3": [
    [818, 630],
    [830, 600],
    [720, 490],
    [595, 280],
    [260, 920],
    [200, 825],
    [155, 749]
],

"Juna Building to gate3": [
  [680, 540],
  [692, 565],
  [715, 525],
  [590, 300],
  [480, 500],
  [260, 920],
  [200, 825],
  [155, 749]
],

"Kalagan to gate3": [
    [755, 1035],
    [715, 1000],
    [600, 1195],
    [535, 1075],
    [490, 1190],
    [430, 1080],
    [335, 915],
    [260, 920],
    [200, 825],
    [155, 749]
],

"Matigsalog Building to gate3": [
    [850, 435],
    [825, 445],
    [800, 490],
    [740, 525],
    [595, 310],
    [260, 920],
    [200, 825],
    [155, 749]
],
"Maranao Building to gate3": [
    [840, 480],
    [850, 500],
    [820, 560],
    [740, 525],
    [595, 310],
    [260, 920],
    [200, 825],
    [155, 749]
],

"Maguindanao Building to gate3": [
    [1000, 590],
    [1020, 620],
    [999, 685],
    [990, 650],
    [940, 720],
    [820, 560],
    [740, 525],
    [595, 310],
    [260, 920],
    [200, 825],
    [155, 749]
],

"Mansaka Building to gate3": [
    [880, 720],
    [820, 560],
    [740, 525],
    [595, 310],
    [260, 920],
    [200, 825],
    [155, 749]
],

"Mandaya Building to gate3": [
    [885, 865],
    [715, 625],
    [695, 685],
    [615, 600],
    [585, 660],
    [545, 610],
    [485, 725],
    [410, 645],
    [260, 920],
    [200, 825],
    [155, 749]
],

"Make Shift Classroom to gate3": [
    [675, 1000],
    [625, 950],
    [490, 1190],
    [430, 1080],
    [335, 915],
    [260, 920],
    [200, 825],
    [155, 749]
],

"Pavilion to gate3": [
    [570, 880],
    [475, 800],
    [515, 765],
    [420, 655],
    [390, 640],
    [320, 780],
    [260, 920],
    [200, 825],
    [155, 749]
],

"PlayGround to gate3": [
    [480, 1400],
    [540, 1270],
    [490, 1190],
    [430, 1080],
    [335, 915],
    [260, 920],
    [200, 825],
    [155, 749]
],

"Motor Pool to gate3": [
    [120, 1150],
    [260, 920],
    [200, 825],
    [155, 749]
],

"RSM to gate3": [
    [660, 250],
    [390, 640],
    [320, 780],
    [260, 920],
    [200, 825],
    [155, 749]
],

"Scouting Room to gate3": [
    [595, 1520],
    [640, 1450],
    [540, 1270],
    [490, 1190],
    [430, 1080],
    [335, 915],
    [260, 920], 
    [200, 825],
    [155, 749]
],

"T'boli Building to gate3": [
    [800, 375],
    [710, 525],
    [595, 310],
    [260, 920],
    [200, 825],
    [155, 749]
],



    



    //Gate2 To Buildings
    "gate2 to Gate3": [
      [320, 590],
      [120, 1118],
      [190, 1300],  
      [72, 1469]  
    ],

    "Gate2 to gate1": [
      [320, 590],
      [370, 650],
      [580, 290],
      [521, 160]
      
    ],
    "Gate2 to Bagobo Building": [
      [320, 590],
      [360, 650], 
      [270,840],
      [490, 1180],
      [530, 1130],
      [650, 1345]
      
    ],
    "Gate2 to Badjao Building": [
      [320, 590],
      [360, 650], 
      [270,840],
      [430, 1080],
      [620, 1400],
      [490, 1610]
      
    ],
    
    "Gate2 to Benitez": [
      [320, 590],  
      [400, 650],
      
      
    ],
    "Gate2 to Campus Ministry": [
      [320, 590], 
      [370, 650],
      [580, 290],
      [740, 520],
      [823, 520]

    ],
    "Gate2 to Canteen": [
      [320, 590],
      [400, 650],
      [500, 700],
      [585, 550],
      [600, 595],
      [690, 685],
      [750, 840],
      [750, 880]
    ],
    "Gate2 to Clinic/Health Center": [
      [320, 590],
      [400, 650],
      [500, 700],
      [585, 550],
      [600, 595],
      [690, 685],
      [820, 900],
      [810, 945],

    ],
    "Gate2 to Front Lawn": [
      [320, 590],  
      [400, 650],
      [500, 450],
      [440, 430]
    ],
    "Gate2 to FCB": [
      [320, 590],  
      [400, 650],
      [500, 700],
      [390, 885],
      [650, 1340],
      [800, 1110],
      [860, 1190]
      
    ],
    "Gate2 to Food Processing Inovation Center": [  
      [320, 590],    
      [380, 650],
      [250 ,915 ],
      [430, 1180],
      [410, 1350]
    ],
    "Gate2 to JHS HE LAB": [
      [320, 590],    
      [370, 650],
      [580, 290],
      [740, 520],
      [810, 565],
      [818, 630],

    ],
    "Gate2 to Juna Building": [
      [320, 590],    
      [370, 650],
      [590, 300],
      [715, 525],
      [692, 565], 
      [680, 540]
    ],
    "Gate2 to Kalagan": [
      [320, 590],
      [400, 650],
      [500, 700],
      [585, 550],
      [600, 595],
      [690, 685],
      [750, 885],
      [715, 1000],
      [745, 1025]

    ],
    "Gate2 to Matigsalog Building": [
      [320, 590],    
      [370, 650],
      [590, 300],
      [740, 525],
      [800, 490],
      [825, 445],
      [850, 435]

    ],
    "Gate2 to Maranao Building": [
      [320, 590],    
      [370, 650],
      [590, 300],
      [740, 525],
      [820, 560],
      [850, 500],
      [840, 480]


    ],
    "Gate2 to Maguindanao Building": [
      [320, 590],    
      [370, 650],
      [590, 300],
      [740, 525],
      [820, 560],
      [940, 720],
      [990, 650],
      [999, 685],
      [1020, 620],
      [1000, 590]
    ],
    "Gate2 to Mansaka Building": [
      [320, 590],    
      [370, 650],
      [590, 300],
      [740, 525],
      [820, 560],
      [880, 720],
    ],
    "Gate2 to Mandaya Building": [
      [320, 590],    
      [370, 650],
      [590, 300],
      [762, 558],
      [735, 625],
      [885, 865],

    ],
    "Gate2 to Make Shift Classroom": [
      [320, 590],
      [400, 650],
      [500, 700],
      [390, 885],
      [545,1125],
      [630, 975],
      [675, 1000],

    ],
    "Gate2 to Pavilion": [
      [320, 590],
      [400, 650],
      [500, 700],
      [570, 880],
    ],
    "Gate2 to PlayGround": [
      [320, 590],
      [370, 650],
      [255, 920],
      [335, 915 ],
      [430, 1080],
      [490, 1190],
      [540, 1270],
      [480, 1400]
    ],
    "Gate2 to Motor Pool": [
      [320, 590],
      [370, 650],
      [255, 920],
      [300, 945 ],
      [120, 1150],
    ],
    "Gate2 to RSM": [
      [320, 590],
      [370, 650],
      [580, 290],
      [660, 250]

    ],
    "Gate2 to Scouting Room": [
      [320, 590],
      [360, 650], 
      [270,840],
      [430, 1080],
      [620, 1400],
      [595, 1520],
    ],
    "Gate2 to T'boli Building": [
      [320, 590],
      [370, 650],
      [580, 290],
      [710, 525],
      [800, 375]
    ],



    //Reverse of Gate 2
    
    "Gate3 to Gate2": [
  [72, 1469],
  [190, 1300],
  [190, 1118],
  [320, 590]
],

"Gate1 to Gate2": [
  [521, 160],
  [580, 290],
  [370, 650],
  [320, 590]
],

"Bagobo Building to Gate2": [
  [650, 1345],
  [530, 1130],
  [490, 1180],
  [270, 840],
  [360, 650],
  [320, 590]
],

"Badjao Building to Gate2": [
  [490, 1610],
  [620, 1400],
  [430, 1080],
  [270, 840],
  [360, 650],
  [320, 590]
],

"Benitez to Gate2": [
  [400, 650],
  [320, 590]
],

"Campus Ministry to Gate2": [
  [823, 520],
  [740, 520],
  [580, 290],
  [370, 650],
  [320, 590]
],

"Canteen to Gate2": [
  [750, 880],
  [750, 840],
  [690, 685],
  [600, 595],
  [585, 550],
  [500, 700],
  [400, 650],
  [320, 590]
],

"Clinic/Health Center to Gate2": [
  [810, 945],
  [820, 900],
  [690, 685],
  [600, 595],
  [585, 550],
  [500, 700],
  [400, 650],
  [320, 590]
],

"Front Lawn to Gate2": [
  [440, 430],
  [500, 450],
  [400, 650],
  [320, 590]
],

"FCB to Gate2": [
  [860, 1190],
  [800, 1110],
  [650, 1340],
  [390, 885],
  [500, 700],
  [400, 650],
  [320, 590]
],

"Food Processing Innovation Center to Gate2": [
  [410, 1350],
  [430, 1180],
  [250, 915],
  [380, 650],
  [320, 590]
],

"JHS HE LAB to Gate2": [
  [818, 630],
  [810, 565],
  [740, 520],
  [580, 290],
  [370, 650],
  [320, 590]
],

"Juna Building to Gate2": [
  [680, 540],
  [692, 565],
  [715, 525],
  [590, 300],
  [370, 650],
  [320, 590]
],

"Kalagan to Gate2": [
  [745, 1025],
  [715, 1000],
  [750, 885],
  [690, 685],
  [600, 595],
  [585, 550],
  [500, 700],
  [400, 650],
  [320, 590]
],

"Matigsalog Building to Gate2": [
  [850, 435],
  [825, 445],
  [800, 490],
  [740, 525],
  [590, 300],
  [370, 650],
  [320, 590]
],

"Maranao Building to Gate2": [
  [840, 480],
  [850, 500],
  [820, 560],
  [740, 525],
  [590, 300],
  [370, 650],
  [320, 590]
],

"Maguindanao Building to Gate2": [
  [1000, 590],
  [1020, 620],
  [999, 685],
  [990, 650],
  [940, 720],
  [820, 560],
  [740, 525],
  [590, 300],
  [370, 650],
  [320, 590]
],

"Mansaka Building to Gate2": [
  [880, 720],
  [820, 560],
  [740, 525],
  [590, 300],
  [370, 650],
  [320, 590]
],

"Mandaya Building to Gate2": [
  [885, 865],
  [735, 625],
  [762, 558],
  [590, 300],
  [370, 650],
  [320, 590]
],

"Make Shift Classroom to Gate2": [
  [675, 1000],
  [630, 975],
  [545, 1125],
  [390, 885],
  [500, 700],
  [400, 650],
  [320, 590]
],

"Pavilion to Gate2": [
  [570, 880],
  [500, 700],
  [400, 650],
  [320, 590]
],

"PlayGround to Gate2": [
  [480, 1400],
  [540, 1270],
  [490, 1190],
  [430, 1080],
  [335, 915],
  [255, 920],
  [370, 650],
  [320, 590]
],

"Motor Pool to Gate2": [
  [120, 1150],
  [300, 945],
  [255, 920],
  [370, 650],
  [320, 590]
],

"RSM to Gate2": [
  [660, 250],
  [580, 290],
  [370, 650],
  [320, 590]
],

"Scouting Room to Gate2": [
  [595, 1520],
  [620, 1400],
  [430, 1080],
  [270, 840],
  [360, 650],
  [320, 590]
],

"T'boli Building to Gate2": [
  [800, 375],
  [710, 525],
  [580, 290],
  [370, 650],
  [320, 590]
],

    




  //Gate 1 to Buildings
  "gate1 to Gate2": [
    [521, 160],
    [590, 265],
    [490, 415],
    [380, 615],
    [320, 590]

  ],
   "gate1 to Bagobo Building": [
    [521, 160],
    [590, 265],
    [270,840],
    [490, 1180],
    [530, 1130],
    [650, 1345]

  ],
  "gate1 to Bagobo Building": [
    [521, 160],
    [590, 265],
    [270,840],
    [490, 1180],
    [530, 1130],
    [650, 1345]

  ],
  "gate1 to Badjao Building": [
    [521, 160],
    [590, 265],
    [475,500],
    [270,840],
    [430, 1080],
    [620, 1400],
    [490, 1610]
    
  ],
  "gate1 to Benitez": [
    [521, 160],
    [590, 265],
    [400,585],
    [400, 650],
  ],
  "gate1 to Campus Ministry": [
    [521, 160],
    [595, 280],
    [740, 490],
    [823, 520]

  ],
  "gate1 to Canteen": [
    [521, 160],
    [595, 280],
    [755, 595],
    [675, 725],
    [745, 840],
    [745, 890]
    
  ],
  "gate1 to Clinic/Health Center": [
    [521, 160],
    [595, 280],
    [755, 595],
    [675, 725],
    [805, 905],
    [805, 935],
  ],
  "gate1 to Front Lawn": [
    [521, 160],
    [595, 280],
    [480, 485],
    [440, 430],
  ],
  "gate1 to FCB": [
    [521, 160],
    [595, 280],
    [755, 595],
    [720, 775],
    [915, 1045],
    [835, 1200],
    [842, 1200]
  ],
  "gate1 to Food Processing Inovation Center": [  
    [521, 160],
    [595, 280],
    [260, 825],
    [470, 1180],
    [380, 1320],
    [410, 1350]
  ],
  "gate1 to JHS HE LAB": [
    [521, 160],
    [595, 280],
      [720, 490],
      [830, 600],
      [818, 630]

  ],
  "gate1 to Juna Building": [
    [521, 160],
    [595, 280],
    [715, 525],
    [692, 565], 
    [680, 540]
  ],
  "gate1 to Kalagan": [
    [521, 160],
    [595, 280],
    [755, 595],
    [675, 725],
    [795, 875],
    [725, 1000],
    [745, 1025]
  ],

  "gate1 to Matigsalog Building": [
    [521, 160],
    [595, 280],
      [740, 525],
      [800, 490],
      [825, 445],
      [850, 435]

  ],
  "gate1 to Maranao Building": [
    [521, 160],
    [595, 310],
    [740, 525],
    [820, 560],
    [850, 500],
    [840, 480]


  ],
  "gate1 to Maguindanao Building": [
    [521, 160],
    [595, 310],
    [740, 525],
    [820, 560],
    [940, 720],
    [990, 650],
    [999, 685],
    [1020, 620],
    [1000, 590]
  ],
  "gate1 to Mansaka Building": [
    [521, 160],
    [595, 310],
    [740, 525],
    [820, 560],
    [880, 720],
  ],
  "gate1 to Mandaya Building": [
    [521, 160],
    [595, 280],
    [755, 595],
    [735, 635],
      [885, 865]
  ],
  "gate1 to Make Shift Classroom": [
    [521, 160],
    [595, 280],
    [755, 595],
    [675, 725],
    [720, 780],
    [625, 980],
    [675, 1000]


  ],
  "gate1 to Pavilion": [
    [521, 160],
    [580, 290],
    [370, 650],
    [470, 720],
    [520, 820],
    [570, 880],

  ],
  "gate1 to PlayGround": [
    [521, 160],
    [595, 280],
    [245, 835 ],
      [430, 1080],
      [490, 1190],
      [540, 1270],
      [480, 1400]

  ],
  "gate1 to Motor Pool": [
    [521, 160],
    [595, 280],
    [275,  835 ],
    [245, 1080],
    [120, 1150],

  ],
  "gate1 to RSM": [
    [521, 160],
    [595, 280],
    [610, 245]
  ],
  "gate1 to Scouting Room": [
    [521, 160],
    [595, 280],
    [245, 835],
    [430, 1080],
    [490, 1190],
    [540, 1270],
    [640, 1450],
    [595, 1520]
  ],
  "gate1 to T'boli Building": [
    [521, 160],
    [595, 280],
    [710, 525],
    [800, 375]
  ],
  ///////////////////
  //Reverse GATE 1 //
  ///////////////////
  "Gate2 to Gate1": [
  [320, 590],
  [380, 615],
  [490, 415],
  [590, 265],
  [521, 160]
],

  "Bagobo Building to gate1": [
    [650, 1345],
    [530, 1130],
    [490, 1180],
    [270, 840],
    [590, 265],
    [521, 160]
],

"Badjao Building to gate1": [
    [490, 1610],
    [620, 1400],
    [430, 1080],
    [270, 840],
    [475, 500],
    [590, 265],
    [521, 160]
],

"Benitez to gate1": [
    [400, 650],
    [400, 585],
    [590, 265],
    [521, 160]
],

"Campus Ministry to gate1": [
    [823, 520],
    [740, 490],
    [595, 280],
    [521, 160]
],

"Canteen to gate1": [
    [745, 890],
    [745, 840],
    [675, 725],
    [755, 595],
    [595, 280],
    [521, 160]
],

"Clinic/Health Center to gate1": [
    [805, 935],
    [805, 905],
    [675, 725],
    [755, 595],
    [595, 280],
    [521, 160]
],

"Front Lawn to gate1": [
    [440, 430],
    [480, 485],
    [595, 280],
    [521, 160]
],

"FCB to gate1": [
    [842, 1200],
    [835, 1200],
    [915, 1045],
    [720, 775],
    [755, 595],
    [595, 280],
    [521, 160]
],

"Food Processing Inovation Center to gate1": [
  [410, 1350],
  [380, 1320],
  [470, 1180],
  [260, 825],
  [445, 525],
  [595, 280],
    [521, 160]
],

"JHS HE LAB to gate1": [
    [818, 630],
    [830, 600],
    [720, 490],
    [595, 280],
    [521, 160]
],

"Juna Building to gate1": [
 [680, 540],
  [692, 565],
  [715, 525],
  [595, 280],
  [521, 160]
],



"Kalagan to gate1": [
    [745, 1025],
    [725, 1000],
    [795, 875],
    [675, 725],
    [755, 595],
    [595, 280],
    [521, 160]
],

"Matigsalog Building to gate1": [
    [850, 435],
    [825, 445],
    [800, 490],
    [740, 525],
    [595, 280],
    [521, 160]
],

"Maranao Building to gate1": [
    [840, 480],
    [850, 500],
    [820, 560],
    [740, 525],
    [595, 310],
    [521, 160]
],

"Maguindanao Building to gate1": [
    [1000, 590],
    [1020, 620],
    [999, 685],
    [990, 650],
    [940, 720],
    [820, 560],
    [740, 525],
    [595, 310],
    [521, 160]
],

"Mansaka Building to gate1": [
    [880, 720],
    [820, 560],
    [740, 525],
    [595, 310],
    [521, 160]
],

"Mandaya Building to gate1": [
    [885, 865],
    [735, 635],
    [755, 595],
    [595, 280],
    [521, 160]
],

"Make Shift Classroom to gate1": [
    [675, 1000],
    [625, 980],
    [720, 780],
    [675, 725],
    [755, 595],
    [595, 280],
    [521, 160]
],

"Pavilion to gate1": [
    [570, 880],
    [625, 980],
    [720, 780],
    [675, 725],
    [755, 595],
    [595, 280],
    [521, 160]
],

"PlayGround to gate1": [
    [480, 1400],
    [540, 1270],
    [490, 1190],
    [430, 1080],
    [245, 835],
    [595, 280],
    [521, 160]
],

"Motor Pool to gate1": [
    [120, 1150],
    [245, 1080],
    [275, 835],
    [595, 280],
    [521, 160]
],

"RSM to gate1": [
    [610, 245],
    [595, 280],
    [521, 160]
],

"Scouting Room to gate1": [
    [595, 1520],
    [640, 1450],
    [540, 1270],
    [490, 1190],
    [430, 1080],
    [245, 835],
    [595, 280],
    [521, 160]
],

"T'boli Building to gate1": [
    [800, 375],
    [710, 525],
    [595, 280],
    [521, 160]
],



  //Bagobo Building to Buildings
  "Bagobo Building to Badjao Building": [
    [650, 1345],
    [540, 1140],
    [490, 1199],
    [610, 1400],
    [490, 1610],

    

  ],
  "Bagobo Building to Benitez": [
    [650, 1345],
    [540, 1140],
    [450, 990],
    [380, 870],
    [500, 690]
  ],
  "Bagobo Building to Campus Ministry": [
    [650, 1345],
    [530, 1120],
    [675, 880],
    [725, 770],
    [685, 690],
    [760, 610],
    [720, 550],
    [750, 530],
    [823, 520],


  ],
  "Bagobo Building to Canteen": [
    [650, 1345],
    [530, 1120],
    [675, 880],
    [745, 890],
  ],
  "Bagobo Building to Clinic/Health Center": [
    [650, 1345],
    [530, 1120],
    [675, 880],
    [725, 770],
    [810, 885],
    [805, 935], 
  ],
  "Bagobo Building to Front Lawn": [
    [650, 1345],
    [540, 1140],
    [450, 990],
    [380, 870],
    [500, 690]  ,
    [390, 600],
    [450, 500],
    [440, 430],
  ],
  "Bagobo Building to FCB": [
    [650, 1345],
    [675, 1380],
      [817, 1090],
      [845, 1180]
  ],
  "Bagobo Building to Food Processing Inovation Center": [  
    [650, 1345],
    [540, 1140],
    [490, 1199],
    [450, 1119],
    [385, 1259 ],
    [410, 1350],
    
  ],
  "Bagobo Building to JHS HE LAB": [
    [650, 1345],
    [530, 1120],
    [675, 880],
    [725, 770],
    [685, 690],
    [760, 610],
    [720, 550],
    [750, 530],
    [790, 520],
    [835, 620],
    [818, 630],

  ],
  "Bagobo Building to Juna Building": [
    [650, 1345],
    [530, 1120],
    [675, 880],
    [725, 770],
    [685, 690],
    [755, 605],
    [715, 525],
    [692, 565], 
    [680, 540]
  ],
  "Bagobo Building to Kalagan": [
    [650, 1345],
    [595, 1250],
    [600, 1195],
    [715, 1000],
    [755, 1035]

  ],
  "Bagobo Building to Matigsalog Building": [
    [650, 1345],
    [530, 1120],
    [675, 880],
    [725, 770],
    [685, 690],
    [760, 610],
    [720, 550],
    [750, 530],
    [800, 490],
      [825, 445],
      [850, 435]

  ],
  "Bagobo Building to Maranao Building": [
    [650, 1345],
    [530, 1120],
    [675, 880],
    [725, 770],
    [685, 690],
    [760, 610],
    [720, 550],
    [750, 530],
    [820, 560],
    [850, 500],
    [840, 480]


  ],
  "Bagobo Building to Maguindanao Building": [
    [650, 1345],
    [530, 1120],
    [675, 880],
    [725, 770],
    [685, 690],
    [760, 610],
    [815, 690],
    [830, 650],
    [925, 790],
    [965, 700],
    [985, 720],
    [1010, 620],
    [1000, 590]

    
  ],
  "Bagobo Building to Mansaka Building": [
    [650, 1345],
    [530, 1120],
    [675, 880],
    [725, 770],
    [685, 690],
    [760, 610],
    [815, 690],
    [830, 650],
    [880, 720],
  ],
  "Bagobo Building to Mandaya Building": [
    [650, 1345],
    [530, 1120],
    [675, 880],
    [725, 770],
    [685, 690],
    [750, 635],
    [885, 865]
  ],
  "Bagobo Building to Make Shift Classroom": [
    [650, 1345],
    [530, 1120],
    [625, 965],
    [675, 1000]

  ],
  "Bagobo Building to Pavilion": [
    [650, 1345],
    [530, 1120],
    [625, 965],
    [570, 880]  
  ],
  "Bagobo Building to PlayGround": [
    [650, 1345],
    [540, 1140],
    [490, 1199],
    [550, 1300],
    [480, 1400]
  ],
  "Bagobo Building to Motor Pool": [
    [650, 1345],
    [540, 1140],
    [490, 1199],
    [450, 1119],
    [385, 1259 ],
    [250, 1030],
    [120, 1150],

  ],
  "Bagobo Building to RSM": [
    [650, 1345],
    [540, 1140],
    [450, 990],
    [380, 870],
    [500, 690]  ,
    [390, 600],
    [450, 500],
    [575, 300],
    [660, 250]
  ],
  "Bagobo Building to Scouting Room": [
    [650, 1345],
    [540, 1140],
    [490, 1199],
    [610, 1400],
    [555, 1500],
    [595, 1520]
    
  ],
  "Bagobo Building to T'boli Building": [
    [650, 1345],
    [530, 1120],
    [675, 880],
    [725, 770],
    [685, 690],
    [760, 610],
    [720, 550],
    [700, 490],
    [785, 405]
  ],
  
  /////////////////////
  //Reverse of Bagobo//
  /////////////////////
  "Badjao Building to Bagobo Building": [
  [490, 1610],
  [610, 1401],
  [490, 1198],
  [540, 1141],
  [650, 1345]
],
"Benitez to Bagobo Building": [
  [500, 690],
  [380, 870],
  [450, 990],
  [540, 1140],
  [650, 1345]
],
"Campus Ministry to Bagobo Building": [
  [823, 520],
  [750, 530],
  [720, 550],
  [760, 610],
  [685, 690],
  [725, 770],
  [675, 880],
  [530, 1120],
  [650, 1345]
],
"Canteen to Bagobo Building": [
  [745, 890],
  [675, 880],
  [530, 1120],
  [650, 1345]
],
"Clinic/Health Center to Bagobo Building": [
  [805, 935],
  [810, 885],
  [725, 770],
  [675, 880],
  [530, 1120],
  [650, 1345]
],
"Front Lawn to Bagobo Building": [
  [440, 430],
  [450, 500],
  [390, 600],
  [500, 690],
  [380, 870],
  [450, 990],
  [540, 1140],
  [650, 1345]
],
"FCB to Bagobo Building": [
  [845, 1180],
  [817, 1090],
  [675, 1380],
  [650, 1345]
],
"Food Processing Innovation Center to Bagobo Building": [
  [410, 1350],
  [385, 1259],
  [450, 1119],
  [490, 1199],
  [540, 1140],
  [650, 1345]
],
"JHS HE LAB to Bagobo Building": [
  [818, 630],
  [835, 620],
  [790, 520],
  [750, 530],
  [720, 550],
  [760, 610],
  [685, 690],
  [725, 770],
  [675, 880],
  [530, 1120],
  [650, 1345]
],
"Juna Building to Bagobo Building": [
  [680, 540],
  [692, 565],
  [715, 525],
  [755, 605],
  [685, 690],
  [725, 770],
  [675, 880],
  [530, 1120],
  [650, 1345]
],
"Kalagan to Bagobo Building": [
  [755, 1035],
  [715, 1000],
  [600, 1195],
  [595, 1250],
  [650, 1345]
],
"Matigsalog Building to Bagobo Building": [
  [850, 435],
  [825, 445],
  [800, 490],
  [750, 530],
  [720, 550],
  [760, 610],
  [685, 690],
  [725, 770],
  [675, 880],
  [530, 1120],
  [650, 1345]
],
"Maranao Building to Bagobo Building": [
  [840, 480],
  [850, 500],
  [820, 560],
  [750, 530],
  [720, 550],
  [760, 610],
  [685, 690],
  [725, 770],
  [675, 880],
  [530, 1120],
  [650, 1345]
],
"Maguindanao Building to Bagobo Building": [
  [1000, 590],
  [1010, 620],
  [985, 720],
  [965, 700],
  [925, 790],
  [830, 650],
  [815, 690],
  [760, 610],
  [685, 690],
  [725, 770],
  [675, 880],
  [530, 1120],
  [650, 1345]
],
"Mansaka Building to Bagobo Building": [
  [880, 720],
  [830, 650],
  [815, 690],
  [760, 610],
  [685, 690],
  [725, 770],
  [675, 880],
  [530, 1120],
  [650, 1345]
],
"Mandaya Building to Bagobo Building": [
  [885, 865],
  [750, 635],
  [685, 690],
  [725, 770],
  [675, 880],
  [530, 1120],
  [650, 1345]
],
"Make Shift Classroom to Bagobo Building": [
  [675, 1000],
  [625, 965],
  [530, 1120],
  [650, 1345]
],
"Pavilion to Bagobo Building": [
  [570, 880],
  [625, 965],
  [530, 1120],
  [650, 1345]
],
"PlayGround to Bagobo Building": [
  [480, 1400],
  [550, 1300],
  [490, 1199],
  [540, 1140],
  [650, 1345]
],
"Motor Pool to Bagobo Building": [
  [120, 1150],
  [250, 1030],
  [385, 1259],
  [450, 1119],
  [490, 1199],
  [540, 1140],
  [650, 1345]
],
"RSM to Bagobo Building": [
  [660, 250],
  [575, 300],
  [450, 500],
  [390, 600],
  [500, 690],
  [380, 870],
  [450, 990],
  [540, 1140],
  [650, 1345]
],
"Scouting Room to Bagobo Building": [
  [595, 1520],
  [555, 1500],
  [610, 1400],
  [490, 1199],
  [540, 1140],
  [650, 1345]
],
"T'boli Building to Bagobo Building": [
  [785, 405],
  [700, 490],
  [720, 550],
  [760, 610],
  [685, 690],
  [725, 770],
  [675, 880],
  [530, 1120],
  [650, 1345]
],




  //Badjao Building to buildings
  "Badjao Building to Benitez": [
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [540, 1141],
    [450, 990],
    [380, 870],
    [500, 690]

  ],
  "Badjao Building to Campus Ministry": [
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [540, 1141],
    [675, 880],
    [725, 770],
    [685, 690],
    [760, 610],
    [720, 550],
    [750, 530],
    [823, 520],

  ],
  "Badjao Building to Canteen": [
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [540, 1141],
    [675, 880],
    [745, 890],
  ],
  "Badjao Building to Clinic/Health Center": [
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [540, 1141],
    [583, 1208],
    [715, 1000],
    [745, 935],
    [805, 935], 
  ],
  "Badjao Building to Front Lawn": [
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [410, 1045],
    [350, 945],
    [245, 905],
    [470, 500],
    [440, 430],
  ],
  "Badjao Building to FCB": [
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [540, 1141],
    [650, 1345],
    [675, 1380],
    [817, 1090],
    [845, 1180]
  ],
  "Badjao Building to Food Processing Inovation Center": [  
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [390, 1200],
    [340, 1300],
    [410, 1350],
  ],
  "Badjao Building to JHS HE LAB": [
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [530, 1120],
    [675, 880],
    [725, 770],
    [685, 690],
    [760, 610],
    [720, 550],
    [750, 530],
    [790, 520],
    [835, 620],
    [818, 630],

  ],
  "Badjao Building to Juna Building": [
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [530, 1120],
    [675, 880],
    [725, 770],
    [685, 690],
    [755, 605],
    [715, 525],
    [692, 565], 
    [680, 540]

  ],
  "Badjao Building to Kalagan": [
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [540, 1141],
    [583, 1208],
    [715, 1000],
    [755, 1035]

  ],
  "Badjao Building to Matigsalog Building": [
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [530, 1120],
    [675, 880],
    [725, 770],
    [685, 690],
    [760, 610],
    [720, 550],
    [750, 530],
    [800, 490],
      [825, 445],
      [850, 435]


  ],
  "Badjao Building to Maranao Building": [
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [530, 1120],
    [675, 880],
    [725, 770],
    [685, 690],
    [760, 610],
    [720, 550],
    [750, 530],
    [820, 560],
    [850, 500],
    [840, 480]



  ],
  "Badjao Building to Maguindanao Building": [
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [530, 1120],
    [675, 880],
    [725, 770],
    [685, 690],
    [760, 610],
    [815, 690],
    [830, 650],
    [925, 790],
    [965, 700],
    [985, 720],
    [1010, 620],
    [1000, 590]
  ],
  "Badjao Building to Mansaka Building": [
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [530, 1120],
    [675, 880],
    [725, 770],
    [685, 690],
    [760, 610],
    [815, 690],
    [830, 650],
    [880, 720],
  ],
  "Badjao Building to Mandaya Building": [
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [530, 1120],
    [675, 880],
    [725, 770],
    [685, 690],
    [750, 635],
    [885, 865]
  ],
  "Badjao Building to Make Shift Classroom": [
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [530, 1120],
    [625, 965],
    [675, 1000]

  ],
  "Badjao Building to Pavilion": [
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [530, 1120],
    [625, 965],
    [570, 880]  
  ],
  "Badjao Building to PlayGround": [
    [490, 1610],
    [610, 1401],
    [550, 1300],
    [480, 1400]
  ],
  "Badjao Building to Motor Pool": [
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [450, 1119],
    [385, 1259 ],
    [250, 1030],
    [120, 1150],

  ],
  "Badjao Building to RSM": [
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [350, 945],
    [245, 905],
    [390, 600],
    [450, 500],
    [575, 300],
    [660, 250]
  ],
  "Badjao Building to Scouting Room": [
    [490, 1610],
    [560, 1495],
    [595, 1520]
  ],
  "Badjao Building to T'boli Building": [
    [490, 1610],
    [610, 1401],
    [490, 1198],
    [530, 1120],
    [675, 880],
    [725, 770],
    [685, 690],
    [760, 610],
    [720, 550],
    [700, 490],
    [785, 405]
  ],
  /////////////////////    
  //Reverse to Badjao//
  ////////////////////
  "Benitez to Badjao Building": [
  [500, 690],
  [380, 870],
  [450, 990],
  [540, 1141],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],
"Campus Ministry to Badjao Building": [
  [823, 520],
  [750, 530],
  [720, 550],
  [760, 610],
  [685, 690],
  [725, 770],
  [675, 880],
  [540, 1141],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],
"Canteen to Badjao Building": [
  [745, 890],
  [675, 880],
  [540, 1141],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],
"Clinic/Health Center to Badjao Building": [
  [805, 935],
  [745, 935],
  [715, 1000],
  [583, 1208],
  [540, 1141],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],
"Front Lawn to Badjao Building": [
  [440, 430],
  [470, 500],
  [245, 905],
  [350, 945],
  [410, 1045],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],
"FCB to Badjao Building": [
  [845, 1180],
  [817, 1090],
  [675, 1380],
  [650, 1345],
  [540, 1141],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],
"Food Processing Inovation Center to Badjao Building": [
  [410, 1350],
  [340, 1300],
  [390, 1200],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],
"JHS HE LAB to Badjao Building": [
  [818, 630],
  [835, 620],
  [790, 520],
  [750, 530],
  [720, 550],
  [760, 610],
  [685, 690],
  [725, 770],
  [675, 880],
  [530, 1120],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],
"Juna Building to Badjao Building": [
  [680, 540],
  [692, 565],
  [715, 525],
  [755, 605],
  [685, 690],
  [725, 770],
  [675, 880],
  [530, 1120],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],
"Kalagan to Badjao Building": [
  [755, 1035],
  [715, 1000],
  [583, 1208],
  [540, 1141],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],
"Matigsalog Building to Badjao Building": [
  [850, 435],
  [825, 445],
  [800, 490],
  [750, 530],
  [720, 550],
  [760, 610],
  [685, 690],
  [725, 770],
  [675, 880],
  [530, 1120],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],
"Maranao Building to Badjao Building": [
  [840, 480],
  [850, 500],
  [820, 560],
  [750, 530],
  [720, 550],
  [760, 610],
  [685, 690],
  [725, 770],
  [675, 880],
  [530, 1120],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],
"Maguindanao Building to Badjao Building": [
  [1000, 590],
  [1010, 620],
  [985, 720],
  [965, 700],
  [925, 790],
  [830, 650],
  [815, 690],
  [760, 610],
  [685, 690],
  [725, 770],
  [675, 880],
  [530, 1120],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],
"Mansaka Building to Badjao Building": [
  [880, 720],
  [830, 650],
  [815, 690],
  [760, 610],
  [685, 690],
  [725, 770],
  [675, 880],
  [530, 1120],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],
"Mandaya Building to Badjao Building": [
  [885, 865],
  [750, 635],
  [685, 690],
  [725, 770],
  [675, 880],
  [530, 1120],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],
"Make Shift Classroom to Badjao Building": [
  [675, 1000],
  [625, 965],
  [530, 1120],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],
"Pavilion to Badjao Building": [
  [570, 880],
  [625, 965],
  [530, 1120],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],
"PlayGround to Badjao Building": [
  [480, 1400],
  [550, 1300],
  [610, 1401],
  [490, 1610]
],
"Motor Pool to Badjao Building": [
  [120, 1150],
  [250, 1030],
  [385, 1259],
  [450, 1119],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],
"RSM to Badjao Building": [
  [660, 250],
  [575, 300],
  [450, 500],
  [390, 600],
  [245, 905],
  [350, 945],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],
"Scouting Room to Badjao Building": [
  [595, 1520],
  [560, 1495],
  [490, 1610]
],
"T'boli Building to Badjao Building": [
  [785, 405],
  [700, 490],
  [720, 550],
  [760, 610],
  [685, 690],
  [725, 770],
  [675, 880],
  [530, 1120],
  [490, 1198],
  [610, 1401],
  [490, 1610]
],


  //Benetiz to Buildings
    "Benitez to Campus Ministry": [
      [500, 690],
      [578, 560],
      [622, 613],
      [702, 693],
      [760, 610],
      [720, 550],
      [750, 530],
      [823, 520],


    ],
    "Benitez to Canteen": [
      [500, 690],
      [578, 560],
      [622, 613],
      [702, 693],
      [740, 793],
      [745, 890],
    ],
    "Benitez to Clinic/Health Center": [
      [500, 690],
      [578, 560],
      [622, 613],
      [702, 705],
      [830, 913],
      [805, 935], 
    ],
    "Benitez to Front Lawn": [
      [500, 690],
      [390, 600],
      [460, 470],
      [440, 430],
    ],
    "Benitez to FCB": [
      [500, 690],
      [380, 870],
      [450, 990],
      [540, 1141],
      [650, 1345],
      [675, 1380],
      [817, 1090],
      [845, 1180]
    ],
    "Benitez to Food Processing Inovation Center": [  
      [500, 690],
      [380, 870],
      [450, 990],
      [540, 1141],
      [490, 1195],
      [390, 1200],
      [340, 1300],
      [410, 1350],
    ],
    "Benitez to JHS HE LAB": [
      [500, 690],
      [578, 560],
      [622, 613],
      [702, 693],
      [760, 610],
      [720, 550],
      [750, 530],
      [790, 520],
      [835, 620],
      [818, 630],


    ],
    "Benitez to Juna Building": [
      [500, 690],
      [578, 560],
      [622, 613],
      [702, 693],
      [755, 605],
      [715, 525],
      [692, 565], 
      [680, 540]
    ],
    "Benitez to Kalagan": [
      [500, 690],
      [578, 560],
      [622, 613],
      [702, 705],
      [790, 850],
      [715, 1000],
      [755, 1035]

    ],
    "Benitez to Matigsalog Building": [
      [500, 690],
      [578, 560],
      [622, 613],
      [702, 693],
      [760, 610],
      [720, 550],
      [750, 530],
      [800, 490],
        [825, 445],
        [850, 435]
  

    ],
    "Benitez to Maranao Building": [
      [500, 690],
      [578, 560],
      [622, 613],
      [702, 693],
      [760, 610],
      [720, 550],
    [750, 530],
    [820, 560],
    [850, 500],
    [840, 480]


    ],
    "Benitez to Maguindanao Building": [
      [500, 690],
      [578, 560],
      [622, 613],
      [702, 693],
      [760, 610],
      [815, 690],
      [830, 650],
      [925, 790],
      [965, 700],
      [985, 720],
      [1010, 620],
      [1000, 590]
    ],
    "Benitez to Mansaka Building": [
      [500, 690],
      [578, 560],
      [622, 613],
      [702, 693],
      [760, 610],
      [815, 690],
      [830, 650],
      [880, 720],
    ],
    "Benitez to Mandaya Building": [
      [500, 690],
      [578, 560],
      [622, 613],
      [702, 693],
      [750, 635],
      [885, 865]
    ],
    "Benitez to Make Shift Classroom": [
      [500, 690],
      [530, 745],
      [485, 825],
      [585, 970],
      [515, 1060],
      [555, 1120],
      [640, 980],
      [675, 1000]

    ],
    "Benitez to Pavilion": [
      [500, 690],
      [530, 745],
      [485, 825],
      [570, 880]  
    ],
    "Benitez to PlayGround": [
      [500, 690],
      [380, 870],
      [450, 990],
      [540, 1141],
      [490, 1198],
      [560, 1298],
      [480, 1400]
    ],
    "Benitez to Motor Pool": [
      [500, 690],
      [390, 600],
      [250, 850],
      [300, 975],
      [220, 1145],
      [120, 1150],

    ],
    "Benitez to RSM": [
      [500, 690],
      [390, 600],
      [475, 470],
      [575, 300],
      [660, 250]
    ],
    "Benitez to Scouting Room": [
      [500, 690],
      [380, 870],
      [450, 990],
      [540, 1141],
      [490, 1198],
      [610, 1401],
      [555, 1500],
      [595, 1520],
      [490, 1610]
    ],
    "Benitez to T'boli Building": [
      [500, 690],
      [390, 600],
      [475, 470],
      [595, 310],
      [710, 525],
      [800, 375]

    ],
    ///////////////////
    //Reverse Benitez//
    // ////////////////
"Campus Ministry to Benitez": [
    [823, 520],
    [750, 530],
    [720, 550],
    [760, 610],
    [702, 693],
    [622, 613],
    [578, 560],
    [500, 690]
],
"Canteen to Benitez": [
    [745, 890],
    [740, 793],
    [702, 693],
    [622, 613],
    [578, 560],
    [500, 690]
],
"Clinic/Health Center to Benitez": [
    [805, 935],
    [830, 913],
    [702, 705],
    [622, 613],
    [578, 560],
    [500, 690]
],
"Front Lawn to Benitez": [
    [440, 430],
    [460, 470],
    [390, 600],
    [500, 690]
],
"FCB to Benitez": [
    [845, 1180],
    [817, 1090],
    [675, 1380],
    [650, 1345],
    [540, 1141],
    [450, 990],
    [380, 870],
    [500, 690]
],
"Food Processing Innovation Center to Benitez": [
    [410, 1350],
    [340, 1300],
    [390, 1200],
    [490, 1195],
    [540, 1141],
    [450, 990],
    [380, 870],
    [500, 690]
],
"JHS HE LAB to Benitez": [
    [818, 630],
    [835, 620],
    [790, 520],
    [750, 530],
    [720, 550],
    [760, 610],
    [702, 693],
    [622, 613],
    [578, 560],
    [500, 690]
],
"Juna Building to Benitez": [
  [680, 540],
  [692, 565],
  [715, 525],
  [755, 605],
  [702, 693],
  [622, 613],
  [578, 560],
  [500, 690]
],
"Kalagan to Benitez": [
    [755, 1035],
    [715, 1000],
    [790, 850],
    [702, 705],
    [622, 613],
    [578, 560],
    [500, 690]
],
"Matigsalog Building to Benitez": [
    [850, 435],
    [825, 445],
    [800, 490],
    [750, 530],
    [720, 550],
    [760, 610],
    [702, 693],
    [622, 613],
    [578, 560],
    [500, 690]
],
"Maranao Building to Benitez": [
    [840, 480],
    [850, 500],
    [820, 560],
    [750, 530],
    [720, 550],
    [760, 610],
    [702, 693],
    [622, 613],
    [578, 560],
    [500, 690]
],
"Maguindanao Building to Benitez": [
    [1000, 590],
    [1010, 620],
    [985, 720],
    [965, 700],
    [925, 790],
    [830, 650],
    [815, 690],
    [760, 610],
    [702, 693],
    [622, 613],
    [578, 560],
    [500, 690]
],
"Mansaka Building to Benitez": [
    [880, 720],
    [830, 650],
    [815, 690],
    [760, 610],
    [702, 693],
    [622, 613],
    [578, 560],
    [500, 690]
],
"Mandaya Building to Benitez": [
    [885, 865],
    [750, 635],
    [702, 693],
    [622, 613],
    [578, 560],
    [500, 690]
],
"Make Shift Classroom to Benitez": [
    [675, 1000],
    [640, 980],
    [555, 1120],
    [515, 1060],
    [585, 970],
    [485, 825],
    [530, 745],
    [500, 690]
],
"Pavilion to Benitez": [
    [570, 880],
    [485, 825],
    [530, 745],
    [500, 690]
],
"PlayGround to Benitez": [
    [480, 1400],
    [560, 1298],
    [490, 1198],
    [540, 1141],
    [450, 990],
    [380, 870],
    [500, 690]
],
"Motor Pool to Benitez": [
    [120, 1150],
    [220, 1145],
    [300, 975],
    [250, 850],
    [390, 600],
    [500, 690]
],
"RSM to Benitez": [
    [660, 250],
    [575, 300],
    [475, 470],
    [390, 600],
    [500, 690]
],
"Scouting Room to Benitez": [
    [490, 1610],
    [595, 1520],
    [555, 1500],
    [610, 1401],
    [490, 1198],
    [540, 1141],
    [450, 990],
    [380, 870],
    [500, 690]
],
"T'boli Building to Benitez": [
    [800, 375],
    [710, 525],
    [595, 310],
    [475, 470],
    [390, 600],
    [500, 690]
],


    //Campus Ministry to Building
  "Campus Ministry to Canteen": [
    [823, 520],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 760],
    [675, 850],
    [745, 890],

  ],
  "Campus Ministry to Clinic/Health Center": [
    [823, 520],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 760],
    [815, 900],
    [805, 935], 
  ],
  "Campus Ministry to Front Lawn": [
    [823, 520],
    [740, 520],
    [580, 290],
    [475, 475],
    [440, 430],
  ],
  "Campus Ministry to FCB": [
    [823, 520],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 760],
    [815, 900],
    [910, 1065],
    [840, 1155],
    [865, 1175]
  ],
  "Campus Ministry to Food Processing Inovation Center": [  
    [823, 520],
    [745, 580],
    [765, 620],
  [685, 690],
  [725, 770],
  [665, 880],
  [540, 1141],
  [477, 1200 ],
  [397, 1220],
  [347, 1290],
  [410, 1350],


  ],
  "Campus Ministry to JHS HE LAB": [
    [823, 520],
    [818, 630],

  ],
  "Campus Ministry to Juna Building": [
    [823, 520],
    [745, 580],
    [715, 525],
    [692, 565], 
    [680, 540]

  ],
  "Campus Ministry to Kalagan": [
    [823, 520],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 760],
    [795, 865],
    [710, 1015],
    [725, 1020],

  ],
  "Campus Ministry to Matigsalog Building": [
    [823, 520],
    [800, 490],
      [825, 445],
      [850, 435]

  ],
  "Campus Ministry to Maranao Building": [
    [823, 520],
    [820, 560],
    [850, 500],
    [840, 480]

  ],
  "Campus Ministry to Maguindanao Building": [
    [823, 520],
    [820, 560],
    [870, 700],
    [940, 720],
    [990, 650],
    [999, 685],
    [1020, 620],
    [1000, 590]
  ],
  "Campus Ministry to Mansaka Building": [
    [823, 520],
    [820, 560],
    [835, 645],
    [880, 720],
  ],
  "Campus Ministry to Mandaya Building": [
    [823, 520],
    [745, 580],
    [765, 620],
    [745, 649],
    [885, 865]
  ],
  "Campus Ministry to Make Shift Classroom": [
    [823, 520],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 760],
    [675, 850],
    [620, 945],
    [675, 1000] 


  ],
  "Campus Ministry to Pavilion": [
    [823, 520],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 760],
    [675, 850],
    [620, 945],
    [570, 880]  
  ],
  "Campus Ministry to PlayGround": [
    [823, 520],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 770],
    [665, 880],
    [540, 1141],
    [475, 1185],
    [560, 1320],
      [480, 1400]
  ],
  "Campus Ministry to Motor Pool": [
    [823, 520],
    [740, 520],
    [580, 290],
    [475, 475],
    [305,765],
    [315, 995],
    [235, 1165],
    [120, 1150],

  ],
  "Campus Ministry to RSM": [
    [823, 520],
    [740, 520],
    [605, 300],
    [660, 250]
  ],
  "Campus Ministry to Scouting Room": [
    [823, 520],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 770],
    [665, 880],
    [540, 1141],
    [475, 1185],
    [560, 1320],
    [610, 1410],
    [565,1495],
  ],
  "Campus Ministry to T'boli Building": [
    [823, 520],
    [795, 555],
    [732, 456],
    [800, 380]
  ],
  ///////////////////////////
  //Reverse Campus Ministry//
  ///////////////////////////
  "Canteen to Campus Ministry": [
    [745, 890],
    [675, 850],
    [725, 760],
    [685, 690],
    [765, 620],
    [745, 580],
    [823, 520]
],
"Clinic/Health Center to Campus Ministry": [
    [805, 935],
    [815, 900],
    [725, 760],
    [685, 690],
    [765, 620],
    [745, 580],
    [823, 520]
],
"Front Lawn to Campus Ministry": [
    [440, 430],
    [475, 475],
    [580, 290],
    [740, 520],
    [823, 520]
],
"FCB to Campus Ministry": [
    [865, 1175],
    [840, 1155],
    [910, 1065],
    [815, 900],
    [725, 760],
    [685, 690],
    [765, 620],
    [745, 580],
    [823, 520]
],
"Food Processing Inovation Center to Campus Ministry": [
    [410, 1350],
    [347, 1290],
    [397, 1220],
    [477, 1200],
    [540, 1141],
    [665, 880],
    [725, 770],
    [685, 690],
    [765, 620],
    [745, 580],
    [823, 520]
],
"JHS HE LAB to Campus Ministry": [
    [818, 630],
    [823, 520]
],
"Juna Building to Campus Ministry": [
  [680, 540],
  [692, 565],
  [715, 525],
  [745, 580],
  [823, 520]
],
"Kalagan to Campus Ministry": [
    [725, 1020],
    [710, 1015],
    [795, 865],
    [725, 760],
    [685, 690],
    [765, 620],
    [745, 580],
    [823, 520]
],
"Matigsalog Building to Campus Ministry": [
    [850, 435],
    [825, 445],
    [800, 490],
    [823, 520]
],
"Maranao Building to Campus Ministry": [
    [840, 480],
    [850, 500],
    [820, 560],
    [823, 520]
],
"Maguindanao Building to Campus Ministry": [
    [1000, 590],
    [1020, 620],
    [999, 685],
    [990, 650],
    [940, 720],
    [870, 700],
    [820, 560],
    [823, 520]
],
"Mansaka Building to Campus Ministry": [
    [880, 720],
    [835, 645],
    [820, 560],
    [823, 520]
],
"Mandaya Building to Campus Ministry": [
    [885, 865],
    [745, 649],
    [765, 620],
    [745, 580],
    [823, 520]
],
"Make Shift Classroom to Campus Ministry": [
    [675, 1000],
    [620, 945],
    [675, 850],
    [725, 760],
    [685, 690],
    [765, 620],
    [745, 580],
    [823, 520]
],
"Pavilion to Campus Ministry": [
    [570, 880],
    [620, 945],
    [675, 850],
    [725, 760],
    [685, 690],
    [765, 620],
    [745, 580],
    [823, 520]
],
"PlayGround to Campus Ministry": [
    [480, 1400],
    [560, 1320],
    [475, 1185],
    [540, 1141],
    [665, 880],
    [725, 770],
    [685, 690],
    [765, 620],
    [745, 580],
    [823, 520]
],
"Motor Pool to Campus Ministry": [
    [120, 1150],
    [235, 1165],
    [315, 995],
    [305, 765],
    [475, 475],
    [580, 290],
    [740, 520],
    [823, 520]
],
"RSM to Campus Ministry": [
    [660, 250],
    [605, 300],
    [740, 520],
    [823, 520]
],
"Scouting Room to Campus Ministry": [
    [565, 1495],
    [610, 1410],
    [560, 1320],
    [475, 1185],
    [540, 1141],
    [665, 880],
    [725, 770],
    [685, 690],
    [765, 620],
    [745, 580],
    [823, 520]
],
"T'boli Building to Campus Ministry": [
    [800, 380],
    [732, 456],
    [795, 555],
    [823, 520]
],




  // Canteen to Buildings
    "Canteen to Clinic/Health Center": [
      [745, 890],
      [785, 890],
      [815, 930],
      [805, 935], 
    ],
    "Canteen to Front Lawn": [
      [750, 880],
      [750, 840],
      [690, 685],
      [600, 595],
      [585, 550],
      [500, 700],
      [400, 600],
      [480, 470],
      [440, 430],
    ],
    "Canteen to FCB": [
      [745, 890],
      [770, 830],
      [825, 915],
      [910, 1065],
      [840, 1155],
      [865, 1175]
    ],
    "Canteen to Food Processing Inovation Center": [  
      [745, 890],
      [675, 880],
      [540, 1141],
      [385, 1245],
      [355, 1295],
      [410, 1350],
    ],
    "Canteen to JHS HE LAB": [
      [745, 890],
      [675, 850],
      [725, 760],
      [685, 690],
      [765, 620],
      [745, 580],
      [785, 540],
      [820, 595],
      [818, 630],

    ],
    "Canteen to Juna Building": [
      [745, 890],
      [675, 850],
      [725, 760],
      [685, 690],
      [755, 605],
      [715, 525],
      [692, 565], 
      [680, 540]
    ],
    "Canteen to Kalagan": [
      [745, 890],
      [760, 925],
      [710, 1010],
      [725, 1020]

    ],
    "Canteen to Matigsalog Building": [
      [745, 890],
      [675, 850],
      [725, 760],
      [685, 690],
      [765, 620],
      [745, 580],
      [800, 490],
      [825, 460],
      [850, 435]

    ],
    "Canteen to Maranao Building": [
      [745, 890],
      [675, 850],
      [725, 760],
      [685, 690],
      [765, 620],
      [745, 580],
      [780, 530],
      [815, 585],
      [850, 500],
      [840, 480]


    ],
    "Canteen to Maguindanao Building": [
      [745, 890],
      [675, 850],
      [725, 760],
      [685, 690],
      [760, 610],
      [815, 690],
      [830, 650],
      [925, 790],
      [965, 700],
      [985, 720],
      [1010, 620],
      [1000, 590]


    ],
    "Canteen to Mansaka Building": [
      [745, 890],
      [675, 850],
      [725, 760],
      [685, 690],
      [760, 610],
      [815, 690],
      [830, 650],
      [880, 720],
    ],
    "Canteen to Mandaya Building": [
      [745, 890],
      [675, 850],
      [725, 760],
      [685, 690],
      [740, 615],
      [885, 865],
      
    ],
    "Canteen to Make Shift Classroom": [
      [745, 890],
      [675, 890],
      [625, 960],
      [675, 1000] 

    ],
    "Canteen to Pavilion": [
      [745, 890],
      [675, 890],
      [625, 960],
      [570, 880]  
    ],
    "Canteen to PlayGround": [
      [745, 890],
      [675, 880],
      [540, 1141],
      [475, 1185],
      [560, 1320],
      [480, 1400]
    ],
    "Canteen to Motor Pool": [
      [745, 890],
      [675, 880],
      [540, 1141],
      [475, 1185],
      [385, 1195 ],
      [250, 1030],
      [120, 1150],

    ],
    "Canteen to RSM": [
      [745, 890],
      [675, 850],
      [725, 760],
      [685, 690],
      [765, 620],
      [745, 580],
      [575, 320],
      [660, 250]
    ],
    "Canteen to Scouting Room": [
      [745, 890],
      [675, 880],
      [540, 1141],
      [475, 1185],
      [610, 1410],
      [565,1495],
      [580, 1510]

    ],
    "Canteen to T'boli Building": [
      [745, 890],
      [675, 850],
      [725, 760],
      [685, 690],
      [765, 620],
      [745, 580],
      [710, 525],
      [790, 395]
    ],
    //////////////////////
    //Reverse of Canteen//
    //////////////////////
    "Clinic/Health Center to Canteen": [
    [805, 935],
    [815, 930],
    [785, 890],
    [745, 890]
],
"Front Lawn to Canteen": [
    [440, 430],
    [480, 470],
    [400, 600],
    [500, 700],
    [585, 550],
    [600, 595],
    [690, 685],
    [750, 840],
    [750, 880]
],
"FCB to Canteen": [
    [865, 1175],
    [840, 1155],
    [910, 1065],
    [825, 915],
    [770, 830],
    [745, 890]
],
"Food Processing Inovation Center to Canteen": [
    [410, 1350],
    [355, 1295],
    [385, 1245],
    [540, 1141],
    [675, 880],
    [745, 890]
],
"JHS HE LAB to Canteen": [
    [818, 630],
    [820, 595],
    [785, 540],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 760],
    [675, 850],
    [745, 890]
],
"Juna Building to Canteen": [
  [680, 540],
  [692, 565],
  [715, 525],
  [755, 605],
  [685, 690],
  [725, 760],
  [675, 850],
  [745, 890]
],
"Kalagan to Canteen": [
    [725, 1020],
    [710, 1010],
    [760, 925],
    [745, 890]
],
"Matigsalog Building to Canteen": [
    [850, 435],
    [825, 460],
    [800, 490],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 760],
    [675, 850],
    [745, 890]
],
"Maranao Building to Canteen": [
    [840, 480],
    [850, 500],
    [815, 585],
    [780, 530],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 760],
    [675, 850],
    [745, 890]
],
"Maguindanao Building to Canteen": [
    [1000, 590],
    [1010, 620],
    [985, 720],
    [965, 700],
    [925, 790],
    [830, 650],
    [815, 690],
    [760, 610],
    [685, 690],
    [725, 760],
    [675, 850],
    [745, 890]
],
"Mansaka Building to Canteen": [
    [880, 720],
    [830, 650],
    [815, 690],
    [760, 610],
    [685, 690],
    [725, 760],
    [675, 850],
    [745, 890]
],
"Mandaya Building to Canteen": [
    [885, 865],
    [740, 615],
    [685, 690],
    [725, 760],
    [675, 850],
    [745, 890]
],
"Make Shift Classroom to Canteen": [
    [675, 1000],
    [625, 960],
    [675, 890],
    [745, 890]
],
"Pavilion to Canteen": [
    [570, 880],
    [625, 960],
    [675, 890],
    [745, 890]
],
"PlayGround to Canteen": [
    [480, 1400],
    [560, 1320],
    [475, 1185],
    [540, 1141],
    [675, 880],
    [745, 890]
],
"Motor Pool to Canteen": [
    [120, 1150],
    [250, 1030],
    [385, 1195],
    [475, 1185],
    [540, 1141],
    [675, 880],
    [745, 890]
],
"RSM to Canteen": [
    [660, 250],
    [575, 320],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 760],
    [675, 850],
    [745, 890]
],
"Scouting Room to Canteen": [
    [580, 1510],
    [565, 1495],
    [610, 1410],
    [475, 1185],
    [540, 1141],
    [675, 880],
    [745, 890]
],
"T'boli Building to Canteen": [
    [790, 395],
    [710, 525],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 760],
    [675, 850],
    [745, 890]
],




    //Clinic/Health Center
    "Clinic/Health Center to Front Lawn": [
      [810, 945],
      [820, 900],
      [690, 685],
      [600, 595],
      [585, 550],
      [500, 700],
      [395, 610],
      [485, 480],
      [440, 430],
    ],
    "Clinic/Health Center to FCB": [
      [810, 945],
      [820, 900],
      [910, 1065],
      [850, 1155],
      [865, 1175]
    ],
    "Clinic/Health Center to Food Processing Inovation Center": [  
      [810, 945],
      [820, 900],
      [715, 790],
      [585, 1041 ],
      [540, 1141],
      [385, 1245],
      [355, 1295],
      [410, 1350],

    ],
    "Clinic/Health Center to JHS HE LAB": [
      [810, 945],
      [820, 900],
      [725, 760],
      [685, 690],
      [765, 620],
      [745, 580],
      [785, 540],
      [820, 595],
      [818, 630],

    ],
    "Clinic/Health Center to Juna Building": [
      [810, 945],
      [820, 900],
      [725, 760],
      [685, 690],
      [755, 605],
      [715, 525],
      [692, 565], 
      [680, 540]
    ],
    "Clinic/Health Center to Kalagan": [
      [810, 945],
      [770, 905],
      [710, 1010],
      [725, 1020]

    ],
    "Clinic/Health Center to Matigsalog Building": [
      [810, 945],
      [820, 900],
      [725, 760],
      [685, 690],
      [765, 620],
      [735, 565],
      [800, 490],
      [825, 445],
      [850, 435]


    ],
    "Clinic/Health Center to Maranao Building": [
      [810, 945],
      [820, 900],
      [725, 760],
      [685, 690],
      [765, 620],
      [735, 565],
      [770, 520],
      [810, 585],
      [850, 500],
      [840, 480]


    ],
    "Clinic/Health Center to Maguindanao Building": [
      [810, 945],
      [820, 900],
      [725, 760],
      [685, 690],
      [760, 610],
      [815, 690],
      [830, 650],
      [925, 790],
      [965, 700],
      [985, 720],
      [1010, 620],
      [1000, 590]

    ],
    "Clinic/Health Center to Mansaka Building": [
      [810, 945],
      [820, 900],
      [725, 760],
      [685, 690],
      [760, 610],
      [815, 690],
      [830, 650],
      [880, 720], 
    ],
    "Clinic/Health Center to Mandaya Building": [
      [810, 945],
      [820, 900],
      [910, 1065],
      [960, 975],
      [895, 880],
    ],
    "Clinic/Health Center to Make Shift Classroom": [
      [810, 945],
      [820, 900],
      [735, 780],
      [675, 890],
      [645, 960],
      [675, 1000] 

    ],
    "Clinic/Health Center to Pavilion": [
      [810, 945],
      [820, 900],
      [735, 780],
      [675, 890],
      [645, 960],
      [570, 880]  
    ],
    "Clinic/Health Center to PlayGround": [
      [805, 935],
    [745, 935],
    [715, 1000],
    [583, 1208],
    [540, 1141],
    [490, 1198],
    [555, 1310],
    [480, 1400]
    
    ],
    "Clinic/Health Center to Motor Pool": [
      [805, 935],
      [745, 935],
      [715, 1000],
      [583, 1208],
      [540, 1141],
      [490, 1198],
      [385, 1195 ],
      [250, 1030],
      [120, 1150],

    ],
    "Clinic/Health Center to RSM": [
      [810, 945],
      [820, 900],
      [725, 760],
      [685, 690],
      [765, 620],
      [745, 580],
      [575, 320],
      [660, 250]
    ],
    "Clinic/Health Center to Scouting Room": [
      [805, 935],
    [745, 935],
    [715, 1000],
    [583, 1208],
    [540, 1141],
    [490, 1198],
    [605, 1400],
    [556,1495],
    [580, 1510]
    ],
    "Clinic/Health Center to T'boli Building": [
      [810, 945],
      [820, 900],
      [725, 760],
      [685, 690],
      [765, 620],
      [745, 580],
      [710, 525],
      [790, 395]
    ],
    /////////////////////
    //Reverse to Clinic//
    /////////////////////\
    "Front Lawn to Clinic/Health Center": [
    [440, 430],
    [485, 480],
    [395, 610],
    [500, 700],
    [585, 550],
    [600, 595],
    [690, 685],
    [820, 900],
    [810, 945]
],
"FCB to Clinic/Health Center": [
    [865, 1175],
    [850, 1155],
    [910, 1065],
    [820, 900],
    [810, 945]
],
"Food Processing Inovation Center to Clinic/Health Center": [
    [410, 1350],
    [355, 1295],
    [385, 1245],
    [540, 1141],
    [585, 1041],
    [715, 790],
    [820, 900],
    [810, 945]
],
"JHS HE LAB to Clinic/Health Center": [
    [818, 630],
    [820, 595],
    [785, 540],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 760],
    [820, 900],
    [810, 945]
],
"Juna Building to Clinic/Health Center": [
  [680, 540],
  [692, 565],
  [715, 525],
  [755, 605],
  [685, 690],
  [725, 760],
  [820, 900],
  [810, 945]
],
"Kalagan to Clinic/Health Center": [
    [725, 1020],
    [710, 1010],
    [770, 905],
    [810, 945]
],
"Matigsalog Building to Clinic/Health Center": [
    [850, 435],
    [825, 445],
    [800, 490],
    [735, 565],
    [765, 620],
    [685, 690],
    [725, 760],
    [820, 900],
    [810, 945]
],
"Maranao Building to Clinic/Health Center": [
    [840, 480],
    [850, 500],
    [810, 585],
    [770, 520],
    [735, 565],
    [765, 620],
    [685, 690],
    [725, 760],
    [820, 900],
    [810, 945]
],
"Maguindanao Building to Clinic/Health Center": [
    [1000, 590],
    [1010, 620],
    [985, 720],
    [965, 700],
    [925, 790],
    [830, 650],
    [815, 690],
    [760, 610],
    [685, 690],
    [725, 760],
    [820, 900],
    [810, 945]
],
"Mansaka Building to Clinic/Health Center": [
    [880, 720],
    [830, 650],
    [815, 690],
    [760, 610],
    [685, 690],
    [725, 760],
    [820, 900],
    [810, 945]
],
"Mandaya Building to Clinic/Health Center": [
    [895, 880],
    [960, 975],
    [910, 1065],
    [820, 900],
    [810, 945]
],
"Make Shift Classroom to Clinic/Health Center": [
    [675, 1000],
    [645, 960],
    [675, 890],
    [735, 780],
    [820, 900],
    [810, 945]
],
"Pavilion to Clinic/Health Center": [
    [570, 880],
    [645, 960],
    [675, 890],
    [735, 780],
    [820, 900],
    [810, 945]
],
"PlayGround to Clinic/Health Center": [
    [480, 1400],
    [555, 1310],
    [490, 1198],
    [540, 1141],
    [583, 1208],
    [715, 1000],
    [745, 935],
    [805, 935]
],
"Motor Pool to Clinic/Health Center": [
    [120, 1150],
    [250, 1030],
    [385, 1195],
    [490, 1198],
    [540, 1141],
    [583, 1208],
    [715, 1000],
    [745, 935],
    [805, 935]
],
"RSM to Clinic/Health Center": [
    [660, 250],
    [575, 320],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 760],
    [820, 900],
    [810, 945]
],
"Scouting Room to Clinic/Health Center": [
    [580, 1510],
    [556, 1495],
    [605, 1400],
    [490, 1198],
    [540, 1141],
    [583, 1208],
    [715, 1000],
    [745, 935],
    [805, 935]
],
"T'boli Building to Clinic/Health Center": [
    [790, 395],
    [710, 525],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 760],
    [820, 900],
    [810, 945]
],



    //Front Lawn to Buildings
    "Front Lawn to FCB": [
      [440, 430],
      [490, 475],
      [400, 650],
      [480, 730],
      [390, 885],
      [650, 1340],
      [800, 1110],
      [860, 1190]
    ],
    "Front Lawn to Food Processing Inovation Center": [  
      [440, 430],
      [490, 475],
      [400, 650],
      [250 ,915 ],
      [430, 1180],
      [410, 1350]
    ],
    "Front Lawn to JHS HE LAB": [
      [440, 430],
      [490, 475],
      [580, 290],
      [740, 520],
      [810, 565],
      [818, 630],

    ],
    "Front Lawn to Juna Building": [
      [440, 430],
      [490, 475],
      [590, 300],
    [715, 525],
    [692, 565], 
    [680, 540]
    ],
    "Front Lawn to Kalagan": [
      [440, 430],
      [490, 475],
      [400, 650],
      [480, 730],
      [500, 700],
      [585, 550],
      [600, 595],
      [690, 685],
      [750, 885],
      [715, 1000],
      [745, 1025]

    ],
    "Front Lawn to Matigsalog Building": [
      [440, 430],
      [490, 475],
      [590, 300],
      [740, 525],
      [800, 490],
      [825, 445],
      [850, 435]

    ],
    "Front Lawn to Maranao Building": [
      [440, 430],
      [490, 475],
      [590, 300],
      [740, 525],
      [820, 560],
      [850, 500],
      [840, 480]

    ],
    "Front Lawn to Maguindanao Building": [
      [440, 430],
      [490, 475],
      [590, 300],
      [740, 525],
      [723, 545],
      [815, 690],
      [830, 650],
      [925, 790],
      [965, 700],
      [985, 720],
      [1010, 620],
      [1000, 590]
    ],
    "Front Lawn to Mansaka Building": [
      [440, 430],
      [490, 475],
      [590, 300],
      [740, 525],
      [723, 545],
      [815, 690],
      [830, 650],
      [880, 720],
    ],
    "Front Lawn to Mandaya Building": [
      [440, 430],
      [490, 475],
      [590, 300],
      [740, 525],
      [723, 545],
      [765, 615],
      [745, 645],
      [885, 865],
    ],
    "Front Lawn to Make Shift Classroom": [
      [440, 430],
      [490, 475],
      [400, 650],
      [480, 730],
      [390, 885],
      [545,1125],
      [630, 975],
      [675, 1000],
    ],
    "Front Lawn to Pavilion": [
      [440, 430],
      [490, 475],
      [400, 650],
      [500, 700],
      [570, 880],
    ],
    "Front Lawn to PlayGround": [
      [440, 430],
      [490, 475],
      [385, 650],
      [255, 920],
      [335, 915 ],
      [430, 1080],
      [490, 1190],
      [540, 1270],
      [480, 1400]
    ],
    "Front Lawn to Motor Pool": [
      [440, 430],
      [490, 475],
      [385, 650],
      [255, 920],
      [300, 945 ],
      [225, 1100],
      [120, 1150],

    ],
    "Front Lawn to RSM": [
      [440, 430],
      [490, 475],
      [580, 290],
      [660, 250]
    ],
    "Front Lawn to Scouting Room": [
      [440, 430],
      [490, 475],
      [385, 650],
      [255, 920],
      [335, 915 ],
      [430, 1080],
      [490, 1190],
      [540, 1270],
      [620, 1400],
      [595, 1520],
    ],
    "Front Lawn to T'boli Building": [
      [440, 430],
      [490, 475],
      [580, 290],
      [710, 525],
      [800, 375]
    ],
    /////////////////////////
    //Reverse of Front Lawn//
    /////////////////////////
    "FCB to Front Lawn": [
    [860, 1190],
    [800, 1110],
    [650, 1340],
    [390, 885],
    [480, 730],
    [400, 650],
    [490, 475],
    [440, 430]
],
"Food Processing Inovation Center to Front Lawn": [
    [410, 1350],
    [430, 1180],
    [250, 915],
    [400, 650],
    [490, 475],
    [440, 430]
],
"JHS HE LAB to Front Lawn": [
    [818, 630],
    [810, 565],
    [740, 520],
    [580, 290],
    [490, 475],
    [440, 430]
],
"Juna Building to Front Lawn": [
  [680, 540],
  [692, 565],
  [715, 525],
  [590, 300],
  [490, 475],
  [440, 430]
],
"Kalagan to Front Lawn": [
    [745, 1025],
    [715, 1000],
    [750, 885],
    [690, 685],
    [600, 595],
    [585, 550],
    [500, 700],
    [480, 730],
    [400, 650],
    [490, 475],
    [440, 430]
],
"Matigsalog Building to Front Lawn": [
    [850, 435],
    [825, 445],
    [800, 490],
    [740, 525],
    [590, 300],
    [490, 475],
    [440, 430]
],
"Maranao Building to Front Lawn": [
    [840, 480],
    [850, 500],
    [820, 560],
    [740, 525],
    [590, 300],
    [490, 475],
    [440, 430]
],
"Maguindanao Building to Front Lawn": [
    [1000, 590],
    [1010, 620],
    [985, 720],
    [965, 700],
    [925, 790],
    [830, 650],
    [815, 690],
    [723, 545],
    [740, 525],
    [590, 300],
    [490, 475],
    [440, 430]
],
"Mansaka Building to Front Lawn": [
    [880, 720],
    [830, 650],
    [815, 690],
    [723, 545],
    [740, 525],
    [590, 300],
    [490, 475],
    [440, 430]
],
"Mandaya Building to Front Lawn": [
    [885, 865],
    [745, 645],
    [765, 615],
    [723, 545],
    [740, 525],
    [590, 300],
    [490, 475],
    [440, 430]
],
"Make Shift Classroom to Front Lawn": [
    [675, 1000],
    [630, 975],
    [545, 1125],
    [390, 885],
    [480, 730],
    [400, 650],
    [490, 475],
    [440, 430]
],
"Pavilion to Front Lawn": [
    [570, 880],
    [500, 700],
    [400, 650],
    [490, 475],
    [440, 430]
],
"PlayGround to Front Lawn": [
    [480, 1400],
    [540, 1270],
    [490, 1190],
    [430, 1080],
    [335, 915],
    [255, 920],
    [385, 650],
    [490, 475],
    [440, 430]
],
"Motor Pool to Front Lawn": [
    [120, 1150],
    [225, 1100],
    [300, 945],
    [255, 920],
    [385, 650],
    [490, 475],
    [440, 430]
],
"RSM to Front Lawn": [
    [660, 250],
    [580, 290],
    [490, 475],
    [440, 430]
],
"Scouting Room to Front Lawn": [
    [595, 1520],
    [620, 1400],
    [540, 1270],
    [490, 1190],
    [430, 1080],
    [335, 915],
    [255, 920],
    [385, 650],
    [490, 475],
    [440, 430]
],
"T'boli Building to Front Lawn": [
    [800, 375],
    [710, 525],
    [580, 290],
    [490, 475],
    [440, 430]
],


      /////////////////
    //FCB to Buildings//
      //////////////// 
    "FCB to Food Processing Inovation Center": [  
      [860, 1190],
      [817, 1090],
      [675, 1380],
      [530, 1150],
      [485, 1200],
      [450, 1119],
      [385, 1259 ],
      [410, 1350],
    ],
    "FCB to JHS HE LAB": [
      [865, 1175],
      [840, 1155],
      [910, 1065],
      [815, 900],
      [725, 760],
      [685, 690],
      [765, 620],
      [745, 580],
      [785, 540],
      [820, 595],
      [818, 630],

    ],
    "FCB to Juna Building": [
      [865, 1175],
      [840, 1155],
      [910, 1065],
      [815, 900],
      [725, 760],
      [685, 690],
      [755, 605],
    [715, 525],
    [692, 565], 
    [680, 540]
      
    ],
    "FCB to Kalagan": [
      [865, 1175],
      [840, 1155],
      [910, 1065],
      [825, 915],
      [770, 905],
      [710, 1010],
      [725, 1020]


    ],
    "FCB to Matigsalog Building": [
      [865, 1175],
      [840, 1155],
      [910, 1065],
      [815, 900],
      [725, 760],
      [685, 690],
      [765, 620],
      [745, 580],
      [800, 490],
      [850, 435]

    ],
    "FCB to Maranao Building": [
      [865, 1175],
      [840, 1155],
      [910, 1065],
      [815, 900],
      [725, 760],
      [685, 690],
      [765, 620],
      [745, 580],
      [770, 545],
      [820, 560],
      [850, 500],
      [840, 480]



    ],
    "FCB to Maguindanao Building": [
      [865, 1175],
      [840, 1155],
      [910, 1065],
      [815, 900],
      [725, 760],
      [685, 690],
      [765, 620],
      [815, 690],
      [830, 650],
      [925, 790],
      [965, 700],
      [985, 720],
      [1010, 620],
      [1000, 590]

    ],
    "FCB to Mansaka Building": [
      [865, 1175],
      [840, 1155],
      [910, 1065],
      [815, 900],
      [725, 760],
      [685, 690],
      [765, 620],
      [815, 690],
      [830, 650],
      [880, 720],
    ],
    "FCB to Mandaya Building": [
      [865, 1175],
      [840, 1155],
      [945, 970],
      [885, 865],    
    ],
    "FCB to Make Shift Classroom": [
      [865, 1175],
    [840, 1155],
    [910, 1065],
    [825, 915],
    [770, 830],
    [720, 810],
      [675, 890],
      [640, 960],
      [675, 1000] 

    ],
    "FCB to Pavilion": [
      [865, 1175],
      [840, 1155],
      [910, 1065],
      [825, 915],
      [770, 830],
      [720, 810],
        [675, 890],
        [640, 960],
        [570, 880],
    ],
    "FCB to PlayGround": [
      [845, 1180],
      [817, 1090],
      [675, 1380],
      [650, 1345],
    [540, 1140],
    [490, 1199],
    [550, 1300],
    [480, 1400]
    ],
    "FCB to Motor Pool": [
      [845, 1180],
      [817, 1090],
      [675, 1380],
      [650, 1345],
    [540, 1140],
    [490, 1199],
    [450, 1119],
    [385, 1259 ],
    [250, 1030],
    [120, 1150],

    ],
    "FCB to RSM": [
      [865, 1175],
      [840, 1155],
      [910, 1065],
      [815, 900],
      [725, 760],
      [685, 690],
      [765, 620],
      [745, 580],
      [575, 320],
      [660, 250]
    ],
    "FCB to Scouting Room": [
      [845, 1180],
      [817, 1090],
      [675, 1380],
      [650, 1345],
      [540, 1140],
      [490, 1199],
    [610, 1400],
    [555, 1500],
    [595, 1520]
    ],
    "FCB to T'boli Building": [
      [865, 1175],
      [840, 1155],
      [910, 1065],
      [815, 900],
      [725, 760],
      [685, 690],
      [765, 620],
      [745, 580],
      [710, 525],
      [790, 395]
    ],
    /////////////////////
    //Reverse to T'boli//
    /////////////////////
    "Food Processing Inovation Center to FCB": [
    [410, 1350],
    [385, 1259],
    [450, 1119],
    [485, 1200],
    [530, 1150],
    [675, 1380],
    [817, 1090],
    [860, 1190]
],
"JHS HE LAB to FCB": [
    [818, 630],
    [820, 595],
    [785, 540],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 760],
    [815, 900],
    [910, 1065],
    [840, 1155],
    [865, 1175]
],
"Juna Building to FCB": [
  [680, 540],
  [692, 565],
  [715, 525],
  [755, 605],
  [685, 690],
  [725, 760],
  [815, 900],
  [910, 1065],
  [840, 1155],
  [865, 1175]
],
"Kalagan to FCB": [
    [725, 1020],
    [710, 1010],
    [770, 905],
    [825, 915],
    [910, 1065],
    [840, 1155],
    [865, 1175]
],
"Matigsalog Building to FCB": [
    [850, 435],
    [800, 490],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 760],
    [815, 900],
    [910, 1065],
    [840, 1155],
    [865, 1175]
],
"Maranao Building to FCB": [
    [840, 480],
    [850, 500],
    [820, 560],
    [770, 545],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 760],
    [815, 900],
    [910, 1065],
    [840, 1155],
    [865, 1175]
],
"Maguindanao Building to FCB": [
    [1000, 590],
    [1010, 620],
    [985, 720],
    [965, 700],
    [925, 790],
    [830, 650],
    [815, 690],
    [765, 620],
    [685, 690],
    [725, 760],
    [815, 900],
    [910, 1065],
    [840, 1155],
    [865, 1175]
],
"Mansaka Building to FCB": [
    [880, 720],
    [830, 650],
    [815, 690],
    [765, 620],
    [685, 690],
    [725, 760],
    [815, 900],
    [910, 1065],
    [840, 1155],
    [865, 1175]
],
"Mandaya Building to FCB": [
    [885, 865],
    [945, 970],
    [840, 1155],
    [865, 1175]
],
"Make Shift Classroom to FCB": [
    [675, 1000],
    [640, 960],
    [675, 890],
    [720, 810],
    [770, 830],
    [825, 915],
    [910, 1065],
    [840, 1155],
    [865, 1175]
],
"Pavilion to FCB": [
    [570, 880],
    [640, 960],
    [675, 890],
    [720, 810],
    [770, 830],
    [825, 915],
    [910, 1065],
    [840, 1155],
    [865, 1175]
],
"PlayGround to FCB": [
    [480, 1400],
    [550, 1300],
    [490, 1199],
    [540, 1140],
    [650, 1345],
    [675, 1380],
    [817, 1090],
    [845, 1180]
],
"Motor Pool to FCB": [
    [120, 1150],
    [250, 1030],
    [385, 1259],
    [450, 1119],
    [490, 1199],
    [540, 1140],
    [650, 1345],
    [675, 1380],
    [817, 1090],
    [845, 1180]
],
"RSM to FCB": [
    [660, 250],
    [575, 320],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 760],
    [815, 900],
    [910, 1065],
    [840, 1155],
    [865, 1175]
],
"Scouting Room to FCB": [
    [595, 1520],
    [555, 1500],
    [610, 1400],
    [490, 1199],
    [540, 1140],
    [650, 1345],
    [675, 1380],
    [817, 1090],
    [845, 1180]
],
"T'boli Building to FCB": [
    [790, 395],
    [710, 525],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 760],
    [815, 900],
    [910, 1065],
    [840, 1155],
    [865, 1175]
],


      /////////////////////////////////////////////
    //Food Processing Inovation Center to Buildings//
    //////////////////////////////////////////////
    "Food Processing Inovation Center to JHS HE LAB": [
      [410, 1350],
      [347, 1290],
      [397, 1220],
      [477, 1200],
      [540, 1141],
      [665, 880],
      [725, 770],
      [685, 690],
      [765, 620],
      [745, 580],
      [785, 540],
      [820, 595],
      [818, 630],

    ],
    "Food Processing Inovation Center to Juna Building": [
      [410, 1350],
      [347, 1290],
      [397, 1220],
      [477, 1200],
      [540, 1141],
      [665, 880],
      [725, 770],
      [685, 690],
      [765, 620],
      [725, 550],
      [705, 580],
      [690, 550],
    ],
    "Food Processing Inovation Center to Kalagan": [
      [410, 1350],
  [385, 1259],
  [450, 1119],
  [490, 1199],
  [540, 1140],
    [595, 1250],
    [600, 1195],
    [715, 1000],
    [755, 1035]


    ],
    "Food Processing Inovation Center to Matigsalog Building": [
      [410, 1350],
      [347, 1290],
      [397, 1220],
      [477, 1200],
      [540, 1141],
      [665, 880],
      [725, 770],
      [685, 690],
      [765, 620],
      [745, 580],
      [800, 490],
      [850, 435]
    ],
    "Food Processing Inovation Center to Maranao Building": [
      [410, 1350],
      [347, 1290],
      [397, 1220],
      [477, 1200],
      [540, 1141],
      [665, 880],
      [725, 770],
      [685, 690],
      [765, 620],
      [745, 580],
      [780, 530],
      [815, 585],
      [850, 500],
      [840, 480]

    ],
    "Food Processing Inovation Center to Maguindanao Building": [
      [410, 1350],
      [347, 1290],
      [397, 1220],
      [477, 1200],
      [540, 1141],
      [665, 880],
      [725, 770],
      [685, 690],
      [760, 610],
      [815, 690],
      [830, 650],
      [925, 790],
      [965, 700],
      [985, 720],
      [1010, 620],
      [1000, 590]



    ],
    "Food Processing Inovation Center to Mansaka Building": [
      [410, 1350],
      [347, 1290],
      [397, 1220],
      [477, 1200],
      [540, 1141],
      [665, 880],
      [725, 770],
      [685, 690],
      [760, 610],
      [815, 690],
      [830, 650],
      [880, 720],
    ],
    "Food Processing Inovation Center to Mandaya Building": [
      [410, 1350],
      [347, 1290],
      [397, 1220],
      [477, 1200],
      [540, 1141],
      [665, 880],
      [725, 770],
      [685, 690],
      [740, 615],
      [885, 865],
    ],
    "Food Processing Inovation Center to Make Shift Classroom": [
      [410, 1350],
      [347, 1290],
      [397, 1220],
      [477, 1200],
      [540, 1141],
      [625, 960],
      [675, 1000] 

    ],
    "Food Processing Inovation Center to Pavilion": [
      [410, 1350],
      [347, 1290],
      [397, 1220],
      [477, 1200],
      [540, 1141],
      [625, 960],
      [570, 880]  
    ],
    "Food Processing Inovation Center to PlayGround": [
      [410, 1350],
      [347, 1290],
      [397, 1220],
      [490, 1199],
      [550, 1300],
      [480, 1400] 

    ],
    "Food Processing Inovation Center to Motor Pool": [
      [410, 1350],
      [310, 1200],
      [210, 1050],
      [120, 1150],

    ],
    "Food Processing Inovation Center to RSM": [
      [410, 1350],
      [380, 1320],
      [470, 1180],
      [260, 825],
      [445, 525],
      [595, 280],
      [660, 250]
    ],
    "Food Processing Inovation Center to Scouting Room": [
      [410, 1350],
      [347, 1290],
      [397, 1220],
      [490, 1199],
      [550, 1300],
      [610, 1400],
      [555, 1500],
      [595, 1520]
    ],
    "Food Processing Inovation Center to T'boli Building": [
      [410, 1350],
      [380, 1320],
      [470, 1180],
      [260, 825],
      [445, 525],
      [595, 280],
      [710, 525],
      [800, 375]
    ],
    /////////////////////////////
    //Revese to Food Processing//
    /////////////////////////////
    "JHS HE LAB to Food Processing Inovation Center": [
    [818, 630],
    [820, 595],
    [785, 540],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 770],
    [665, 880],
    [540, 1141],
    [477, 1200],
    [397, 1220],
    [347, 1290],
    [410, 1350]
],
"Juna Building to Food Processing Inovation Center": [
    [690, 550],
    [705, 580],
    [725, 550],
    [765, 620],
    [685, 690],
    [725, 770],
    [665, 880],
    [540, 1141],
    [477, 1200],
    [397, 1220],
    [347, 1290],
    [410, 1350]
],
"Kalagan to Food Processing Inovation Center": [
    [755, 1035],
    [715, 1000],
    [600, 1195],
    [595, 1250],
    [540, 1140],
    [490, 1199],
    [450, 1119],
    [385, 1259],
    [410, 1350]
],
"Matigsalog Building to Food Processing Inovation Center": [
    [850, 435],
    [800, 490],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 770],
    [665, 880],
    [540, 1141],
    [477, 1200],
    [397, 1220],
    [347, 1290],
    [410, 1350]
],
"Maranao Building to Food Processing Inovation Center": [
    [840, 480],
    [850, 500],
    [815, 585],
    [780, 530],
    [745, 580],
    [765, 620],
    [685, 690],
    [725, 770],
    [665, 880],
    [540, 1141],
    [477, 1200],
    [397, 1220],
    [347, 1290],
    [410, 1350]
],
"Maguindanao Building to Food Processing Inovation Center": [
    [1000, 590],
    [1010, 620],
    [985, 720],
    [965, 700],
    [925, 790],
    [830, 650],
    [815, 690],
    [760, 610],
    [685, 690],
    [725, 770],
    [665, 880],
    [540, 1141],
    [477, 1200],
    [397, 1220],
    [347, 1290],
    [410, 1350]
],
"Mansaka Building to Food Processing Inovation Center": [
    [880, 720],
    [830, 650],
    [815, 690],
    [760, 610],
    [685, 690],
    [725, 770],
    [665, 880],
    [540, 1141],
    [477, 1200],
    [397, 1220],
    [347, 1290],
    [410, 1350]
],
"Mandaya Building to Food Processing Inovation Center": [
    [885, 865],
    [740, 615],
    [685, 690],
    [725, 770],
    [665, 880],
    [540, 1141],
    [477, 1200],
    [397, 1220],
    [347, 1290],
    [410, 1350]
],
"Make Shift Classroom to Food Processing Inovation Center": [
    [675, 1000],
    [625, 960],
    [540, 1141],
    [477, 1200],
    [397, 1220],
    [347, 1290],
    [410, 1350]
],
"Pavilion to Food Processing Inovation Center": [
    [570, 880],
    [625, 960],
    [540, 1141],
    [477, 1200],
    [397, 1220],
    [347, 1290],
    [410, 1350]
],
"PlayGround to Food Processing Inovation Center": [
    [480, 1400],
    [550, 1300],
    [490, 1199],
    [397, 1220],
    [347, 1290],
    [410, 1350]
],
"Motor Pool to Food Processing Inovation Center": [
    [120, 1150],
    [210, 1050],
    [310, 1200],
    [410, 1350]
],
"RSM to Food Processing Inovation Center": [
    [660, 250],
    [595, 280],
    [445, 525],
    [260, 825],
    [470, 1180],
    [380, 1320],
    [410, 1350]
],
"Scouting Room to Food Processing Inovation Center": [
    [595, 1520],
    [555, 1500],
    [610, 1400],
    [550, 1300],
    [490, 1199],
    [397, 1220],
    [347, 1290],
    [410, 1350]
],
"T'boli Building to Food Processing Inovation Center": [
    [800, 375],
    [710, 525],
    [595, 280],
    [445, 525],
    [260, 825],
    [470, 1180],
    [380, 1320],
    [410, 1350]
],

    /////////////////////////
    //JHS HE LAB to Buildings//
    /////////////////////////
 "JHS HE LAB to Juna Building": [
      [818, 630],
      [785, 655],
      [755, 605],
      [715, 525],
      [692, 565], 
      [680, 540]
  ],
  "JHS HE LAB to Kalagan": [
    [818, 630],
    [700, 730],
    [785, 880],
    [715, 1010],
    [740, 1030]

  ],
  "JHS HE LAB to Matigsalog Building": [
    [818, 630],
    [825, 545],
    [845, 515], 
    [815, 475],
    [850, 435]
      
  ],
  "JHS HE LAB to Maranao Building": [
    [818, 630],
    [825, 545],
    [890, 470], 


  ],
  "JHS HE LAB to Maguindanao Building": [
    [818, 630],
    [920, 595],
    
  ],
  "JHS HE LAB to Mansaka Building": [
    [818, 630],
    [840, 660],
  ],

  "JHS HE LAB to Mandaya Building": [
    [818, 630],
    [710, 700],
    [840, 925],
    [870, 895],
  ],
  "JHS HE LAB to Make Shift Classroom": [
    [818, 630],
    [700, 730],
    [740, 790],
    [640, 960],
    [680, 1000],
  

  ],
  "JHS HE LAB to Pavilion": [
    [818, 630],
    [700, 730],
    [740, 790],
    [630, 990],
    [570, 880]
  ],
  "JHS HE LAB to PlayGround": [
    [818, 630],
    [700, 730],
    [740, 790],
    [630, 990],
    [485, 1215],
    [550, 1300],
    [480, 1400]
    
  ],
  "JHS HE LAB to Motor Pool": [
    [818, 630],
    [700, 730],
    [740, 790],
    [630, 990],
    [485, 1215],
    [120, 1150]
  ],
  "JHS HE LAB to RSM": [
    [818, 630],
    [785, 655],
    [590, 325],
      [660, 250]

  ],
  "JHS HE LAB to Scouting Room": [
    [818, 630],
    [700, 730],
    [740, 790],
    [630, 990],
    [485, 1215],
    [610, 1400],
    [555, 1500],
    [595, 1520]
  ],
  "JHS HE LAB to T'boli Building": [
    [818, 630],
    [710, 525],
    [785, 405],
  ], 
  /////////////////////////
  //Reverse to JHS HE LAB//
  /////////////////////////
  "Juna Building to JHS HE LAB": [
    [680, 540],
    [692, 565],
    [715, 525],
    [755, 605],
    [785, 655],
    [818, 630]
],
"Kalagan to JHS HE LAB": [
    [740, 1030],
    [715, 1010],
    [785, 880],
    [700, 730],
    [818, 630]
],
"Matigsalog Building to JHS HE LAB": [
    [850, 435],
    [815, 475],
    [845, 515],
    [825, 545],
    [818, 630]
],
"Maranao Building to JHS HE LAB": [
    [890, 470],
    [825, 545],
    [818, 630]
],
"Maguindanao Building to JHS HE LAB": [
    [920, 595],
    [818, 630]
],
"Mansaka Building to JHS HE LAB": [
    [840, 660],
    [818, 630]
],
"Mandaya Building to JHS HE LAB": [
    [870, 895],
    [840, 925],
    [710, 700],
    [818, 630]
],
"Make Shift Classroom to JHS HE LAB": [
    [680, 1000],
    [640, 960],
    [740, 790],
    [700, 730],
    [818, 630]
],
"Pavilion to JHS HE LAB": [
    [570, 880],
    [630, 990],
    [740, 790],
    [700, 730],
    [818, 630]
],
"PlayGround to JHS HE LAB": [
    [480, 1400],
    [550, 1300],
    [485, 1215],
    [630, 990],
    [740, 790],
    [700, 730],
    [818, 630]
],
"Motor Pool to JHS HE LAB": [
    [120, 1150],
    [485, 1215],
    [630, 990],
    [740, 790],
    [700, 730],
    [818, 630]
],
"RSM to JHS HE LAB": [
    [660, 250],
    [590, 325],
    [785, 655],
    [818, 630]
],
"Scouting Room to JHS HE LAB": [
    [595, 1520],
    [555, 1500],
    [610, 1400],
    [485, 1215],
    [630, 990],
    [740, 790],
    [700, 730],
    [818, 630]
],
"T'boli Building to JHS HE LAB": [
    [785, 405],
    [710, 525],
    [818, 630]
],


    ///////////////////////////
  //Juna Building to Buildings//
  ////////////////////////////
  "Juna Building to Kalagan": [
    [680, 540],
    [692, 565],
    [715, 525],
    [755, 605],
    [785, 655],
    [818, 630]


  ],
  "Juna Building to Matigsalog Building": [
    [680, 540],
    [692, 565],
    [715, 525],
    [745, 580],
    [800, 490],
    [850, 435]
  ],
  "Juna Building to Maranao Building": [
    [690, 530],
    [715, 490],
    [735, 540],
    [745, 580],
      [780, 530],
      [815, 585],
      [850, 500],
      [840, 480]




  ],
  "Juna Building to Maguindanao Building": [
    [680, 540],
    [692, 565],
    [715, 525],
    [760, 610],
    [815, 690],
    [830, 650],
    [925, 790],
    [965, 700],
    [985, 720],
    [1010, 620],
    [1000, 590]
  ],
  "Juna Building to Mansaka Building": [
    [690, 530],
    [715, 490],
    [735, 540],
    [760, 610],
      [815, 690],
      [830, 650],
      [880, 720],
  ],
  "Juna Building to Mandaya Building": [
    [690, 530],
    [715, 490],
    [735, 540],
    [765, 605],
    [740 , 625],
    [885, 865],
  ],
  "Juna Building to Make Shift Classroom": [
    [690, 530],
    [715, 490],
    [735, 540],
    [765, 605],
    [740 , 625],
    [685, 690],
    [725, 760],
    [675, 850],
    [620, 945],
    [675, 1000] 

  ],
  "Juna Building to Pavilion": [
    [660, 520],
    [605, 620],
    [520, 790],
    [570, 880]
    
  ],
  "Juna Building to PlayGround": [
    [660, 520],
    [605, 620],
    [520, 790],
    [600, 920],
    [515, 1035],
    [560, 1110],
    [475, 1185],
    [560, 1320],
    [480, 1400]
  ],
  "Juna Building to Motor Pool": [
    [660, 520],
    [612, 609],
    [570, 550],
    [485, 700],
    [375, 625],
    [250, 890],
    [265, 1000],
    [120, 1150]

  ],
  "Juna Building to RSM": [
 [680, 540],
  [692, 565],
  [715, 525],
  [590, 325],
  [660, 250]
  ],
  "Juna Building to Scouting Room": [
    [660, 520],
    [605, 620],
    [520, 790],
    [600, 920],
    [515, 1035],
    [560, 1110],
    [475, 1185],
    [560, 1320],
    [610, 1400],
    [555, 1500],
    [595, 1520]

  ],
  "Juna Building to T'boli Building": [
    [690, 530],
    [715, 490],
    [785, 405]
  ],
  ///////////////////
  //Reverse to Juna//
  ///////////////////

  "Kalagan to Juna Building": [
    [725, 1020],
    [710, 1015],
    [795, 865],
    [735, 745],
    [695, 690],
    [765, 605],
 [715, 525],
 [692, 565], 
 [680, 540]
],
"Matigsalog Building to Juna Building": [
    [850, 435],
    [800, 490],
    [745, 580],
 [715, 525],
 [692, 565], 
 [680, 540]
],
"Maranao Building to Juna Building": [
    [840, 480],
    [850, 500],
    [815, 585],
    [780, 530],
    [745, 580],
    [715, 525],
    [692, 565], 
    [680, 540]
],
"Maguindanao Building to Juna Building": [
    [1000, 590],
    [1010, 620],
    [985, 720],
    [965, 700],
    [925, 790],
    [830, 650],
    [815, 690],
    [760, 610],
    [715, 525],
    [692, 565], 
    [680, 540]
],
"Mansaka Building to Juna Building": [
  [880, 720],
  [830, 650],
  [815, 690],
  [760, 610],
  [755, 605],
  [715, 525],
  [692, 565], 
  [680, 540]
],
"Mandaya Building to Juna Building": [
    [885, 865],
    [740, 625],
    [765, 605],
    [715, 525],
    [692, 565], 
    [680, 540]
],
"Make Shift Classroom to Juna Building": [
    [675, 1000],
    [620, 945],
    [675, 850],
    [725, 760],
    [685, 690],
    [740, 625],
    [765, 605],
    [715, 525],
    [692, 565], 
    [680, 540]
],
"Pavilion to Juna Building": [
    [570, 880],
    [520, 790],
    [605, 620],
    [660, 520]
],
"PlayGround to Juna Building": [
    [480, 1400],
    [560, 1320],
    [475, 1185],
    [560, 1110],
    [515, 1035],
    [600, 920],
    [520, 790],
    [605, 620],
    [660, 520]
],
"Motor Pool to Juna Building": [
    [120, 1150],
    [265, 1000],
    [250, 890],
    [375, 625],
    [485, 700],
    [570, 550],
    [612, 609],
    [660, 520]
],
"RSM to Juna Building": [
    [660, 250],
    [590, 325],
    [715, 525],
    [692, 565], 
    [680, 540]


],
"Scouting Room to Juna Building": [
    [595, 1520],
    [555, 1500],
    [610, 1400],
    [560, 1320],
    [475, 1185],
    [560, 1110],
    [515, 1035],
    [600, 920],
    [520, 790],
    [605, 620],
    [660, 520]
],
"T'boli Building to Juna Building": [
    [785, 405],
    [715, 490],
    [690, 530]
],


    ////////////////////
  //Kalagan to Buildings//
    ////////////////////
  "Kalagan to Matigsalog Building": [
    [725, 1020],
    [715, 1010],
    [785, 880],
    [700, 730],
    [765, 620],
    [745, 580],
    [800, 490],
    [850, 435]

    ],
    "Kalagan to Maranao Building": [
      [725, 1020],
      [740, 1030],
      [715, 1010],
      [785, 880],
      [700, 730],
      [765, 620],
      [745, 580],
      [780, 530],
      [815, 585],
      [850, 500],
      [840, 480]


    ],
    "Kalagan to Maguindanao Building": [
      [725, 1020],
      [740, 1030],
      [715, 1010],
      [785, 880],
      [700, 730],
      [765, 620],
      [815, 690],
      [830, 650],
      [925, 790],
      [965, 700],
      [985, 720],
      [1010, 620],
      [1000, 590]

    ],
    "Kalagan to Mansaka Building": [
      [725, 1020],
      [715, 1010],
      [785, 880],
      [700, 730],
      [765, 620],
      [815, 690],
      [830, 650],
      [880, 720],
    ],
    "Kalagan to Mandaya Building": [
      [725, 1020],
      [715, 1010],
      [785, 880],
      [820, 900],
      [910, 1065],
      [960, 975],
      [895, 880],
    ],
    "Kalagan to Make Shift Classroom": [
      [725, 1020],
      [675, 1000] 

    ],
    "Kalagan to Pavilion": [
      [745, 1025],
      [715, 1000],
      [750, 885],
      [690, 815],
      [625, 960],
      [570, 880]  
    ],
    "Kalagan to PlayGround": [
      [725, 1020],
      [715, 1000],
  [583, 1208],
  [540, 1141],
  [490, 1198],
  [550, 1300],
    [480, 1400]
    ],
    "Kalagan to Motor Pool": [
      [725, 1020],
      [725, 1020],
      [715, 1000],
      [583, 1208],
      [540, 1141],
      [490, 1198],
      [450, 1119],
      [385, 1259 ],
      [250, 1030],
      [120, 1150],  
    ],
    "Kalagan to RSM": [
      [725, 1020],
      [715, 1010],
      [785, 880],
      [700, 730],
      [765, 620],
      [745, 580],
      [575, 320],
      [660, 250]
    ],
    "Kalagan to Scouting Room": [
      [725, 1020],
      [715, 1000],
      [583, 1208],
      [540, 1141],
      [490, 1198],
      [550, 1300],
      [610, 1400],
      [555, 1500],
      [595, 1520]
    ],
    "Kalagan to T'boli Building": [
      [725, 1020],
      [715, 1010],
    [785, 880],
    [700, 730],
    [765, 620],
    [745, 580],
    [710, 525],
      [790, 395]
    ],
    //////////////////////
    //Reverse to Kalagan//
    //////////////////////
    "Matigsalog Building to Kalagan": [
    [850, 435],
    [800, 490],
    [745, 580],
    [765, 620],
    [700, 730],
    [785, 880],
    [715, 1010],
    [725, 1020]
],
"Maranao Building to Kalagan": [
    [840, 480],
    [850, 500],
    [815, 585],
    [780, 530],
    [745, 580],
    [765, 620],
    [700, 730],
    [785, 880],
    [715, 1010],
    [740, 1030],
    [725, 1020]
],
"Maguindanao Building to Kalagan": [
    [1000, 590],
    [1010, 620],
    [985, 720],
    [965, 700],
    [925, 790],
    [830, 650],
    [815, 690],
    [765, 620],
    [700, 730],
    [785, 880],
    [715, 1010],
    [740, 1030],
    [725, 1020]
],
"Mansaka Building to Kalagan": [
    [880, 720],
    [830, 650],
    [815, 690],
    [765, 620],
    [700, 730],
    [785, 880],
    [715, 1010],
    [725, 1020]
],
"Mandaya Building to Kalagan": [
    [895, 880],
    [960, 975],
    [910, 1065],
    [820, 900],
    [785, 880],
    [715, 1010],
    [725, 1020]
],
"Make Shift Classroom to Kalagan": [
    [675, 1000],
    [725, 1020]
],
"Pavilion to Kalagan": [
    [570, 880],
    [625, 960],
    [690, 815],
    [750, 885],
    [715, 1000],
    [745, 1025]
],
"PlayGround to Kalagan": [
    [480, 1400],
    [550, 1300],
    [490, 1198],
    [540, 1141],
    [583, 1208],
    [715, 1000],
    [725, 1020]
],
"Motor Pool to Kalagan": [
    [120, 1150],
    [250, 1030],
    [385, 1259],
    [450, 1119],
    [490, 1198],
    [540, 1141],
    [583, 1208],
    [715, 1000],
    [725, 1020]
],
"RSM to Kalagan": [
    [660, 250],
    [575, 320],
    [745, 580],
    [765, 620],
    [700, 730],
    [785, 880],
    [715, 1010],
    [725, 1020]
],
"Scouting Room to Kalagan": [
    [595, 1520],
    [555, 1500],
    [610, 1400],
    [550, 1300],
    [490, 1198],
    [540, 1141],
    [583, 1208],
    [715, 1000],
    [725, 1020]
],
"T'boli Building to Kalagan": [
    [790, 395],
    [710, 525],
    [745, 580],
    [765, 620],
    [700, 730],
    [785, 880],
    [715, 1010],
    [725, 1020]
],


      ////////////////////////////////
    //Matigsalog Building to Buildings//
     //////////////////////////////////
     "Matigsalog Building to Maranao Building": [
      [850, 435],
      [810, 475],
      [850, 515],
      [840, 480],
    ],
    "Matigsalog Building to Maguindanao Building": [
      [850, 435],
      [800, 490],
      [775, 545],
      [830, 650],
      [925, 790],
      [965, 700],
      [985, 720],
      [1010, 620],
      [1000, 590]
  
    ],
    "Matigsalog Building to Mansaka Building": [
      [850, 435],
      [800, 490],
      [775, 545],
      [830, 650],
      [880, 720],
    ],
    "Matigsalog Building to Mandaya Building": [
      [850, 435],
      [800, 490],
      [740, 570],
      [765, 605],
    [740 , 625],
    [885, 865],
    ],
    "Matigsalog Building to Make Shift Classroom": [
      [850, 435],
      [800, 490],
      [740, 570],
      [765, 605],
    [740 , 625],
    [685, 690],
    [725, 760],
    [675, 850],
    [620, 945],
    [675, 1000] 
  
    ],
    "Matigsalog Building to Pavilion": [
      [850, 435],
      [800, 490],
      [740, 570],
      [765, 605],
    [740 , 625],
    [685, 690],
    [725, 760],
    [675, 850],
    [620, 945],
    [570, 880]  
    ],
    "Matigsalog Building to PlayGround": [
      [850, 435],
      [800, 490],
      [740, 570],
      [765, 605],
    [740 , 625],
    [685, 690],
    [725, 760],
    [675, 850],
    [620, 945],
    [540, 1110],
    [475, 1185],
    [560, 1320],
    [480, 1400]
    ],
    "Matigsalog Building to Motor Pool": [
      [850, 435],
      [800, 490],
      [740, 570],
      [590, 300],
      [370, 650],
      [255, 920],
      [300, 945 ],
      [220, 1090 ],
      [120, 1150],
  
    ],
    "Matigsalog Building to RSM": [
      [850, 435],
      [800, 490],
      [740, 570],
      [590, 300],
      [660, 250]
    ],
    "Matigsalog Building to Scouting Room": [
      [850, 435],
      [800, 490],
      [740, 570],
      [765, 605],
    [740 , 625],
    [685, 690],
    [725, 760],
    [675, 850],
    [620, 945],
    [540, 1110],
    [475, 1185],
    [610, 1410],
    [565,1495],
    [580, 1510]
    ],
    "Matigsalog Building to T'boli Building": [
      [850, 435],
      [800, 375],
    ],
    //////////////////////////
    //Reverse to Matigsalog//
    /////////////////////////
    "Maranao Building to Matigsalog Building": [
    [840, 480],
    [850, 515],
    [810, 475],
    [850, 435]
],
"Maguindanao Building to Matigsalog Building": [
    [1000, 590],
    [1010, 620],
    [985, 720],
    [965, 700],
    [925, 790],
    [830, 650],
    [775, 545],
    [800, 490],
    [850, 435]
],
"Mansaka Building to Matigsalog Building": [
    [880, 720],
    [830, 650],
    [775, 545],
    [800, 490],
    [850, 435]
],
"Mandaya Building to Matigsalog Building": [
    [885, 865],
    [740, 625],
    [765, 605],
    [740, 570],
    [800, 490],
    [850, 435]
],
"Make Shift Classroom to Matigsalog Building": [
    [675, 1000],
    [620, 945],
    [675, 850],
    [725, 760],
    [685, 690],
    [740, 625],
    [765, 605],
    [740, 570],
    [800, 490],
    [850, 435]
],
"Pavilion to Matigsalog Building": [
    [570, 880],
    [620, 945],
    [675, 850],
    [725, 760],
    [685, 690],
    [740, 625],
    [765, 605],
    [740, 570],
    [800, 490],
    [850, 435]
],
"PlayGround to Matigsalog Building": [
    [480, 1400],
    [560, 1320],
    [475, 1185],
    [540, 1110],
    [620, 945],
    [675, 850],
    [725, 760],
    [685, 690],
    [740, 625],
    [765, 605],
    [740, 570],
    [800, 490],
    [850, 435]
],
"Motor Pool to Matigsalog Building": [
    [120, 1150],
    [220, 1090],
    [300, 945],
    [255, 920],
    [370, 650],
    [590, 300],
    [740, 570],
    [800, 490],
    [850, 435]
],
"RSM to Matigsalog Building": [
    [660, 250],
    [590, 300],
    [740, 570],
    [800, 490],
    [850, 435]
],
"Scouting Room to Matigsalog Building": [
    [580, 1510],
    [565, 1495],
    [610, 1410],
    [475, 1185],
    [540, 1110],
    [620, 945],
    [675, 850],
    [725, 760],
    [685, 690],
    [740, 625],
    [765, 605],
    [740, 570],
    [800, 490],
    [850, 435]
],
"T'boli Building to Matigsalog Building": [
    [800, 375],
    [850, 435]
],


    //////////////////////////////////
    //Maranao Buildings to Buildings//
    //////////////////////////////////
  
    "Maranao Building to Maguindanao Building": [
      [840, 480],
      [850, 500],
      [815, 585],
      [830, 650],
      [925, 790],
      [965, 700],
      [985, 720],
      [1010, 620],
      [1000, 590]

  
    ],
    "Maranao Building to Mansaka Building": [
      [840, 480],
      [850, 500],
      [815, 585],
      [830, 650],
      [880, 720],
    ],
    "Maranao Building to Mandaya Building": [
      [840, 480],
      [850, 500],
      [815, 585],
      [785, 515],
      [740, 570],
      [765, 605],
    [740 , 625],
    [885, 865],
    ],
    "Maranao Building to Make Shift Classroom": [
      [840, 480],
      [850, 500],
      [815, 585],
      [785, 515],
      [740, 570],
      [765, 605],
    [740 , 625],
    [685, 690],
    [725, 760],
    [675, 850],
    [620, 945],
    [675, 1000] 
  
    ],
    "Maranao Building to Pavilion": [
      [840, 480],
      [850, 500],
      [815, 585],
      [785, 515],
      [740, 570],
      [765, 605],
    [740 , 625],
    [685, 690],
    [725, 760],
    [675, 850],
    [620, 945],
    [570, 880]  
    ],
    "Maranao Building to PlayGround": [
      [840, 480],
      [850, 500],
      [815, 585],
      [785, 515],
      [740, 570],
      [765, 605],
    [740 , 625],
    [685, 690],
    [725, 760],
    [675, 850],
    [620, 945],
    [540, 1110],
    [475, 1185],
    [560, 1320],
    [480, 1400]
    ],
    "Maranao Building to Motor Pool": [
      [840, 480],
      [850, 500],
      [815, 585],
      [785, 515],
      [740, 570],
      [765, 605],
    [740 , 625],
    [685, 690],
    [725, 760],
    [675, 850],
    [620, 945],
    [540, 1110],
    [475, 1185],
    [385, 1195 ],
    [250, 1030],
    [120, 1150],
    ],
    "Maranao Building to RSM": [
      [840, 480],
      [850, 500],
      [815, 585],
      [785, 515],
      [740, 570],
      [705, 515],
      [590, 325],
        [660, 250]
    ],
    "Maranao Building to Scouting Room": [
      [840, 480],
      [850, 500],
      [815, 585],
      [785, 515],
      [740, 570],
      [765, 605],
    [740 , 625],
    [685, 690],
    [725, 760],
    [675, 850],
    [620, 945],
    [540, 1110],
    [475, 1185],
    [610, 1410],
    [565,1495],
    [580, 1510]
    ],
    "Maranao Building to T'boli Building": [
      [840, 480],
      [850, 500],
      [815, 585],
      [720, 475],
      [790, 395]
    ],
    ///////////////////////////////
    //Reverse to Maranao Building//
    ///////////////////////////////
    "Maguindanao Building to Maranao Building": [
  [1000, 590],
  [1010, 620],
  [985, 720],
  [965, 700],
  [925, 790],
  [830, 650],
  [815, 585],
  [850, 500],
  [840, 480]
],
"Mansaka Building to Maranao Building": [
  [880, 720],
  [830, 650],
  [815, 585],
  [850, 500],
  [840, 480]
],
"Mandaya Building to Maranao Building": [
  [885, 865],
  [740, 625],
  [765, 605],
  [740, 570],
  [785, 515],
  [815, 585],
  [850, 500],
  [840, 480]
],
"Make Shift Classroom to Maranao Building": [
  [675, 1000],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [740, 625],
  [765, 605],
  [740, 570],
  [785, 515],
  [815, 585],
  [850, 500],
  [840, 480]
],
"Pavilion to Maranao Building": [
  [570, 880],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [740, 625],
  [765, 605],
  [740, 570],
  [785, 515],
  [815, 585],
  [850, 500],
  [840, 480]
],
"PlayGround to Maranao Building": [
  [480, 1400],
  [560, 1320],
  [475, 1185],
  [540, 1110],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [740, 625],
  [765, 605],
  [740, 570],
  [785, 515],
  [815, 585],
  [850, 500],
  [840, 480]
],
"Motor Pool to Maranao Building": [
  [120, 1150],
  [250, 1030],
  [385, 1195],
  [475, 1185],
  [540, 1110],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [740, 625],
  [765, 605],
  [740, 570],
  [785, 515],
  [815, 585],
  [850, 500],
  [840, 480]
],
"RSM to Maranao Building": [
  [660, 250],
  [590, 325],
  [705, 515],
  [740, 570],
  [785, 515],
  [815, 585],
  [850, 500],
  [840, 480]
],
"Scouting Room to Maranao Building": [
  [580, 1510],
  [565, 1495],
  [610, 1410],
  [475, 1185],
  [540, 1110],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [740, 625],
  [765, 605],
  [740, 570],
  [785, 515],
  [815, 585],
  [850, 500],
  [840, 480]
],
"T'boli Building to Maranao Building": [
  [790, 395],
  [720, 475],
  [815, 585],
  [850, 500],
  [840, 480]
],


    /////////////////////////////////////
    //Maguindanao Building to Buildings//
    ///////////////////////////////////

    "Maguindanao Building to Mansaka Building": [
      [1000, 590],
  [1010, 620],
  [985, 720],
  [965, 700],
  [925, 790],
  [880, 720],
    ],
    "Maguindanao Building to Mandaya Building": [
      [1000, 590],
      [1010, 620],
      [985, 720],
      [965, 700],
      [925, 790],
      [830, 650],
      [815, 690],
      [760, 610],
      [740 , 625],
      [885, 865],
    ],
    "Maguindanao Building to Make Shift Classroom": [
      [1000, 590],
      [1010, 620],
      [985, 720],
      [965, 700],
      [925, 790],
      [830, 650],
      [815, 690],
      [760, 610],
      [740 , 625],
      [685, 690],
      [725, 760],
      [675, 850],
      [620, 945],
      [675, 1000] 
  
    ],
    "Maguindanao Building to Pavilion": [
      [1000, 590],
      [1010, 620],
      [985, 720],
      [965, 700],
      [925, 790],
      [830, 650],
      [815, 690],
      [760, 610],
      [740 , 625],
      [685, 690],
      [725, 760],
      [675, 850],
      [620, 945],
      [570, 880]
    ],
    "Maguindanao Building to PlayGround": [
      [1000, 590],
      [1010, 620],
      [985, 720],
      [965, 700],
      [925, 790],
      [830, 650],
      [815, 690],
      [760, 610],
      [740 , 625],
      [685, 690],
      [725, 760],
      [675, 850],
      [620, 945],
      [560, 1110],
      [475, 1185],
      [560, 1320],
      [480, 1400]
    ],
    "Maguindanao Building to Motor Pool": [
      [1000, 590],
      [1010, 620],
      [985, 720],
      [965, 700],
      [925, 790],
      [830, 650],
      [815, 690],
      [760, 610],
      [740 , 625],
      [685, 690],
      [725, 760],
      [675, 850],
      [620, 945],
      [560, 1110],
      [475, 1185],
      [385, 1195 ],
      [250, 1030],
      [120, 1150],
  
    ],
    "Maguindanao Building to RSM": [
      [1000, 590],
      [1010, 620],
      [985, 720],
      [965, 700],
      [925, 790],
      [830, 650],
      [815, 690],
      [760, 610],
      [715, 530],
      [590, 325],
        [660, 250]
    ],
    "Maguindanao Building to Scouting Room": [
      [1000, 590],
      [1010, 620],
      [985, 720],
      [965, 700],
      [925, 790],
      [830, 650],
      [815, 690],
      [760, 610],
      [740 , 625],
      [685, 690],
      [725, 760],
      [675, 850],
      [620, 945],
      [560, 1110],
      [475, 1185],
      [560, 1320],
      [610, 1400],
      [555, 1500],
      [595, 1520]
    ],
    "Maguindanao Building to T'boli Building": [
      [1000, 590],
      [1010, 620],
      [985, 720],
      [965, 700],
      [925, 790],
      [830, 650],
      [815, 690],
      [760, 610],
      [720, 475],
      [790, 395]
    ],
    ///////////////////////////////////
    //Reverse of Maguindanao Building//
    ///////////////////////////////////
    "Mansaka Building to Maguindanao Building": [
  [880, 720],
  [925, 790],
  [965, 700],
  [985, 720],
  [1010, 620],
  [1000, 590]
],
"Mandaya Building to Maguindanao Building": [
  [885, 865],
  [740, 625],
  [760, 610],
  [815, 690],
  [830, 650],
  [925, 790],
  [965, 700],
  [985, 720],
  [1010, 620],
  [1000, 590]
],
"Make Shift Classroom to Maguindanao Building": [
  [675, 1000],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [740, 625],
  [760, 610],
  [815, 690],
  [830, 650],
  [925, 790],
  [965, 700],
  [985, 720],
  [1010, 620],
  [1000, 590]
],
"Pavilion to Maguindanao Building": [
  [570, 880],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [740, 625],
  [760, 610],
  [815, 690],
  [830, 650],
  [925, 790],
  [965, 700],
  [985, 720],
  [1010, 620],
  [1000, 590]
],
"PlayGround to Maguindanao Building": [
  [480, 1400],
  [560, 1320],
  [475, 1185],
  [560, 1110],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [740, 625],
  [760, 610],
  [815, 690],
  [830, 650],
  [925, 790],
  [965, 700],
  [985, 720],
  [1010, 620],
  [1000, 590]
],
"Motor Pool to Maguindanao Building": [
  [120, 1150],
  [250, 1030],
  [385, 1195],
  [475, 1185],
  [560, 1110],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [740, 625],
  [760, 610],
  [815, 690],
  [830, 650],
  [925, 790],
  [965, 700],
  [985, 720],
  [1010, 620],
  [1000, 590]
],
"RSM to Maguindanao Building": [
  [660, 250],
  [590, 325],
  [715, 530],
  [760, 610],
  [815, 690],
  [830, 650],
  [925, 790],
  [965, 700],
  [985, 720],
  [1010, 620],
  [1000, 590]
],
"Scouting Room to Maguindanao Building": [
  [595, 1520],
  [555, 1500],
  [610, 1400],
  [560, 1320],
  [475, 1185],
  [560, 1110],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [740, 625],
  [760, 610],
  [815, 690],
  [830, 650],
  [925, 790],
  [965, 700],
  [985, 720],
  [1010, 620],
  [1000, 590]
],
"T'boli Building to Maguindanao Building": [
  [790, 395],
  [720, 475],
  [760, 610],
  [815, 690],
  [830, 650],
  [925, 790],
  [965, 700],
  [985, 720],
  [1010, 620],
  [1000, 590]
],



      ////////////////////////////////
    //Mansaka Building to Buildings//
    /////////////////////////////////
    "Mansaka Building to Mandaya Building": [
      [880, 720],
      [830, 650],
      [815, 690],
      [760, 610],
      [735, 635],
      [885, 865],

    ],
    "Mansaka Building to Make Shift Classroom": [
      [880, 720],
      [830, 650],
      [815, 690],
      [760, 610],
      [735, 635],
      [685, 690],
      [725, 760],
      [675, 850],
      [620, 945],
      [675, 1000], 
  
    ],
    "Mansaka Building to Pavilion": [
      [880, 720],
      [830, 650],
      [815, 690],
      [760, 610],
      [735, 635],
      [685, 690],
      [725, 760],
      [675, 850],
      [620, 945],
      [570, 880]  
    ],
    "Mansaka Building to PlayGround": [
      [880, 720],
      [830, 650],
      [815, 690],
      [760, 610],
      [735, 635],
      [685, 690],
      [725, 760],
      [675, 850],
      [620, 945],
      [560, 1110],
    [475, 1185],
    [560, 1320],
    [480, 1400]
    ],
    "Mansaka Building to Motor Pool": [
      [880, 720],
      [830, 650],
      [815, 690],
      [760, 610],
      [735, 635],
      [685, 690],
      [725, 760],
      [675, 850],
      [620, 945],
      [535, 1110],
    [480, 1185],
    [265, 1000],
    [120, 1150]
  
    ],
    "Mansaka Building to RSM": [
      [880, 720],
      [830, 650],
      [815, 690],
      [760, 610],
      [715, 535],
      [590, 325],
        [660, 250]
    ],
    "Mansaka Building to Scouting Room": [
      [880, 720],
      [830, 650],
      [815, 690],
      [760, 610],
      [735, 635],
      [685, 690],
      [725, 760],
      [675, 850],
      [620, 945],
      [535, 1110],
      [475, 1185],
      [560, 1320],
      [610, 1400],
      [555, 1500],
      [595, 1520]
    ],
    "Mansaka Building to T'boli Building": [
      [880, 720],
      [830, 650],
      [815, 690],
      [760, 610],
      [715, 535],
      [715, 490],
    [785, 405]
    ],
    //////////////////////
    //Reverse to Mansaka//
    //////////////////////
    "Mandaya Building to Mansaka Building": [
  [885, 865],
  [735, 635],
  [760, 610],
  [815, 690],
  [830, 650],
  [880, 720]
],
"Make Shift Classroom to Mansaka Building": [
  [675, 1000],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [735, 635],
  [760, 610],
  [815, 690],
  [830, 650],
  [880, 720]
],
"Pavilion to Mansaka Building": [
  [570, 880],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [735, 635],
  [760, 610],
  [815, 690],
  [830, 650],
  [880, 720]
],
"PlayGround to Mansaka Building": [
  [480, 1400],
  [560, 1320],
  [475, 1185],
  [560, 1110],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [735, 635],
  [760, 610],
  [815, 690],
  [830, 650],
  [880, 720]
],
"Motor Pool to Mansaka Building": [
  [120, 1150],
  [265, 1000],
  [480, 1185],
  [535, 1110],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [735, 635],
  [760, 610],
  [815, 690],
  [830, 650],
  [880, 720]
],
"RSM to Mansaka Building": [
  [660, 250],
  [590, 325],
  [715, 535],
  [760, 610],
  [815, 690],
  [830, 650],
  [880, 720]
],
"Scouting Room to Mansaka Building": [
  [595, 1520],
  [555, 1500],
  [610, 1400],
  [560, 1320],
  [475, 1185],
  [535, 1110],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [735, 635],
  [760, 610],
  [815, 690],
  [830, 650],
  [880, 720]
],
"T'boli Building to Mansaka Building": [
  [785, 405],
  [715, 490],
  [715, 535],
  [760, 610],
  [815, 690],
  [830, 650],
  [880, 720]
],


    ////////////////////////
    //Mandaya to Buildings//
    ///////////////////////
    "Mandaya Building to Make Shift Classroom": [
      [885, 865], 
      [740, 615],
    [685, 690],
    [725, 760],
    [675, 850],
    [620, 945],
    [675, 1000],
    ],
    "Mandaya Building to Pavilion": [
      [885, 865], 
      [740, 615],
    [685, 690],
    [725, 760],
    [675, 850],
    [620, 945],
    [570, 880]
    ],
    "Mandaya Building to PlayGround": [
      [885, 865], 
      [740, 615],
    [685, 690],
    [725, 760],
    [675, 850],
    [620, 945],
    [535, 1110],
    [475, 1185],
    [560, 1320],
    [480, 1400]
    ],
    "Mandaya Building to Motor Pool": [
      [885, 865], 
      [740, 615],
    [685, 690],
    [725, 760],
    [675, 850],
    [620, 945],
    [535, 1110],
    [480, 1185],
    [265, 1000],
    [120, 1150]
    ],
    "Mandaya Building to RSM": [
      [885, 865], 
      [740, 615],
      [760, 610],
      [715, 535],
      [590, 325],
        [660, 250]
    ],
    "Mandaya Building to Scouting Room": [
      [885, 865], 
      [740, 615],
    [685, 690],
    [725, 760],
    [675, 850],
    [620, 945],
    [535, 1110],
    [475, 1185],
    [560, 1320],
    [610, 1400],
    [555, 1500],
    [595, 1520]
    ],
    "Mandaya Building to T'boli Building": [
      [885, 865], 
      [740, 615],
      [760, 610],
      [715, 535],
      [715, 490],
    [785, 405]
    ],
    ///////////////////////////////
    //Reverse to Mandaya Building//
    ///////////////////////////////
    "Make Shift Classroom to Mandaya Building": [
  [675, 1000],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [740, 615],
  [885, 865]
],
"Pavilion to Mandaya Building": [
  [570, 880],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [740, 615],
  [885, 865]
],
"PlayGround to Mandaya Building": [
  [480, 1400],
  [560, 1320],
  [475, 1185],
  [535, 1110],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [740, 615],
  [885, 865]
],
"Motor Pool to Mandaya Building": [
  [120, 1150],
  [265, 1000],
  [480, 1185],
  [535, 1110],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [740, 615],
  [885, 865]
],
"RSM to Mandaya Building": [
  [660, 250],
  [590, 325],
  [715, 535],
  [760, 610],
  [740, 615],
  [885, 865]
],
"Scouting Room to Mandaya Building": [
  [595, 1520],
  [555, 1500],
  [610, 1400],
  [560, 1320],
  [475, 1185],
  [535, 1110],
  [620, 945],
  [675, 850],
  [725, 760],
  [685, 690],
  [740, 615],
  [885, 865]
],
"T'boli Building to Mandaya Building": [
  [785, 405],
  [715, 490],
  [715, 535],
  [760, 610],
  [740, 615],
  [885, 865]
],

    /////////////////////////////////////
    //Make Shift Classroom to Buildings//
    /////////////////////////////////////
    "Make Shift Classroom to Pavilion": [
      [675, 1000],
      [570, 880] 
    ],
    "Make Shift Classroom to PlayGround": [
      [675, 1000],
  [625, 965],
  [530, 1120],
  [475, 1185],
  [560, 1320],
  [480, 1400]
  
    ],
    "Make Shift Classroom to Motor Pool": [
      [675, 1000],
      [625, 965],
      [530, 1120],
      [490, 1185],
      [480, 1185],
    [265, 1000],
    [120, 1150]
    ],
    "Make Shift Classroom to RSM": [
      [675, 1000],
      [620, 945],
      [675, 850],
      [725, 760],
      [685, 690],
      [765, 620],
      [715, 535],
    [590, 325],
      [660, 250]
    ],
    "Make Shift Classroom to Scouting Room": [
      [675, 1000],
      [625, 965],
      [530, 1120],
      [475, 1185],
      [560, 1320],
      [475, 1185],
    [560, 1320],
    [610, 1400],
    [555, 1500],
    [595, 1520]
    ],
    "Make Shift Classroom to T'boli Building": [
      [675, 1000],
      [620, 945],
      [675, 850],
      [725, 760],
      [685, 690],
      [765, 620],
      [715, 490],
      [785, 405]
    ],

    ///////////////////////////////////
    //Reverse to Make Shift Classroom//
    ///////////////////////////////////
    "Pavilion to Make Shift Classroom": [
  [570, 880],
  [675, 1000]
],
"PlayGround to Make Shift Classroom": [
  [480, 1400],
  [560, 1320],
  [475, 1185],
  [530, 1120],
  [625, 965],
  [675, 1000]
],
"Motor Pool to Make Shift Classroom": [
  [120, 1150],
  [265, 1000],
  [480, 1185],
  [490, 1185],
  [530, 1120],
  [625, 965],
  [675, 1000]
],
"RSM to Make Shift Classroom": [
  [660, 250],
  [590, 325],
  [715, 535],
  [765, 620],
  [685, 690],
  [725, 760],
  [675, 850],
  [620, 945],
  [675, 1000]
],
"Scouting Room to Make Shift Classroom": [
  [595, 1520],
  [555, 1500],
  [610, 1400],
  [560, 1320],
  [475, 1185],
  [560, 1320],
  [475, 1185],
  [530, 1120],
  [625, 965],
  [675, 1000]
],
"T'boli Building to Make Shift Classroom": [
  [785, 405],
  [715, 490],
  [765, 620],
  [685, 690],
  [725, 760],
  [675, 850],
  [620, 945],
  [675, 1000]
],


    /////////////////////////
    //Pavilion to Buildings//
    /////////////////////////

    "Pavilion to PlayGround": [
      [570, 880],
      [600, 920],
    [515, 1035],
    [560, 1110],
    [475, 1185],
    [560, 1320],
    [480, 1400]
    ],
    "Pavilion to Motor Pool": [
      [570, 880],
      [600, 920],
    [515, 1035],
    [560, 1110],
    [475, 1185],
  [265, 1000],
  [120, 1150]

    ],
    "Pavilion to RSM": [
      [570, 880],
      [500, 700],
      [390, 600],
      [490, 450],
      [590, 300],
      [660, 250],
    ],
    "Pavilion to Scouting Room": [
      [570, 880],
      [600, 920],
    [515, 1035],
    [560, 1110],
    [475, 1185],
    [610, 1410],
      [565,1495],
      [580, 1510]
    ],
    "Pavilion to T'boli Building": [
      [570, 880],
      [620, 945],
      [675, 850],
      [725, 760],
      [685, 690],
      [765, 620],
      [715, 490],
    [785, 405]
    ],
    ///////////////////////
    //Reverse to Pavilion//
    ///////////////////////
    "PlayGround to Pavilion": [
  [480, 1400],
  [560, 1320],
  [475, 1185],
  [560, 1110],
  [515, 1035],
  [600, 920],
  [570, 880]
],
"Motor Pool to Pavilion": [
  [120, 1150],
  [265, 1000],
  [475, 1185],
  [560, 1110],
  [515, 1035],
  [600, 920],
  [570, 880]
],
"RSM to Pavilion": [
  [660, 250],
  [590, 300],
  [490, 450],
  [390, 600],
  [500, 700],
  [570, 880]
],
"Scouting Room to Pavilion": [
  [580, 1510],
  [565, 1495],
  [610, 1410],
  [475, 1185],
  [560, 1110],
  [515, 1035],
  [600, 920],
  [570, 880]
],
"T'boli Building to Pavilion": [
  [785, 405],
  [715, 490],
  [765, 620],
  [685, 690],
  [725, 760],
  [675, 850],
  [620, 945],
  [570, 880]
],


    ////////////////////////////
    //PlayGround to Buildings//
    ///////////////////////////
    "PlayGround to Motor Pool": [
      [480, 1400],
      [550, 1300],
      [490, 1199],
      [397, 1220],
      [310, 1200],
      [210, 1050],
      [120, 1150],

    ],
    "PlayGround to RSM": [
      [480, 1400],
      [550, 1300],
      [490, 1199],
  [270, 840],
  [360, 650],
  [580, 290],
  [660, 250]
    ],
    "PlayGround to Scouting Room": [
      [480, 1400],
      [550, 1300],
    [610, 1400],
    [555, 1500],
    [595, 1520]
    ],
    "PlayGround to T'boli Building": [
      [480, 1400],
      [550, 1300],
      [490, 1199],
      [530, 1120],
    [675, 880],
    [725, 770],
    [685, 690],
    [760, 610],
    [720, 550],
    [700, 490],
    [785, 405]
    ],
    /////////////////////////
    //Reverse to Playground//
    /////////////////////////
    "Motor Pool to PlayGround": [
  [120, 1150],
  [210, 1050],
  [310, 1200],
  [397, 1220],
  [490, 1199],
  [550, 1300],
  [480, 1400]
],
"RSM to PlayGround": [
  [660, 250],
  [580, 290],
  [360, 650],
  [270, 840],
  [490, 1199],
  [550, 1300],
  [480, 1400]
],
"Scouting Room to PlayGround": [
  [595, 1520],
  [555, 1500],
  [610, 1400],
  [550, 1300],
  [480, 1400]
],
"T'boli Building to PlayGround": [
  [785, 405],
  [700, 490],
  [720, 550],
  [760, 610],
  [685, 690],
  [725, 770],
  [675, 880],
  [530, 1120],
  [490, 1199],
  [550, 1300],
  [480, 1400]
],


    ////////////////////////////
    //Motor Pool toi Buildings//
    ////////////////////////////

    "Motor Pool to RSM": [
      [120, 1150],
      [245, 1080],
      [275, 835],
      [345, 685],
      [445, 535],
      [595, 280],
      [610, 245],
    ],
    "Motor Pool to Scouting Room": [
      [120, 1150],
      [210, 1050],
      [310, 1200],
      [397, 1220],
      [490, 1199],
      [610, 1400],
    [555, 1500],
    [595, 1520]
    ],
    "Motor Pool to T'boli Building": [
      [120, 1150],
      [245, 1080],
      [275, 835],
      [345, 685],
      [445, 535],
      [595, 280],
      [715, 490],
      [785, 405]
    ],
    //////////////////////////
    //Reverse to Motor Pool//
    /////////////////////////
    "RSM to Motor Pool": [
  [610, 245],
  [595, 280],
  [445, 535],
  [345, 685],
  [275, 835],
  [245, 1080],
  [120, 1150]
],
"Scouting Room to Motor Pool": [
  [595, 1520],
  [555, 1500],
  [610, 1400],
  [490, 1199],
  [397, 1220],
  [310, 1200],
  [210, 1050],
  [120, 1150]
],
"T'boli Building to Motor Pool": [
  [785, 405],
  [715, 490],
  [595, 280],
  [445, 535],
  [345, 685],
  [275, 835],
  [245, 1080],
  [120, 1150]
],


    /////////////////////////////
    //RSM Building to Buildings//
  ////////////////////////////////

    "RSM to Scouting Room": [
      [660, 250],
      [390, 640],
      [305, 780],
      [260, 920],
      [335, 915 ],
      [430, 1080],
      [490, 1190],
      [540, 1270],
      [640, 1450],
      [595, 1520]
  ],
  "RSM to T'boli Building": [
    [610, 245],
    [595, 280],
    [710, 525],
    [800, 375]
  ],
  //////////////////
  //Reverse to RSM//
  //////////////////
  "Scouting Room to RSM": [
  [595, 1520],
  [640, 1450],
  [540, 1270],
  [490, 1190],
  [430, 1080],
  [335, 915],
  [260, 920],
  [305, 780],
  [390, 640],
  [660, 250]
],
"T'boli Building to RSM": [
  [800, 375],
  [710, 525],
  [595, 280],
  [610, 245]
],

  //////////////////////////////
  //Scouting Room to Building//
  /////////////////////////////
  "Scouting Room to T'boli Building": [
    [580, 1510],
    [565, 1495],
    [610, 1410],
    [475, 1185],
    [540, 1110],
    [620, 945],
    [675, 850],
    [725, 760],
    [685, 690],
    [740, 625],
    [765, 605],
    [740, 570],
    [715, 490],
    [785, 405]
  ],
  ////////////////////////////
  //Reverse to Scouting Room//
  ////////////////////////////
  "T'boli Building to Scouting Room": [
  [785, 405],
  [715, 490],
  [740, 570],
  [765, 605],
  [740, 625],
  [685, 690],
  [725, 760],
  [675, 850],
  [620, 945],
  [540, 1110],
  [475, 1185],
  [610, 1410],
  [565, 1495],
  [580, 1510]
]

 
  };

  let routeLine = null;
  let animationInterval = null;
  
  function animateRoute(points) {
    let index = 1;
    
    // E Clear ang previous routes kung naa
    if (routeLine) map.removeLayer(routeLine);
    if (animationInterval) clearInterval(animationInterval);

    // Mag start ang line sa first point
    routeLine = L.polyline([points[0]], { color: 'blue', weight: 5, opacity: 0.7 }).addTo(map);

    // Animate by adding points at intervals, with looping
    animationInterval = setInterval(() => {
      if (index >= points.length) {
        index = 0;  // Reset to start, creating a loop
        routeLine.setLatLngs([points[0]]);  // Reset to first point
     
      }
      
      // Add the next point to the line
      routeLine.addLatLng(points[index]);
      index++;
    }, 600);  // Adjust speed as needed
  }
  
  function updateRoute() {
    const currentLocation = document.getElementById("currentLocation").value;
    const destination = document.getElementById("destination").value;
    const routeKey = `${currentLocation} to ${destination}`;
  
    const routePoints = routesData[routeKey] || [
      currentLocationMarker ? currentLocationMarker.getLatLng() : null,
      destinationMarker ? destinationMarker.getLatLng() : null
    ].filter(Boolean);  // Filter out any null values

    if (routePoints.length < 2) {
      console.error("Route points are missing or undefined.");
      return;
    }
  
    
    animateRoute(routePoints);
  }
  
  

  function setLocationAndDestination() {
    const currentLocation = document.getElementById("currentLocation").value;
    const destination = document.getElementById("destination").value;
  
    // Check if neither current location nor destination is specified
    if (!currentLocation && !destination) {
      alert("Invalid current location and destination.");
      return; // Exit if neither current location nor destination is specified
    }
  
    // Check if current location is specified
    if (!currentLocation) {
      alert("Please select a valid current location.");
      return; // Exit if current location is not specified
    }
  
    // Set current location
    if (currentLocation && markersData[currentLocation]) {
      const currentCoords = markersData[currentLocation].position;
      if (currentLocationMarker) map.removeLayer(currentLocationMarker);
      currentLocationMarker = addMarker(currentCoords, "Current Location: " + currentLocation, currentLocationIcon);
      currentLocationMarker.bindPopup("<span class='small-popup'>You are here</span>", { className: 'custom-popup' }).openPopup();
    } else {
      alert("Please select a valid current location.");
      return; // Exit if current location is not valid
    }
  
    // Check if destination is specified
    if (!destination) {
      alert("Please select a valid destination.");
      return; // Exit if destination is not specified
    }
  
    // Set destination
    if (destination && markersData[destination]) {
      const destCoords = markersData[destination].position;
      if (destinationMarker) map.removeLayer(destinationMarker);
      destinationMarker = addMarker(destCoords, "Destination: " + destination, destinationIcon);
    } else {
      alert("Please select a valid destination.");
      return; // Exit if destination is not valid
    }
  
    // Update the route
    updateRoute();
  }
  


  // Katong Marker na magpakita sa mapa
  const markerGroup = L.layerGroup();

  // Create markers, set them to invisible (opacity 0), and add them to markerGroup
  for (const title in markersData) {
    const marker = L.marker(markersData[title].position, { title: title, opacity: 0 })
      .bindPopup(title);
    markerGroup.addLayer(marker);
  }


  //Katong pag search
  try {
    const searchControl = new L.Control.Search({
      layer: markerGroup,
      propertyName: "title",
      initial: false,
      position: 'topright',
      zoom: 18,
      marker: false
    }).addTo(map);

   

 // Mag zoom didto dapit kung asa tung building na ki search
 searchControl.on('search:locationfound', e => {
  if (!map.hasLayer(markerGroup)) {
    map.addLayer(markerGroup);
  }
  
  // Get building data for the located marker
  const buildingData = markersData[e.layer.options.title];
  
  // E check kung naa ba gud marker data didto dapit, kung naa mag pakita og popn up
  if (buildingData) {
    const popupContent = `
      <div style="text-align: center;">
        <h4>${buildingData.name}</h4>
        <img src="${buildingData.image}" alt="${buildingData.name}" style="width: 200px; height: auto;">
      </div>
    `;
    e.layer.bindPopup(popupContent).openPopup();
  }

  e.layer.setOpacity(0);  // Keeps marker hidden but shows the popup
});

    // Ma wala ang marker pag human og search
    searchControl.on('search:collapsed', () => {
      markerGroup.eachLayer(marker => marker.setOpacity(0));
    });

    map.addControl(searchControl);
  } catch (error) {
    console.error("Error initializing L.Control.Search:", error);
  }

  // Ensure marker group is removed from the map initially
  if (map.hasLayer(markerGroup)) {
    map.removeLayer(markerGroup);
  }

  function MapComponent() {
    const [routeLine, setRouteLine] = useState(null);
    const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
    const [destinationMarker, setDestinationMarker] = useState(null);
    const mapRef = useRef(null);
    const animationIntervalRef = useRef(null);
  
    const animateRoute = (points) => {
      let index = 1;
      
      // Clear previous route
      if (routeLine) mapRef.current.removeLayer(routeLine);
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
  
      // Start new route
      const newRouteLine = L.polyline([points[0]], { 
        color: 'blue', 
        weight: 5, 
        opacity: 0.7 
      }).addTo(mapRef.current);
      
      setRouteLine(newRouteLine);
  
      // Animate
      animationIntervalRef.current = setInterval(() => {
        if (index >= points.length) {
          index = 0;
          newRouteLine.setLatLngs([points[0]]);
        }
        newRouteLine.addLatLng(points[index]);
        index++;
      }, 600);
    };
  
    const updateRoute = (currentLocation, destination) => {
      const routeKey = `${currentLocation} to ${destination}`;
      const routePoints = routesData[routeKey] || [
        currentLocationMarker?.getLatLng(),
        destinationMarker?.getLatLng()
      ].filter(Boolean);
  
      if (routePoints.length < 2) {
        console.error("Route points are missing or undefined.");
        return;
      }
  
      animateRoute(routePoints);
    };
  
    const handleLocationChange = (e) => {
      const { currentLocation, destination } = e.target.form;
      
      if (!currentLocation.value || !destination.value) {
        alert("Please select both current location and destination");
        return;
      }
  
      // Set markers
      if (markersData[currentLocation.value]) {
        const currentCoords = markersData[currentLocation.value].position;
        if (currentLocationMarker) mapRef.current.removeLayer(currentLocationMarker);
        
        const newMarker = addMarker(
          currentCoords, 
          `Current Location: ${currentLocation.value}`, 
          currentLocationIcon
        );
        setCurrentLocationMarker(newMarker);
        
        newMarker.bindPopup(
          "<span class='small-popup'>You are here</span>", 
          { className: 'custom-popup' }
        ).openPopup();
      }
  
      if (markersData[destination.value]) {
        const destCoords = markersData[destination.value].position;
        if (destinationMarker) mapRef.current.removeLayer(destinationMarker);
        
        const newMarker = addMarker(
          destCoords, 
          `Destination: ${destination.value}`, 
          destinationIcon
        );
        setDestinationMarker(newMarker);
      }
  
      updateRoute(currentLocation.value, destination.value);
    };
  
    useEffect(() => {
      // Initialize map
      const map = L.map('map', {
        // ... map initialization options
      });
      mapRef.current = map;
  
      // Initialize search control
      const markerGroup = L.layerGroup();
      
      Object.entries(markersData).forEach(([title, data]) => {
        const marker = L.marker(data.position, { 
          title, 
          opacity: 0 
        }).bindPopup(title);
        markerGroup.addLayer(marker);
      });
  
      const searchControl = new L.Control.Search({
        layer: markerGroup,
        propertyName: "title",
        initial: false,
        position: 'topright',
        zoom: 18,
        marker: false
      });
  
      map.addControl(searchControl);
  
      // Cleanup on unmount
      return () => {
        if (animationIntervalRef.current) {
          clearInterval(animationIntervalRef.current);
        }
        map.remove();
      };
    }, []);
  
    return (
      <div>
        <div id="map" style={{ height: '500px' }}></div>
        <form onChange={handleLocationChange}>
          <select name="currentLocation">
            <option value="">Select Current Location</option>
            {Object.keys(markersData).map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <select name="destination">
            <option value="">Select Destination</option>
            {Object.keys(markersData).map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </form>
      </div>
    );
  }
  
  export default MapComponent;
  




  