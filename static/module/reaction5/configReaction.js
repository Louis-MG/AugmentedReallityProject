export const data = {
    name: "Reduction of aldoses to alditols",
    title: "Alditol formation",
    description: "Alditols are organic compounds, typically derived from sugars, containing one hydroxyle group attached to each carbon atom.",
    image: "<img src='/static/module/reaction5/icon.png' style='width: 100%;position: relative; top:80px; left:-80px'>",
    infoImage: "<img src='/static/module/reaction5/infoImage.png'>",//max weight : 500px
    
    /*
    For the reagents, products and experimental condition,
    please indicate a .obj file, a .mtl file and a preset marker.
    */
   
    type: {
        // list of reagents
        reagents: {
            reagent1: ["Glyceraldheyde.obj", "Glyceraldheyde.mtl", "OSE"],
            reagent2: ["NaBH4.obj", "NaBH4.mtl", "kanji"],
        },

        // list of products
        products: {
            product1: ["Glyceritol.obj", "Glyceritol.mtl", "OSE"],
            product2: ["NaBH4.obj", "NaBH4.mtl", "kanji"]
        },
    },
    // list of condition
    conditions: {
    },
    legend : {
        atoms : ["carbon","hydrogen","oxygen"],//goes with a 1024x1024 image in assets/legend/ for each element, for exemple carbon.png for carbon
        markers : {
            "OSE" : "Glycer/itol/aldheyde", // A CHANGER
            "kanji" : "NaBH4", // A CHANGER
        },
    },
};