export const data = {
    name: "Soft aldose oxidation",
    title: "Oxidation of aldose by iodine",
    description: "An aldonic acid is any of a family of sugar acids obtained by oxidation of the aldehyde functional group of an aldose to form a carboxylic acid functional group.",
    image: "<img src='/static/module/reaction8/icon.png' style='width: 43%;position: relative; top:140px; left:30px'>",
    infoImage: "<img src='/static/module/reaction8/infoImage.png'>",//max weight : 500px
    
    /*
    For the reagents, products and experimental condition,
    please indicate a .obj file, a .mtl file and a preset marker.
    */
    type: {
    // list of reagents
        reagents: {
            reagent1: ["dglucose.obj", "dglucose.mtl", "OSE"],
            reagent2: ["hydroxide.obj", "hydroxide.mtl", "OH"],
        },

        // list of products
        products: {
            product1: ["gluconicAcid.obj", "gluconicAcid.mtl", "OSE"],
            product2: ["hoh.obj", "hoh.mtl", "OH"]
        },
    },
    conditions: {
        iodine: {
            name: "iodine (1:yes, 0:no)",
            min: 0,
            max: 1,
            val: 0,
            step: 1,
            cutoffMin: 1,
            cutoffMax: 1
        },
    },

    /* legend stuff */
    legend : {
        atoms : ["carbon","hydrogen","oxygen"],//goes with a 1024x1024 image in assets/legend/ for each element, for exemple carbon.png for carbon
        markers : {
            "OSE" : "glucose & gluconic acid",
            "OH" : "hydroxide & water",
        },
    },
};