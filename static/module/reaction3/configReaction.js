export const data = {
    name: "Esterification",
    title: "Esterification reaction",
    description: "Condensation of two chains R and R' linked by the carboxylic acid of R reacting with an alcohol on R'.",
    image: "<img src='/static/module/reaction3/icon.png' style='width: 43%;position: relative; top:140px; left:30px'>",
    
    /*
    For the reagents, products and experimental condition,
    please indicate a .obj file, a .mtl file and a preset marker.
    */
    type: {
    // list of reagents
        reagents: {
            reagent1: ["fatty_acid.obj", "fatty_acid.mtl", "CO-O"],
            reagent2: ["alcohol.obj", "alcohol.mtl", "OH"]
        },

        // list of products
        products: {
            product1: ["ester.obj", "ester.mtl", "CO-O"],
            product2: ["hoh.obj", "hoh.mtl", "OH"]
        },

        // list of condition
        conditions: {

        }
    }
};