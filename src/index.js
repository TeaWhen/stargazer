$(function() {
    var db = new PouchDB('http://' + $.cookie('username') + ':' + $.cookie('atk') + '@localhost:5984/' + $.cookie('dbname'));
    var remoteCouch = 'http://' + $.cookie('username') + ':' + $.cookie('atk') + '@localhost:5984/' + $.cookie('dbname');

    function sync() {
        // syncDom.setAttribute('data-sync-state', 'syncing');
        var opts = {live: true};
        db.replicate.to(remoteCouch, opts);
        db.replicate.from(remoteCouch, opts);
    }

    sync();
});
