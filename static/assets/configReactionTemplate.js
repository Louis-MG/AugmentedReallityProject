export const data = {
    name: "Name",// example : "Saponification"
    title: "Title",//example : "Saponification reaction",
    description: "description",//"Saponification is a process that involves the conversion of fat, oil, or lipid, into soap and alcohol by the action of heat in the presence of aqueous alkali."
    image: "<img src='/static/module/reactionX/icon.png' style='width: 43%;position: relative; top:140px; left:30px'>",// this is an html tag for a picture. The path is realtiive from the root of the project
    
    /*
    For the reagents, products and experimental condition,
    please indicate a .obj file, a .mtl file and a marker.
    */
    type: {
    // list of reagents
        reagents: {
            reagent1: ["file.obj","file.mtl","markerName"],// example :["fatty_acid.obj", "fatty_acid.mtl", "letterA"],
            reagent2: ["file.obj","file.mtl","markerName"],// example :["koh.obj", "koh.mtl", "kanji"],
        },

        // list of products
        products: {
            product1: ["file.obj","file.mtl","markerName"],// example : ["soap.obj", "soap.mtl", "letterA"],
            product2: ["file.obj","file.mtl","markerName"],// example : ["hoh.obj", "hoh.mtl", "kanji"],
        },   
    },

    // list of condition
    conditions: {
        Condition1 /* example : temp */ : {
            name: "NameOfCondition1", // example : "temperature" 
            min: intMin, //example : 0
            max: maxInt, //example : 150
            step: 1, 
            val: StartValue, //example : 30
            cutoffMin: cutoffMinInt, //example : 100
            cutoffMax: cutoffMaxInt //example : 150
        },
        Condition2 /*example : ph */: {
            name: "NameOfCondition2", //example : "pH"
            min: intMin, //example : 0
            max: maxInt, //example : 14
            step: 1, 
            val: StartValue, //example : 7
            cutoffMin: cutoffMinInt,  //example : 6
            cutoffMax: cutoffMaxInt  //example : 8
        },
    }, // this dictionary must exist even if empty

     legend : {
        atoms : ListOfAtoms,//["carbon","hydrogen","potassium","oxygen","Rchain"],//goes with a 1024x1024 image in assets/legend/atoms for each element, for exemple carbon.png for carbon
        markers :  {
            "NameOfMarker1" : "description of molecule1 on the marker1",// exemple : "COOH" : "ester & soap",
            "NameOfMarker2" : "description of molecule2 on the marker2",//exemple : "OH" : "alcohol",
        }, // goes with a 420x420 image in assets/legend/markers for each marker, exemple COOH.png
    },


};