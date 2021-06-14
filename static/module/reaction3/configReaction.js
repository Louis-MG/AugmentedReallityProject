export const data = {
    name: "Esterification",
    title: "Esterification reaction",
    description: "Condensation of two chains R and R' linked by the carboxylic acid of R reacting with an alcohol on R'.",
    infoImage: "<img src='/static/module/reaction3/infoImage.png'>",//max width : 500px
    
    /*
    For the reagents, products and experimental condition,
    please indicate a .obj file, a .mtl file and a preset marker.
    */
    type: {
    // list of reagents
        reagents: {
            reagent1: ["fatty_acid.obj", "fatty_acid.mtl", "COOH"],
            reagent2: ["alcohol.obj", "alcohol.mtl", "OH"]
        },

        // list of products
        products: {
            product1: ["ester.obj", "ester.mtl", "COOH"],
            product2: ["hoh.obj", "hoh.mtl", "OH"]
        },
    },
    //list of conditions
    conditions: {

    },
    /* legend stuff */
    legend : {
        atoms : ["carbon","hydrogen","oxygen","Rchain"],//goes with a 1024x1024 image in assets/legend/ for each element, for exemple carbon.png for carbon
        markers : {
            "COOH" : "fatty acid & ester",
            "OH" : "alcohol & water",
        },
    },
};