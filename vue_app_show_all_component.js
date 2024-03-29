const domReady = function (callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function () {
  const config = {
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
          <span v-html="buildCardString(card, inlineStyles = true)"></span>
        </figcaption>
        <div v-if="!card.img_src" class="image-unavailable">
          <svg role="presentation" class="image-unavailable__svg" viewBox="0 0 32 32">
            <use xlink:href="#image-unavailable__svg" />
          </svg>
          <strong class="image-unavailable__caption">Image available eventually</strong>
        </div>
        <a v-else-if="card.img_src && !Array.isArray(card.img_src)" aria-label="Open Image in Gallery" data-fancybox="gallery" :data-hash="buildHashData(card)" :data-caption="buildCardString(card)" :href="card.img_src">
          <img alt="" :data-src="card.img_src" :class="[card.img_size, 'lazyload', 'thumbnail']">
        </a>
        <a v-else v-for="img in card.img_src" aria-label="Open Image in Gallery" data-fancybox="gallery" :data-hash="buildHashData(card)" :data-caption="buildCardString(card)" :href="img">
          <img alt="" :data-src="img" :class="[card.img_size, 'lazyload', 'thumbnail']">
        </a>
      </figure>
    </li>
    `,
    props: {
      card: {}
    },
    methods: {
      buildCardString: function (card, inlineStyles = false) {
        let baseString = card.year + ' ' + card.set + ' #' + card.number;
        if (card.other_info) {
          baseString += ' ' + card.other_info;
        }
        if (card.other_players) {
          baseString += ' w/' + card.other_players;
        }
        if (card.serial_numbered) {
          let serialNumbered = card.serial_numbered;
          if (Array.isArray(serialNumbered)) {
            serialNumbered = serialNumbered.join(', ');
            let lastCommma = serialNumbered.lastIndexOf(', ');
            serialNumbered = serialNumbered.substring(0, lastCommma) + serialNumbered.substring(lastCommma+2);
          }
          if (inlineStyles) {
            baseString += ' <span class="figure-list__caption--serial" title="serial numbered">' + serialNumbered + '</span>';
          }
          else {
            baseString += ' ' + serialNumbered;
          }
        }
        if (card.grade) {
          let grade = card.grade;
          if (Array.isArray(grade)) {
            grade = grade.join(', ');
          }
          baseString += ' ' + grade;
        }
        return baseString;
      },
      buildHashData: function (card) {
        let cardSet = card.set;
        if (cardSet.indexOf('/') > 0) {
          cardSet = cardSet.replace(/\//g, '-');
        }
        return card.year + '-' + cardSet.replace(/\s+/g, '-').toLowerCase();
      }
    }
  });

  window.app = new Vue({
    el: '#wrapper',
    data: {
      allCards: [],
      yearsRange: 'loading...',
      overallTotal: 'loading...',
      lastUpdated: 'loading...',
      ISODate: '',
      menuIsOpen: false
    },
    created: function () {
      category = document.getElementById('wrapper').dataset.category;
      db.collection('cards/cards_document/cards_subcollection').doc(category).get().then((snapshot) => {
        const data = snapshot.data();
        this.allCards = data['all_cards'];
        this.overallTotal = data['overall_total'];
        const date = data['last_updated'].toDate();
        this.ISODate = date.toISOString();
        this.lastUpdated = this.buildLastUpdated(date);
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
        return data.toLocaleDateString('en-US',
          { year: 'numeric', month: 'short', day: 'numeric' });
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
          let parts = hash.split('-');
          parts.pop();
          hash = parts.join('-');
          $('a[data-hash=' + hash + ']').trigger('click');
        }
      },
      toggleMenuButton: function () {
        if (this.menuIsOpen) {
          return this.menuIsOpen = false
        }
        return this.menuIsOpen = true;
      }
    }
  });
});
