export const data = {
    name: "Saponification",
    title: "Saponification reaction",
    description: "Saponification is a process that involves the conversion of fat, oil, or lipid, into soap and alcohol by the action of heat in the presence of aqueous alkali.",
    image: "<img src='/static/module/reaction2/icon.png' style='width: 43%;position: relative; top:140px; left:30px'>",
    
    /*
    For the reagents, products and experimental condition,
    please indicate a .obj file, a .mtl file and a preset marker.
    */
    type: {
    // list of reagents
        reagents: {
            reagent1: ["fatty_acid.obj", "fatty_acid.mtl", "COOH"],
            reagent2: ["koh.obj", "koh.mtl", "OH"],
        },

        // list of products
        products: {
            product1: ["soap.obj", "soap.mtl", "COOH"],
            product2: ["hoh.obj", "hoh.mtl", "OH"],
        },

        // list of condition
        conditions: {

        }
    }
};