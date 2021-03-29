export const data = {
    name: "Disulfide bridge",
    title: "Disulfide bridge formation",
    description: "Disulfide bridges formed between thiol groups in two cysteine residues are an important component of the secondary and tertiary structure of proteins.",
    image: "<img src='/static/module/reaction4/icon.png' style='width: 90%;position: relative; top:110px; left:-30px'>",
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
    // legend stuff
    legend : {
        atoms : ["carbon","hydrogen","oxygen","proton+e-","sulfure","Rchain"],//goes with a 1024x1024 image in assets/legend/ for each element, for exemple carbon.png for carbon
        markers : {
            "letterA" : "di-cysteine", // A CHANGER
            "kanji" : "cysteine & proton/electron", // A CHANGER
        },
    },
};