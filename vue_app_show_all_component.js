var domReady = function (callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function () {
  var config = {
    apiKey: "AIzaSyDMn-sNlJ5lIF1YVeLqujt_JXCL_Ac8tO8",
    authDomain: "roy-oswalt-collection.firebaseapp.com",
    databaseURL: "https://roy-oswalt-collection.firebaseio.com",
    projectId: "roy-oswalt-collection",
    storageBucket: "roy-oswalt-collection.appspot.com",
    messagingSenderId: "81132660105"
  };
  firebase.initializeApp(config);
  const db = firebase.firestore();

  Vue.component('card-component', {
    template: `
    <li>
      <figure class="figure-list__figure">
        <figcaption class="figure-list__caption">
          <span>{{buildCardString(card)}}</span>
        </figcaption>
        <div v-if="card.img_src === ''" class="image-unavailable">
          <svg role="presentation" class="image-unavailable__svg" viewBox="0 0 32 32">
            <use xlink:href="#image-unavailable__svg" />
          </svg>
          <strong class="image-unavailable__caption">Image available eventually</strong>
        </div>
        <a v-else-if="card.img_src != '' && !Array.isArray(card.img_src)" aria-label="Open Image in Gallery" data-fancybox="gallery" :data-hash="buildHashData(card)" :data-caption="buildCardString(card)" :href="card.img_src">
          <img :data-src="card.img_src" :class="[card.img_size, 'lazyload', 'thumbnail']">
        </a>
        <a v-else v-for="img in card.img_src" aria-label="Open Image in Gallery" data-fancybox="gallery" :data-hash="buildHashData(card)" :data-caption="buildCardString(card)" :href="img">
          <img :data-src="img" :class="[card.img_size, 'lazyload', 'thumbnail']">
        </a>
      </figure>
    </li>
    `,
    props: {
      card: {}
    },
    methods: {
      buildCardString: function (card) {
        let baseString = card.year + ' ' + card.set + ' #' + card.number;
        if (card.other_info != '') {
          baseString += ' ' + card.other_info;
        }
        if (card.other_players != '') {
          baseString += ' w/' + card.other_players;
        }
        if (card.serial_numbered != '') {
          baseString += ' ' + card.serial_numbered;
        }
        if (card.grade != '') {
          baseString += ' ' + card.grade;
        }
        return baseString;
      },
      buildHashData: function (card) {
        return card.year + '-' + card.set.replace(/\s+/g, '-').toLowerCase();
      }
    }
  });

  window.app = new Vue({
    el: '#wrapper',
    data: {
      allCards: [],
      yearsRange: 'loading...',
      overallTotal: 'loading...',
      lastUpdated: 'loading...'
    },
    created: function () {
      category = document.getElementById('wrapper').dataset.category;
      db.collection('cards/cards_document/cards_subcollection').doc(category).get().then((snapshot) => {
        this.allCards = snapshot.data()['all_cards'];
        this.overallTotal = snapshot.data()['overall_total'];
        this.lastUpdated = this.buildLastUpdated(snapshot.data()['last_updated']);
        this.yearsRange = this.buildYearsRange();
      });
    },
    updated: function () {
      this.startFancybox();
      this.triggerFancyboxHash();
      $(window).on('hashchange', this.triggerFancyboxHash);
    },
    methods: {
      buildLastUpdated: function (data) {
        return data.toDate().toLocaleDateString('en-US',
          { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
      },
      buildYearsRange: function () {
        if (this.allCards.length > 1) {
          let allCards = this.allCards;
          return allCards[0].year + ' - ' + allCards[allCards.length - 1].year;
        }
      },
      startFancybox: function () {
        // TODO: Possibly find a way to remove the appended index number in the custom `data-hash`
        // without messing up the back button and history.
        $('[data-fancybox="gallery"]').fancybox({
          loop: true,
          animationEffect: 'fade',
          animationDuration: 300,
          buttons: [
            "zoom",
            "slideShow",
            "fullScreen",
            "thumbs",
            "close"
          ]
        });
      },
      triggerFancyboxHash: function () {
        let hash = window.location.hash
        if (hash != '') {
          hash = hash.replace(hash, hash.substr(1));
          parts = hash.split('-');
          parts.pop();
          hash = parts.join('-');
          $('a[data-hash=' + hash + ']').trigger('click');
        }
      },
      toggleMenuButton: function (event) {
        $(event.target).toggleClass('menu-is-open');
		    $('#primary-nav').toggleClass('primary-nav--is-visible');
      }
    }
  });
});
