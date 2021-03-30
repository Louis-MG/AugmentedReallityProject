# Bio-informatics project

# Visual exploration of chemical reaction using augmented reality

## Presentation of project

This project was made as part of the UE BIO1282M "Projet En Bioinformatique 2"

from the first year of the bio-informatics master of Université Claude Bernard Lyon 1.
It was produced by four students : 
* Barberis Tommaso 
* Chaffurin Ilan
* Nathanaël Debanne
*  Guéguen Louis-maël

## How to use the website

The first step is to print the markers that can be found on the documentation fo the website or at ./statics/assets/markers.pdf and ./statics/assets/markers.png

Then from the main menu of the website : Choose a reaction and use markers to make the reaction happen.
##### different types of reaction


![Reactions type](./statics/assets/Disegno_senza_titolo.png "Reactions type" )


## Markers 
##### Add new markers for new molecules  
To add new markers, simply create new markers using this [website](https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html). Be sure to use 250px for the image size

 Then put the .png file and .patt file in the ./statics/assets directory. 

## Molecules
##### Add new molecules 
Create a .obj and .mtl file using another tool (Blender for exemple) and put them in the ./statics/assets directory. 

## How to implement new reactions
 This tool use dynamic import to create new reactions.
* The first step is to be sure that the files for the molecules and markers you want  to use are in

the ./statics/assets directory. 
 
 If not, see information before.
 
* Then, create a new directory in the ./statics/assets/module directory called reactionX where X is 
 
1 + the number of reaction already implemented.
 
* In the new directory , add the .obj and .mtl file for the molecules you want to use in the reaction.


Add the .png file that must will be use as the icon on the main menu of the website. (TODO: there is no restriction ont the iamge for now, but use small images)

Finally create a configReaction.js that must follow the template at ./statics/assets/configReactionTemplate.js

* ConfigReaction.js
ConfigReaction must follow the template at ./statics/assets/configReactionTemplate.js

All elements must existe even if empty.

If there is conditions that must be implemented : it must follow the following template
```
conditions: {
        Condition1: {
            name: "NameOfCondition1",
            min: intMin,
            max: maxInt,
            step: 1,
            val: StartValue,
            cutoffMin: cutoffMinInt,
            cutoffMax: cutoffMaxInt
        },
        Condition2: {
            name: "NameOfCondition2",
            min: intMin,
            max: maxInt,
            step: 1,
            val: StartValue,
            cutoffMin: cutoffMinInt,
            cutoffMax: cutoffMaxInt
        },
    },

```
