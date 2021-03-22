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
            reagent1: ["aminoacid.obj", "aminoacid.mtl", "letterA"],
            reagent2: ["aminoacid.obj", "aminoacid.mtl", "kanji"],
        },

        // list of products
        products: {
            product1: ["hoh.obj", "hoh.mtl", "letterA"],
            product2: ["dipeptide.obj", "dipeptide.mtl", "kanji"]
        },

    },
    // list of condition
    conditions: {
        pH: [],
        temp: [],
    }
};