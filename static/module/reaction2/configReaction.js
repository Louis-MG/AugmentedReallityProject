export const data = {
    name: "Saponification",
    title: "Saponification reaction",
    description: "Saponification is a process that involves the conversion of fat, oil, or lipid, into soap and alcohol by the action of heat in the presence of aqueous alkali.",
    image: "<img src='/static/module/reaction2/icon.png' style='width: 48%;position: relative; top:145px; left:8px'>",
    infoImage: "<img src='/static/module/reaction2/infoImage.png'>",//max weight : 500px

    /*
    For the reagents, products and experimental condition,
    please indicate a .obj file, a .mtl file and a preset marker.
    */
    type: {
    // list of reagents
        reagents: {
            reagent1: ["ester.obj", "ester.mtl", "COOH"],
            reagent2: ["koh.obj", "koh.mtl", "OH"],
        },

        // list of products
        products: {
            product1: ["soap.obj", "soap.mtl", "COOH"],
            product2: ["alcohol.obj", "alcohol.mtl", "OH"],
        },
    },
    // list of condition
    conditions: {
        temp: {
            name: "temperature",
            min: 0,
            max: 150,
            step: 1,
            cutoffMin: 100,
            cutoffMax: 150
        },
    },
};