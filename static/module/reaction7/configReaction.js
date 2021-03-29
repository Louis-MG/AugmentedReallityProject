export const data = {
    name: "Sugar methylation",
    title: "Sugar methylation",
    description: "A hydroxyl group of a suger is methylated, releasing water.",
    image: "<img src='/static/module/reaction5/icon.png' style='width: 100%;position: relative; top:80px; left:-80px'>",
    infoImage: "<img src='/static/module/reaction5/infoImage.png'>",//max weight : 500px
    
    /*
    For the reagents, products and experimental condition,
    please indicate a .obj file, a .mtl file and a preset marker.
    */
   
    type: {
        // list of reagents
        reagents: {
            reagent1: ["Dgluc.obj", "Dgluc.mtl", "OSE"],
            reagent2: ["Methanol.obj", "Methanol.mtl", "OH"],
        },

        // list of products
        products: {
            product1: ["DglucMeth.obj", "DglucMeth.mtl", "OSE"],
            product2: ["hoh.obj", "hoh.mtl", "OH"]
        },
    },
    // list of condition
    conditions: {
    },
    legend : {
        atoms : ['carbon', 'oxygen', 'hydrogen'],
        markers : {
            "OSE" : "Sugar",
            "OH" : "Methanol"
        }
    }
};