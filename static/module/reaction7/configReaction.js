export const data = {
    name: "Soft aldose oxidation",
    title: "Oxidation of aldose by iodine",
    description: "An aldonic acid is any of a family of sugar acids obtained by oxidation of the aldehyde functional group of an aldose to form a carboxylic acid functional group.",
    image: "<img src='/static/module/reaction7/icon.png' style='width: 43%;position: relative; top:140px; left:30px'>",
    infoImage: "<img src='/static/module/reaction7/infoImage.png'>",//max weight : 500px
    
    /*
    For the reagents, products and experimental condition,
    please indicate a .obj file, a .mtl file and a preset marker.
    */
    type: {
    // list of reagents
        reagents: {
            reagent1: ["dglucose.obj", "dglucose.mtl", "letterA"],
            reagent2: ["hydroxide.obj", "hydroxide.mtl", "kanji"],
        },

        // list of products
        products: {
            product1: ["gluconic-acid.obj", "gluconic-acid.mtl", "letterA"],
            product2: ["hoh.obj", "hoh.mtl", "kanji"]
        },
    },
    conditions: {
        // iodine: {
        //     name: "iodine",
        //     min: 0,
        //     max: 1,
        //     step: 1,
        //     cutoffMin: 1,
        //     cutoffMax: 1
        // },
    },

    /* legend stuff */
    legend : {
        atoms : ["carbon","hydrogen","oxygen"],//goes with a 1024x1024 image in assets/legend/ for each element, for exemple carbon.png for carbon
        markers : {
            "letterA" : "D-glucose & gluconic acid",
            "kanji" : "hydroxide & water",
        },
    },
};