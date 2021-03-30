export const data = {
    name: "Peptide bond",
    title: "Peptide bond formation",
    description: "The chemical bond between carboxyl groups and amino groups of neighboring amino acids, forming an amide group and constituting the primary linkage of all protein structures.",
    image: "<img src='/static/module/reaction1/icon.png' style='width: 43%;position: relative; top:140px; left:30px'>",
    infoImage: "<img src='/static/module/reaction1/infoImage.png'>",//max weight : 500px
    
    /*
    For the reagents, products and experimental condition,
    please indicate a .obj file, a .mtl file and a preset marker.
    */
    type: {
    // list of reagents
        reagents: {
            reagent1: ["aminoacid.obj", "aminoacid.mtl", "AAI"],
            reagent2: ["aminoacid.obj", "aminoacid.mtl", "AAII"],
        },

        // list of products
        products: {
            product1: ["hoh.obj", "hoh.mtl", "AAI"],
            product2: ["dipeptide.obj", "dipeptide.mtl", "AAII"]
        },
    },
    conditions: {
        pH: {
            name: "pH",
            min: 0,
            max: 14,
            step: 1,
            val: 7,
            cutoffMin: 6,
            cutoffMax: 8
        },
        temp: {
            name: "temperature",
            min: -170,
            max: 300,
            step: 1,
            val: 30,
            cutoffMin: 30,
            cutoffMax: 70
        },
    },

    /* legend stuff */
    legend : {
        atoms : ["carbon","nitrogen","hydrogen","oxygen"],//goes with a 1024x1024 image in assets/legend/ for each element, for exemple carbon.png for carbon
        markers : {
            "AAI" : "amino acid 1",
            "AAII" : "amino acid 2",
        },
    },
};