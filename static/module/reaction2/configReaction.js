export const data = {
    name: "Saponification",
    title: "Saponification reaction",
    description: "Saponification is a process that involves the conversion of fat, oil, or lipid, into soap and alcohol by the action of heat in the presence of aqueous alkali.",
    image: "<img src='/static/module/reaction2/icon.png' style='width: 43%;position: relative; top:140px; left:30px'>",
    infoImage: "<img src='/static/module/reaction2/infoImage.png'>",//max weight : 500px

    /*
    For the reagents, products and experimental condition,
    please indicate a .obj file, a .mtl file and a preset marker.
    */

    type: {
    // list of reagents
        reagents: {
            reagent1: ["fatty_acid.obj", "fatty_acid.mtl", "letterA"],
            reagent2: ["koh.obj", "koh.mtl", "kanji"],
        },

        // list of products
        products: {
            product1: ["soap.obj", "soap.mtl", "letterA"],
            product2: ["hoh.obj", "hoh.mtl", "kanji"],
        },
    },
    // list of condition
    conditions: {

    },
};