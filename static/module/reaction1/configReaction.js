export const data = {
    name: "Peptide bond",
    title: "Peptide bond formation",
    description: "The chemical bond between carboxyl groups and amino groups of neighboring amino acids, forming an amide group and constituting the primary linkage of all protein structures.",
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