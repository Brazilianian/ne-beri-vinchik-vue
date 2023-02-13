import  pg  from 'pg'

let conString = "postgres://posgkqyv:uPDFKuH98iJ3iONKAoQCXPhIpPZDY1Ql@snuffleupagus.db.elephantsql.com/posgkqyv"
let client = new pg.Client(conString);

client.connect(function(err) {
    if(err) {
        return console.error('could not connect to postgres', err);
    }
    client.query('SELECT NOW() AS "theTime"', function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].theTime);
        // >> output: 2018-08-23T14:02:57.117Z
        client.end();
    });
});