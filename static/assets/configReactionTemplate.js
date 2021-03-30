export const data = {
    name: "Name",// exemple : "Saponification"
    title: "Title",//exemple : "Saponification reaction",
    description: "description",//"Saponification is a process that involves the conversion of fat, oil, or lipid, into soap and alcohol by the action of heat in the presence of aqueous alkali."
    image: "<img src='/static/module/reactionX/icon.png' style='width: 43%;position: relative; top:140px; left:30px'>"// this is an html tag for a picture. The path is realtiive from the root of the project
    
    /*
    For the reagents, products and experimental condition,
    please indicate a .obj file, a .mtl file and a preset marker.
    */
    type: {
    // list of reagents
        reagents: {
            reagent1: ["file.obj","file.mtl","markerName"],// exemple :["fatty_acid.obj", "fatty_acid.mtl", "letterA"],
            reagent2: ["file.obj","file.mtl","markerName"],// exemple :["koh.obj", "koh.mtl", "kanji"],
        },

        // list of products
        products: {
            product1: ["file.obj","file.mtl","markerName"],// exemple : ["soap.obj", "soap.mtl", "letterA"],
            product2: ["file.obj","file.mtl","markerName"],// exemple : ["hoh.obj", "hoh.mtl", "kanji"],
        },

        
    }

    // list of condition
    conditions: {
        Condition1 /* exemple : temp */ : {
            name: "NameOfCondition1", // exemple : "temperature" 
            min: intMin, //exemple : 0
            max: maxInt, //exemple : 150
            step: 1, 
            val: StartValue, //exemple : 30
            cutoffMin: cutoffMinInt, //exemple : 100
            cutoffMax: cutoffMaxInt //exemple : 150
        },
        Condition2 /*exemple : ph */: {
            name: "NameOfCondition2", //exemple : temperature
            min: intMin, //exemple : 0
            max: maxInt, //exemple : 14
            step: 1, 
            val: StartValue, //exemple : 7
            cutoffMin: cutoffMinInt,  //exemple : 6
            cutoffMax: cutoffMaxInt  //exemple : 8
        },
    }, // this dictionnary must exist even if empty

     legend : {
        atoms : ListOfAtoms,//["carbon","hydrogen","potassium","oxygen","Rchain"],//goes with a 1024x1024 image in assets/legend/ for each element, for exemple carbon.png for carbon
        markers :  {
            "NameOfMarker1" : "description of molecule1 on the marker1",// exemple : "COOH" : "ester & soap",
            "NameOfMArker2" : "description of molecule2 on the marker2",//exemple : "OH" : "alcohol",
        },
    },


};