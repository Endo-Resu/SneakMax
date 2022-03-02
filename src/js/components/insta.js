const insta = document.querySelector('.instagram__content');
(function () {
  new InstagramFeed({
    'username': 'airforce1nike',
    'display_profile': false,
    'display_biography': false,
    'display_gallery': true,
    'display_captions': true,
    'callback': function(data){
      let instaArray = data.edge_owner_to_timeline_media.edges;

      const newArray = instaArray.slice(0, 5);

      for (let item of newArray) {
        console.log(item.node)
        let element = item.node;
        insta.insertAdjacentHTML('afterbegin', `

        `);
      }
    },
    'styling': false
  });
})();
