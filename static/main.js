import { H2O } from "./module/h2o.js";
import { peptideLink } from "./module/peptide-link.js";
import * as docu from "./module/docu.js"

const footer = document.getElementsByClassName('footer')[0];
const moleculeBackground = document.getElementById("bgvid");
const container1 = document.getElementsByClassName('container1')[0];
const bigTitle = document.getElementsByClassName("bigTitle")[0];
const reaction = document.getElementById('reaction');
const documentation = document.getElementById('docu');



function hideShow (elements, action) {
    // action can be none, block, hidden or visible
    elements = elements.length ? elements : [elements];
    for (var index = 0; index < elements.length; index++) {
        elements[index].style.display = action;
    }
}

function camera(load){
    if (load===true){
        document.getElementById("bugWorkaround").innerHTML = `
    <script>
    // Workaround for an AR.js bug (https://github.com/jeromeetienne/AR.js/issues/410)
    const sceneEl = document.querySelector('a-scene');
    sceneEl.addEventListener('loaded', () => {
        console.log("creation camera")
        sceneEl.camera = new THREE.PerspectiveCamera();
    });
    </script>
    `
    }else{
        document.getElementById("bugWorkaround").innerHTML = `
    <div id="child"></div>
    `
    }
}

function killRunningReaction() {
    if (typeof window.currentReaction !== 'undefined') { // if some reaction is already running
        console.log("killing the previous reaction...")
        clearInterval(window.currentReaction) // kill it !
    }
}

function hideReactionPage(){
    console.log("hiding reaction page...");
    container1.style.display = 'none';
    footer.style.display= 'none';
    moleculeBackground.style.display = 'none';
}

const button2 = document.getElementById('button2');

function showReactionPage(){
    console.log("showing reaction page...");
    killRunningReaction();
    container1.style.display = 'block';
    footer.style.display= 'block';
    bigTitle.innerHTML = "Choose a reaction";
    moleculeBackground.style.display = 'block';
    camera(false);
    reaction.innerHTML = `
    <div id="child"></div>
    `;
}

button2.addEventListener('click', showReactionPage);

const button = document.getElementById('button1');

function loadH2O(){
    console.log("loading reaction...");
    hideReactionPage();
    bigTitle.innerHTML = "H2O formation";
    reaction.innerHTML = `
    
    <!-- reaction information -->

    <div class="mainText">
        <p id="info"><b>Three atoms that transfer a proton: move markers around to create an H2O molecule</b></p>
        <p id="infop"></p>
    </div>

    <!-- peptide bond reaction -->

    <a-scene embedded artoolkit='patternRatio: 500; sourceType: webcam;' id="thescene">
        <!-- handle hiro marker-->
        <a-marker preset='hiro' id="lysmarker">
            <!-- This is an hydrogen atom
            All coordinates have been divided by 2, so any distance between two atoms must be multiplied by 2 to get the actual distance-->
            <a-sphere id="hyd1" position="-1.0 0 -0.3" color="white" radius="0.25" visible="true"></a-sphere>
        </a-marker>

        <a-marker preset='letterA' id="promarker">
            <!-- This is a second hydrogen atom
            All coordinates have been divided by 2, so any distance between two atoms must be multiplied by 2 to get the actual distance-->
            <a-sphere id="hyd2" position="-1.0 0 -0.3" color="white" radius="0.25" visible="true"></a-sphere>
        </a-marker>

        <!-- handle kanji marker -->
        <a-marker preset='kanji' id="glumarker">
            <!-- This is an H2O molecule with hydrogen bonds
            The deal is to create H2O and to hide or not H and bonds -->
            <a-sphere id="hoh1" position="0 0 0" color="red" radius="0.35" visible="true"></a-sphere>
            <a-sphere id="hoh2" position="0 0 -0.8" color="white" radius="0.25" visible="true"></a-sphere>
            <a-sphere id="hoh3" position="0 0 0.8" color="white" radius="0.25" visible="true"></a-sphere>
            <a-box id="l1" position="0 0 -0.3" color="grey"  lenght="0.15" width="0.15" height="0.04" visible="true"></a-box>
            <a-box id="l2" position="0 0 0.3" color="grey"  lenght="0.15" width="0.15" height="0.04" visible="true"></a-box>
        </a-marker>

        <!-- add a simple camera -->
        <a-entity camera></a-entity>
    </a-scene>
    
    `;
    camera(true);
    window.currentReaction = setInterval(function (){H2O();}, 200);
}

