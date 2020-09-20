var graph = require('fbgraph');


function loginFB(req,res) {
    var authUrl = graph.getOauthUrl({
        "client_id": '769084026984918'
        , "redirect_uri": 'http://localhost:5600/login/success'
    });
    console.log(authUrl);
    res.redirect(authUrl);
}
function onSuccess(req, res) {
    console.log('success', req);
    graph.authorize({
        "client_id": '769084026984918'
        , "redirect_uri": 'http://localhost:5600/login/success'
        , "client_secret": '119a28ea1a65835b1ede4065f615a5cf'
        , "code": req.query.code
    }, function (err, facebookRes) {
        console.log(err, facebookRes);
        graph.setAccessToken(facebookRes.access_token);
        res.send(facebookRes)

    });
}

function getData(req, res) {

    graph.get("me/picture", function (err, resp) {
        console.log(resp); // { id: '4', name: 'Mark Zuckerberg'... }
        res.send(resp)
    });

}


module.exports = {
    loginFB,
    onSuccess,
    getData
}
