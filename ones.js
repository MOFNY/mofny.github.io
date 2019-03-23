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
        <img v-if="card.img_src != ''" :data-src="card.img_src" :class="[card.img_size, 'lazyload', 'thumbnail']">
        <div v-else class="image-unavailable">
          <svg role="presentation" class="image-unavailable__svg" viewBox="0 0 32 32">
            <use xlink:href="#image-unavailable__svg" />
          </svg>
          <strong class="image-unavailable__caption">Image available eventually</strong>
        </div>
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
        if (card.grade != '') {
          baseString += ' ' + card.grade;
        }
        return baseString;
      }
    }
  });

  window.app = new Vue({
    el: '#wrapper',
    data: {
      onesAllCards: [],
      yearsRange: 'loading...',
      overallTotal: 'loading...',
      lastUpdated: 'loading...'
    },
    created: function () {
      db.collection('cards/cards_document/cards_subcollection').doc('ones').get().then((snapshot) => {
        this.onesAllCards = snapshot.data()['all_cards'];
        this.overallTotal = snapshot.data()['overall_total'];
        this.lastUpdated = this.buildLastUpdated(snapshot.data()['last_updated']);
        this.yearsRange = this.buildYearsRange();
      });
    },
    methods: {
      buildLastUpdated: function (data) {
        return data.toDate().toLocaleDateString('en-US',
          {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'});
      },
      buildYearsRange: function () {
        let allCards = this.onesAllCards;
        return allCards[0].year + ' - ' + allCards[allCards.length - 1].year;
      }
    }
  });
});
