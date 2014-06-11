$(function() {
    var db = new PouchDB('http://starwarden:password@localhost:5984/yzheng624');
    var remoteCouch = 'http://starwarden:password@localhost:5984/yzheng624';

    function sync() {
        // syncDom.setAttribute('data-sync-state', 'syncing');
        var opts = {live: true};
        // db.replicate.to(remoteCouch, opts);
        db.replicate.from(remoteCouch, opts);
    }

    sync();
});
