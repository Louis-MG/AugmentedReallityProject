export const data = {
    name: "Esterification",
    title: "Esterification reaction",
    description: "Condensation of two chains R and R' linked by the carboxylic acid of R reacting with an alcohol on R'.",
    image: "<img src='/static/module/reaction3/icon.png' style='width: 43%;position: relative; top:140px; left:30px'>",
    infoImage: "<img src='/static/module/reaction3/infoImage.png'>",//max weight : 500px

    /*
    For the reagents, products and experimental condition,
    please indicate a .obj file, a .mtl file and a preset marker.
    */
    type: {
    // list of reagents
        reagents: {
            reagent1: ["fatty_acid.obj", "fatty_acid.mtl", "letterA"],
            reagent2: ["alcohol.obj", "alcohol.mtl", "kanji"]
        },

        // list of products
        products: {
            product1: ["ester.obj", "ester.mtl", "letterA"],
            product2: ["hoh.obj", "hoh.mtl", "kanji"]
        },
    },
    // list of condition
    conditions: {

    },
};