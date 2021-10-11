// Elements du DOM
const divVies = document.querySelector(".vies");
const message = document.getElementById("message");
const formulaire = document.getElementById("inputBox");
const input = document.getElementById("number");
const essayerBtn = document.getElementById("essayerBtn");
const rejouerBtn = document.getElementById("rejouerBtn");
const body = document.getElementsByTagName("body")[0];
const nombreEssais = document.getElementById("nombreEssais");
const facile = document.getElementById("facile");
const moyen = document.getElementById("moyen");
const difficile = document.getElementById("difficile");
const trouve = document.getElementById("trouve");
const choix = document.getElementById("choix");
const annulerBtn = document.getElementById("annulerBtn");

// comme on veut le body et pas les autres on appelle le premier element du tableau donc [0]

// Mdèle de coeurs
const coeurVide = '<ion-icon name="heart-outline"></ion-icon>';
const coeurPlein = '<ion-icon name="heart"></ion-icon>';

// Fond
const bgFroid = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
const bgTiede = 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)';
const bgChaud = 'linear-gradient(-60deg, #ff5858 0%, #f09819 100%)';
const bgBrulant = 'linear-gradient(to top, #ff0844 0%, #ffb199 100%)';

const bgWin = 'linear-gradient(-225deg, #231557 0%, #44107A 29%,  #FF1361 67%, #FFF800 100%)';
const bgLoose = 'linear-gradient(60deg, #29323c 0%, #485563 100%)';

function option (){
    facile.addEventListener('click', () => {
    choix.style.display = "none";
    trouve.style.display = "block";
    var choixDifficulte = 9;
    play(choixDifficulte);
})   
    moyen.addEventListener('click', () => {
        choix.style.display = "none";
        trouve.style.display = "block";
        var choixDifficulte = 5;
        play(choixDifficulte);
    })
    difficile.addEventListener('click', () => {
        choix.style.display = "none";
        trouve.style.display = "block";
        var choixDifficulte = 3;
        play(choixDifficulte);
})
}
option();
// Play : 
const play = (choixDifficulte) => {
    // c'est une fonction fléchée
    annulerBtn.addEventListener('click', () => {
        document.location.reload(true);
    })
    
    // nombre aléatoire
    const randomNumber = Math.floor(Math.random() *101);
    // Math.random() va créé un nombre aléatoire entre 0 et 1 (1 étant exclu, on aura au maximum 0.99999)   vu qu'on veut un nombre entre 1 et 100  on va multiplier par 101 (101 pour avoir 100)
    // Math.floor va prendre le resultat de la multiplication et l'arrondir au nombre entier inférieur
    const totalVies = choixDifficulte;
    // constante car c'est le nombre de vies qu'on a au départ donc toujours le même
    let vies = totalVies;
    // cette variable c'est le nombre de vies au cours du jeu
    console.log(randomNumber);
    // ca permettra de visualer le nombre généré par l'ordi et donc de vérifier si ça fonctionne

    // actualisation à chaque essai - TOUTE LA LOGIQUE
    formulaire.addEventListener('submit', (e) => {
        // on rappelle le formulaire qui va se declencher à partir d'une certaine action .addEventListener  => ici l'action sera "submit" donc quand le formulaire sera envoyé   on va lui demander d'executer une fonction qui se deroulera sur e que l'on va donc mettre comme parametre dans la fonction que l'on veut executer qui aura pour action ce qui sera après la fleche
        e.preventDefault();
        // quand un formulaire est envoye ca implique une requete au serveur et donc un rechargement de la page. Mais la on veut pas sinon ca va relancer le jeu donc on tape preventDefault sur l'element dont depend le formulaire donc ici e
        const valeurInput = parseInt(input.value);
        // la on recupere la valeur de l'input
        if(valeurInput <0 || valeurInput > 100) return;

        if(valeurInput === randomNumber){
            body.style.backgroundImage = bgWin;
            message.textContent = `BRAVO !!! Le nombre était bien ${randomNumber}`;
            // pour écrire `` il faut faire touche Alt gr et touche 7 (des back ticks)=> pour écrire un texte dynamique avec des valeurs qui changent (ajouter des variables dynamiquement avec aussi ${})
            rejouerBtn.style.display = "block";
            essayerBtn.setAttribute("disabled", "");
        }

        if(valeurInput !== randomNumber){
            if(randomNumber < valeurInput + 3 && randomNumber > valeurInput -3){
                body.style.backgroundImage = bgBrulant;
                message.textContent = "C'est Brûlant !!! 🔥🔥🔥 ";
                // pour integrer une emoji  on installe l extension emojisense une fois installee dans visual studio  quand on veut mettre une icone on tape ctrl + i  ca ouvre une fenetre et on tape ce qu on veut
            }
            else if(randomNumber < valeurInput + 6 && randomNumber > valeurInput -6){
                body.style.backgroundImage = bgChaud;
                message.textContent = "C'est Chaud ! 🔥 ";
            }
            else if(randomNumber < valeurInput + 11 && randomNumber > valeurInput -11){
                body.style.backgroundImage = bgTiede;
                message.textContent = "C'est Tiède 😐 ";
            }
            else{
                body.style.backgroundImage = bgFroid;
                message.textContent = "C'est Froid ❄️ ";
            }
            vies--;
            // on enlève un à la variable vies
            verifyLoose();
        }
        actualiseCoeurs(vies);
    })
    const verifyLoose = () => {
        if(vies === 0){
            body.style.backgroundImage = bgLoose;
            body.style.color = '#990000';
            essayerBtn.setAttribute("disabled", "");
            // comme le joueur a perdu il faut desactiver le bouton donc on lui dit .setAttribute le premier attribut qu on lui donne est le nom de l attribut  ici disabled pour desactive   et le second la valeur  ici rien puisque desactive
            message.textContent = `Vous avez perdu. La réponse était ${randomNumber}`;
            rejouerBtn.style.display = "block";
            essayerBtn.style.display = "none";
        }
    }
    const actualiseCoeurs = (vies) => {
        divVies.innerHTML = "";
        // on enlève tout le code HTML dans la divVies
        let tableauDeVies = [];
        // on initialise un tableau vide
        for(let i = 0; i < vies; i++){
            tableauDeVies.push(coeurPlein);
            // il ajoute un coeur au tableau jusqu au nombre vies que l on a fixe
        }
        for(let i = 0; i < totalVies - vies; i++){
            tableauDeVies.push(coeurVide);
            // il ajoute un coeur au tableau jusqu au nombre vies que l on a fixe
        }
        tableauDeVies.forEach(coeur => {
            // pour mettre chaque element de notre tableau dans notre HTML
            divVies.innerHTML += coeur;
            nombreEssais.textContent = `Trouve le bon nombre entre 0 et 100. Tu as ${vies} essais !`;
        })
    }
    actualiseCoeurs(vies);
    rejouerBtn.addEventListener('click', () => {
        message.style.display = 'none';
        // des fois il peut y avoir un temps de latence à la disparition du message donc par securite on lui dit disparait
        document.location.reload(true);
        // la on lui demande de relancer la page donc redemarrage du jeu
    })
}
// play();
