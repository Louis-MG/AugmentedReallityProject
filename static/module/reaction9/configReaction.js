export const data = {
    name: "Ketones reduction",
    title: "Ketones reduction with NaBH4",
    description: "Reduction of a ketone leads to a secondary alcohol. A secondary alcohol is one which has two alkyl groups attached to the carbon with the -OH group on it. They all contain the grouping -CHOH.",
    image: "<img src='/static/module/reaction10/icon.png' style='width: 43%;position: relative; top:140px; left:30px'>",
    infoImage: "<img src='/static/module/reaction10/infoImage.png'>",//max weight : 500px
    
    /*
    For the reagents, products and experimental condition,
    please indicate a .obj file, a .mtl file and a preset marker.
    */
    type: {
    // list of reagents
        reagents: {
            reagent1: ["dfructose.obj", "dfructose.mtl", "OSE"],
        },

        // list of products
        products: {
            product1: ["dmannitol.obj", "dmannitol.mtl", "letterA"],
            product2: ["dsorbitol.obj", "dsorbitol.mtl", "kanji"]
        },
    },
    conditions: {
        reduction: {
            name: "NaBH4 (1:yes, 0:no)",
            min: 0,
            max: 1,
            step: 1,
            val: 0,
            cutoffMin: 1,
            cutoffMax: 1
        },

    },

    /* legend stuff */
    legend : {
        atoms : ["carbon","hydrogen","oxygen"],//goes with a 1024x1024 image in assets/legend/ for each element, for exemple carbon.png for carbon
        markers : {
            "OSE" : "D-fructose",
            "letterA" : "50% D-mannitol",
            "kanji" : "50% D-sorbitol",
        },
    },
};