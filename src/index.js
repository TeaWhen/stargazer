$(function() {
    var db = new PouchDB('stars');
    var remoteCouch = 'http://admin:admin@localhost:5984/stars';

    function sync() {
        // syncDom.setAttribute('data-sync-state', 'syncing');
        var opts = {live: true};
        db.replicate.to(remoteCouch, opts);
        db.replicate.from(remoteCouch, opts);
    }

    sync();
});