button.addEventListener('click', loadH2O);

const button3 = document.getElementById('button3');

function loadPeptideLink(){
    console.log("loading reaction...");
    hideReactionPage();
    bigTitle.innerHTML = "peptide bond formation";
    camera(true);
    peptideLink(document.getElementById('reaction'));
}

button3.addEventListener('click', loadPeptideLink);

function loadDocuReaction(){
    console.log("loading reaction documentation...")
    hideReactionPage();
    killRunningReaction();
    camera(false);
    reaction.innerHTML = `
    <div id="child"></div>
    `;
    documentation.innerHTML = `

    <div class = "button_box"> <!--buttons to changes languages-->

      <button class = "language1" onclick="change_to_french()" ><img class = flag src = "./assets/french-flag.png" ></button>

      <button class = "language2" onclick="change_to_english()" ><img class = flag src = "./assets/union-jack.jpg" ></button>

      <button class = "language3" onclick="change_to_italian()" ><img class = flag src = "./assets/italian_flag.svg" ></button>

    </div>

    <div id ="french" class = "french"> <!--should b the first seen, with switch to english available through button-->

        <div class = title ><h2><strong>Réactions explorables avec l’AR de ce projet:</strong></h2></div>

        <div class = hemititle ><h2>Réaction de saponification entre un acide gras et la potasse:</h2></div>

        <p class  = main_text>

          La réaction de saponification est une réaction chimique qui transforme un ester carboxylique (groupement de la forme R-COO-R’), ou un acide carboxylique (R’ est remplacé par un groupement hydroxyle) en un ion carboxylate et un alcool si la molécule de départ était un ester sinon une molécule d’eau si c'était un acide carboxylique. Pour permettre la transformation, l’ester ou l’acide carboxylique doivent réagir avec une base forte, comme par exemple la potasse KOH, qui en milieu aqueux se dissocie en K+ et OH-. 
          Le OH- libre dans l’eau sera donc capable de faire un attaque nucléophile sur le groupement R’ de l’ester ou le proton H du groupement carboxyle de l’acide gras.
          
        </p>
        <img class = marker src = "./assets/Saponification.PNG" alt = "La réaction de saponification"><img>
        <!--Par Original téléversé par Rhadamante sur Wikipédia français. — Transféré de fr.wikipedia à Commons par Bloody-libu utilisant CommonsHelper., CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=20534114-->

        <p class = main_text>

          La saponification est une réaction plutôt lente (cinétique d’ordre 2) mais elle se produit à température ambiante. C’est une réaction totale donc les réactifs (l’acide gras et la base) sont complètement consommés à la fin de la réaction et il s’agit d’une réaction exothermique (elle dégage de l'énergie thermique).
          La réaction de saponification peut être bien plus complexe que cela car elle peut se produire sur les esters d’acides gras des triglycérides. <br>
          <br>
          Cette réaction s’appelle réaction de saponification car le sel d’acide gras obtenu à fin réaction est plus communément appelé savon, et c’est pour cela qu'elle est amplement utilisée dans l’industrie chimique dans la production de produits pour l'hygiène.
          Apprenez-en plus sur <a href = "https://fr.wikipedia.org/wiki/Saponification">Wikipedia</a>.
        </p>

        <div class = hemititle ><h2>Formation de la liaison peptidique:</h2></div>

        <p class  = main_text>

          La formation de liaisons peptidiques est une réaction biochimique très importante pour la vie car il s’agit de la réaction qui permet d'enchainer et relier les acides aminés qui constituent les protéines.
          La réaction qui mène à la formation de la liaison peptidique est une réaction de condensation entre  un groupement carboxylique -COOH et un groupement amine -NH2 avec la libération d’une molécule d’eau.
        
        </p>
        <img class = marker src = "./assets/AminoacidCondensation.svg" alt = "Formation d'une liaison peptidique"><img>
        <!--By V8rik at English Wikipedia - Own work, Public Domain, https://commons.wikimedia.org/w/index.php?curid=7890768-->
        <p class = main_text>

          La réaction mène à la formation d’une amide substituée où la résonance entre la liaison C=O et le doublet non liant de l’azote fait que la liaison peptidique soit un mélange entre une liaison simple et une liaison double.
          Apprenez-en plus sur <a href = "https://fr.wikipedia.org/wiki/Liaison_peptidique">Wikipedia</a>.

        </p>

        <div class = hemititle ><h2>Formation de la liaison ester:</h2></div>

        <p class  = main_text>

          La formation de liaison ester aussi appelée estérification consiste en la condensation d’un groupement acide carboxylique ( ou un dérivé ) avec un groupement alcool pour aboutir à un ester et un résidu (le résidu étant une molécule d’eau pour un acide carboxylique).
          Cette réaction est une réaction lente.
        
        </p>
        <img class = ester src = "./assets/reac_ester.png" alt = "Formation d'une liaison ester"><img>

        <p class = main_text>

          Cette réaction donne lieu à la formation d'une amine substituée au lieu de la raisonnance entre la liaison double C=O et le doublet non liant de l'azote. Le produit final est ... le savon !
          Apprenez-en plus sur <a href = "https://fr.wikipedia.org/wiki/Est%C3%A9rification">Wikipedia</a>.
        </p>

    </div>

    <!--English section, should be shown when clicking the button and vice-versa with the french one-->

    <div id = "english" class = "english">
    
        <div class = title ><h2><strong>Reactions to explore with this project:</strong></h2></div>
    
        <div class = hemititle ><h2>Saponification reaction between a fatty acid and potash:</h2></div>
    
        <p class  = main_text>
    
          Saponification reaction is a chemical reaction that transform a carboxylic ester (R-COO-R’ form) or a carboxylic acid (if R’ is replaced by OH) into a carboxylate ion and an alcohol (or water if R’ was a OH).To allow the transformation, the ester/carboxylic acid must react with a strong base like potash KOH, which dissolves in K+ and OH- in water. The free OH- will do a nucleophile attack on the R’ of the ester or H of the carboxylic group of the fatty acid.

        </p>
        
        <img class = marker src = "./assets/reac_sapo.png" alt = "Saponification"><img>
    
        <p class = main_text>
    
          Saponification has a cinetic order of 2 and can happen at ambient temperature. The reaction is total and exothermic. It also can be much more complex due to it happening with fatty acid esters of triglycerides. 
          Learn more about it on <a href = "https://en.wikipedia.org/wiki/Saponification">Wikipedia</a>.
        </p>
        
        <div class = hemititle ><h2>Formation of the peptidic bond:</h2></div>
    
        <p class  = main_text>
    
          The formation of peptidic bonds is a very important biochemical reaction for life as it chains amino acids to build proteins. More precisely it is the condensation of a carboxylic group (-COOH) and an amine group (-NH2), and it frees a water molecule. 

        </p>
        
        <img class = marker src = "./assets/reac_peptidic.png" alt = "Petpid bond formation"><img>
    
        <p class = main_text>
    
          That reaction leads to the formation of an amino substituted where the resonance between the C=O bond and the non-binding doublet is balanced between simple and double bond. The final product is ... soap !
          Learn more about it on <a href = "https://en.wikipedia.org/wiki/Peptide_bond">Wikipedia</a> </a>.
        </p>

        <div class = hemititle ><h2>Ester bond formation:</h2></div>
    
        <p class  = main_text>
    
          The formation of the ester bond, also called esterification consists in the condensation of a carboxylic acid group (or similar) with an alcohol group to give rise to the ester and a residue (water in case of a carboxylic). 

        </p>
        
        <img class = ester src = "./assets/reac_ester.png" alt = "Ester formation"><img>
    
        <p class = main_text>
    
          That reaction leads to the formation of an amino substituted where the resonance between the C=O bond and the non-binding doublet is balanced between simple and double bond.
          Learn more about it on <a href = "https://en.wikipedia.org/wiki/Fischer%E2%80%93Speier_esterification">Wikipedia</a> </a>.
        </p>

    </div>

    <div id ="italian" class = "italian"> <!-- italian versions of the doc-->

        <div class = title ><h2><strong>Reazioni disponibili con la realtà aumentata<br>di questo progetto:</strong></h2></div>

        <div class = hemititle ><h2>Razione di saponificazione fra un acido grasso e l'idrossido di potassio:</h2></div>

        <p class  = main_text>

          La reazione di saponificazione è una reazione chimica che trasforma un estere carbossilico (gruppo chimico della forma R-COO-R'), o un acido carbossilico (con un -OH al posto di R') in un ione carbossilato e un alcool (se la molecola di partenza era un estere) o in una molecola d'acqua (se era un acido carbossilico).
          Per permettere la trasformazione, l'estere o l'acido carbossilico devono reagire con una base forte, come per esempio l'idrossido di potassio (KOH), che in acqua si dissocia in K+ e OH-. L'OH- libero può quindi effettuare un attacco nucleofilo su R' (per l'estere) o sull'idrogeno (per l'acido carbossilico).
          
        </p>
        <img class = marker src = "./assets/reac_sapo.png" alt = "La réaction de saponification"><img>

        <p class = main_text>

          La saponificazione è una reazione piuttosto lenta (reazione di ordine 2) ma che si produce però a temperatura ambiente. La reazione è totale quindi i reagenti (l'acido grasso e la base) sono completamente consumati alla fine e si tratta di una reazione esotermica (libera dell'energia termica).
          La reazione di saponificazione può essere ben più complessa di cosi perché può effettuarsi su gli estere di acifi grassi dei trigliceridi.
          <br>
          La reazione piglia il nome di saponificazione perché il sale d'acido grasso ottenuto è più comunemente chiamato sapone, e per questa ragione è ampiamente utilizzata nell'industria chimica nella produzione di prodotti per l'igigene.
          Per saperne di più su <a href = "https://it.wikipedia.org/wiki/Saponificazione">Wikipedia</a>.
        </p>

        <div class = hemititle ><h2>Formazione del legame peptidico:</h2></div>

        <p class  = main_text>

          La formazione dei legami peptidici è una reazione biochimica molto importante per la vita perché si tratta della reazione che permette di legare gli amminoacidi gli uni agli altri per formare in seguito le proteine.
          Da un punto di vista puramente chimico, si tratta di una reazione di condensazione, tra il gruppo carbossilico -COOH di un amminoacido e il gruppo -NH2 di un altro amminoacido, che libera quindi una molecola d'acqua.
          Per saperne di più su <a href = "https://it.wikipedia.org/wiki/Legame_peptidico">Wikipedia</a>.
        </p>

        <img class = marker src = "./assets/reac_peptidic.png" alt = "Formation d'une liaison peptidique"><img>

        <p class = main_text>

          La reazione forma quello che viene chiamato ammide sostituta,dove la resonanza fra il legame C=O e il doppietto elettronico non condiviso dell'azoto fa che il legame peptidico sia in realtà un misto fra legame semplice e doppio.          
          Per saperne di più su <a href = "https://it.wikipedia.org/wiki/Legame_peptidico">Wikipedia</a>.
        </p>

        <div class = hemititle ><h2>Processo di esterificazione:</h2></div>

        <p class  = main_text>

          L'esterificazione consiste nella condensazione di un acido carbossilico (o di un suo derivato) e di un alcol in un estere e un residuo (una molecola d'acqua per gli acidi carbossilici). Il prodotto finale è ... il sapone
          La reazione è una reazione lenta.

        </p>
        <img class = "ester" src = "./assets/reac_ester.png" alt = "Formation d'une liaison ester"><img>

        <p class = main_text>

          Per saperne di più su <a href = "https://it.wikipedia.org/wiki/Esterificazione">Wikipedia</a>.
          
        </p>

    </div>
    `
}