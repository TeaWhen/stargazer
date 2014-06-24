function connectPouchDB (callback) {
    db = new PouchDB('stargazer');
    remoteCouch = 'http://' + $.cookie('username') + ':' + $.cookie('atk') + '@localhost:5984/' + $.cookie('dbname');

    function sync() {
        var opts = {live: true};
        db.replicate.to(remoteCouch, opts);
        db.replicate.from(remoteCouch, opts);
    }

    sync();
    callback();
}
