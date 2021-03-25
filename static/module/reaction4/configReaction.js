export const data = {
    name: "Disulfide bridge",
    title: "Disulfide bridge formation",
    description: "Disulfide bridges formed between thiol groups in two cysteine residues are an important component of the secondary and tertiary structure of proteins.",
    image: "<img src='/static/module/reaction4/icon.png' style='width: 43%;position: relative; top:140px; left:30px'>",
    infoImage: "<img src='/static/module/reaction4/infoImage.png'>",//max weight : 500px
    
    /*
    For the reagents, products and experimental condition,
    please indicate a .obj file, a .mtl file and a preset marker.
    */
   
    type: {
        // list of reagents
        reagents: {
            reagent1: ["cysteine.obj", "cysteine.mtl", "letterA"],
            reagent2: ["cysteine.obj", "cysteine.mtl", "kanji"],
        },

        // list of products
        products: {
            product1: ["dicysteine.obj", "dicysteine.mtl", "letterA"],
            product2: ["protonElectron.obj", "protonElectron.mtl", "kanji"]
        },
    },
    // list of condition
    conditions: {
        oxidation: {
            name: "Oxidation",
            min: 0,
            max: 1,
            step: 1,
            cutoffMin: 1,
            cutoffMax: 1
        },
    },
};