<template>
<section>
<h2>Tutoriels</h2>
<div class="ui grid">
  <div class="eight wide column">
    <h3>Consulter une liste publique</h3>
    <p>La page d'accueil vous permet de consulter les dernières listes publié par les membres du site.</p>
    <p>Pour cela rien de plus simple, il vous suffit de cliquer sur le nom de la liste que vous souhaitez consulter.</p>
    <p>Ensuite, vous pouvez cocher/décocher les tâches à votre convenance. Attention ! Si vous rafraîchissez la page la liste revient à son état initial.</p>
    <p>Filtrer la liste pour ne voir que les tâches à faire (par défaut), toutes les tâches ou que celles terminées.</p>
  </div>
  <div class="eight wide column">
    <img src="/static/images/gifs/publiclists.gif" alt="">
  </div>
  <div class="eight wide column">
    <img src="/static/images/gifs/createlist.gif" alt="">
  </div>
  <div class="eight wide column">
    <h3>Créer une liste</h3>
    <p>Pour créer une liste, vous devez être connecté à votre compte, si ce n'est pas le cas, vous pouvez le faire ici <i class="pointing right icon"></i>
      <router-link :to="{name: 'signin'}" class="ui button pink"><i class="sign in icon"></i>Je me connecte</router-link> ou en cliquant sur connexion en haut à droite du menu, si vous n'êtes pas encore inscris cliquez sur ce bouton <i class="pointing right icon"></i>
      <router-link :to="{name: 'signup'}" class="ui button pink"><i class="id card outline icon"></i>Je m'inscris</router-link> ou en cliquant sur inscription en haut à droite du menu juste avant connexion.
      </p>
    <p>Une fois connecté vous êtes directement redirigé sur votre profil. À partir de là saisissez le nom de votre liste dans le champ situé en dessous de créer une nouvelle liste. Choisissez si la liste sera visible aux yeux de tous en choisissant publique ou bien privé si vous souhaitez qu'elle soit seulement visible par vous-même. Cliquez sur créer ou appuyer sur entrée pour créer la liste.</p>
    <p>Vous serez redirigé vers la page correspondant à la liste et vous pourrez en modifier le nom en double cliquant dessus. Vous le corriger et confirmé en appuyant sur entrée</p>
    <p>Vous pouvez utiliser les flèches de navigation pour revenir en arrière ou aller à la page suivante s'il y en a une.</p>
    <p>Placez votre curseur au-dessus du nom d'une liste sur votre page de profil, un icone bleu représentant un carton avec une flèche vers le bas vous permettra d'archiver votre liste et une flèche vers le haut de la désarchiver.</p>
    <p>Supprimer une liste en cliquant sur la croix rouge à droite du nom de celle-ci puis en confirmant.</p>
  </div>
  <div class="eight wide column">
    <h3>Créer des tâches</h3>
    <p>Afin d'ajouter des tâches, saisissez le nom de votre tâche dans le champ prévus à cet effet et appuyer sur la touche entrée.</p>
    <p>Pour modifier l'intitulé d'une tâche double cliquez sur celle-ci, modifier là et confirmer en appuyant sur la touche entrée.</p>
    <p>Compléter/décompléter une tâche s'accomplis en cliquant sur le rond à gauche de l'intitulé de celle-ci.</p>
    <p>Pour changer l'ordre des tâches il faut mettre le filtre sur toutes (les tâches), et glisser déposé les tâches là ou vous souhaitez qu'elle soit.</p>
    <p>Supprimer une tâche en cliquant sur la croix rouge qui apparait au survole à droite de celle-ci.</p>
  </div>
  <div class="eight wide column">
    <img src="/static/images/gifs/createtasks.gif" alt="">
  </div>
  <div class="eight wide column">
    <img src="/static/images/gifs/addcollaborator.gif" alt="">
  </div>
  <div class="eight wide column">
    <h3>Ajouter des collaborateurs</h3>
    <p>Pour ajouter un collaborateur à une liste afin qu'il puisse lui aussi modifier la liste. Il suffit de se rendre sur la liste et de cliquer sur copier le lien et de l'envoyer à ou aux personnes concerné. Celle-ci n'a plus qu'a le coller dans son navigateur.</p>
    <p>Vous pouvez renouveler le lien afin qu'il ne puisse plus être utilisé pour faire partie des collaborateurs de la liste.</p>
  </div>
</div>
</section>
</template>

<script>
  export default {
    data: () => {
      return {
      }
    }
  }
</script>
